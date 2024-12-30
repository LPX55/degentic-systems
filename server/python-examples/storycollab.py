import gradio as gr
import pixeltable as pxt
import numpy as np
from datetime import datetime
from pixeltable.functions.huggingface import sentence_transformer
from pixeltable.functions import openai
import os
import getpass

if 'OPENAI_API_KEY' not in os.environ:
    os.environ['OPENAI_API_KEY'] = getpass.getpass('OpenAI API key:')

# Initialize Pixeltable
pxt.drop_dir('story_builder', force=True)
pxt.create_dir('story_builder')

# Create simple embedding function
@pxt.expr_udf
def embed_text(text: str) -> np.ndarray:
    return sentence_transformer(text, model_id='all-MiniLM-L6-v2')

# Init tables
story_table = pxt.create_table(
    'story_builder.contributions',
    {
        'contributor': pxt.StringType(),
        'content': pxt.StringType(),
        'timestamp': pxt.TimestampType(),
        'cumulative_story': pxt.StringType()
    }
)

# Add an embedding index to the content column
story_table.add_embedding_index('content', string_embed=embed_text)

@pxt.udf
def generate_summary(story: str) -> list[dict]:
    system_msg = "You are an expert summarizer. Provide a concise summary of the given story, highlighting key plot points and themes."
    user_msg = f"Story: {story}\n\nSummarize this story:"
    return [
        {'role': 'system', 'content': system_msg},
        {'role': 'user', 'content': user_msg}
    ]

story_table['summary_prompt'] = generate_summary(story_table.cumulative_story)
story_table['summary_response'] = openai.chat_completions(
    messages=story_table.summary_prompt,
    model='gpt-3.5-turbo',
    max_tokens=200
)

@pxt.udf
def generate_continuation(context: str) -> list[dict]:
    system_msg = "You are a creative writer. Continue the story based on the given context. Write a paragraph that logically follow the provided content."
    user_msg = f"Context: {context}\n\nContinue the story:"
    return [
        {'role': 'system', 'content': system_msg},
        {'role': 'user', 'content': user_msg}
    ]

story_table['continuation_prompt'] = generate_continuation(story_table.cumulative_story)
story_table['continuation_response'] = openai.chat_completions(
    messages=story_table.continuation_prompt,
    model='gpt-3.5-turbo',
    max_tokens=50
)

# Function to get the current cumulative story
def get_current_story():
    latest_entry = story_table.tail(1)
    if len(latest_entry) > 0:
        return latest_entry['cumulative_story'][0]
    return ""

# Functions for Gradio interface
def add_contribution(contributor, content):
    current_story = get_current_story()
    new_cumulative_story = current_story + " " + content if current_story else content
    
    story_table.insert([{
        'contributor': contributor,
        'content': content,
        'timestamp': datetime.now(),
        'cumulative_story': new_cumulative_story
    }])
    return "Contribution added successfully!", new_cumulative_story

def get_similar_parts(query, num_results=5):
    sim = story_table.content.similarity(query)
    results = story_table.order_by(sim, asc=False).limit(num_results).select(story_table.content, story_table.contributor, sim=sim).collect()
    return results.to_pandas()

def generate_next_part():
    continuation = story_table.select(continuation=story_table.continuation_response.choices[0].message.content).tail(1)['continuation'][0]
    return continuation

def summarize_story():
    summary = story_table.select(summary=story_table.summary_response.choices[0].message.content).tail(1)['summary'][0]
    return summary

# Gradio interface
with gr.Blocks(theme=gr.themes.Base()) as demo:
    gr.Markdown(
        """
        # 📚 Collaborative Story Builder
        """
    )
    
    with gr.Tabs():
        with gr.TabItem("Contribute"):
            with gr.Row():
                with gr.Column(scale=2):
                    contributor = gr.Textbox(label="Your Name")
                    content = gr.Textbox(label="Your Contribution", lines=5)
                    submit_btn = gr.Button("Submit Contribution", variant="primary")
                with gr.Column(scale=3):
                    status = gr.Textbox(label="Status")
                    current_story = gr.Textbox(label="Current Story", lines=10, interactive=False)
        
        with gr.TabItem("Search & Generate"):
            with gr.Row():
                with gr.Column():
                    search_query = gr.Textbox(label="Search Current Contributions")
                    num_results = gr.Slider(minimum=1, maximum=10, value=5, step=1, label="Number of Results")
                    search_btn = gr.Button("Search", variant="secondary")
                    search_results = gr.Dataframe(
                        headers=["Content", "Contributor", "Similarity"],
                        label="Similar Parts"
                    )
                
                with gr.Column():
                    generate_btn = gr.Button("Generate Next Part", variant="primary")
                    generated_part = gr.Textbox(label="Generated Continuation", lines=5)
        
        with gr.TabItem("Summary"):
            summarize_btn = gr.Button("Summarize Story", variant="primary")
            summary = gr.Textbox(label="Story Summary", lines=8)
    
    submit_btn.click(add_contribution, inputs=[contributor, content], outputs=[status, current_story])
    search_btn.click(get_similar_parts, inputs=[search_query, num_results], outputs=[search_results])
    generate_btn.click(generate_next_part, outputs=[generated_part])
    summarize_btn.click(summarize_story, outputs=[summary])


if __name__ == "__main__":
    demo.launch()