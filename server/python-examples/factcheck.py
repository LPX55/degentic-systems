# SIMPLE IMPLEMENTATION OF GROUNDED FACT CHECKING
# NOT FOR PRODUCTION USE
# FORMATTED FOR HUMAN READABILITY, DATA RETRIEVED IN STRUCTURED FORMAT FOR LLMs

import requests
from dotenv import load_dotenv
import os
from pprint import pprint
from prettytable import PrettyTable
from prettytable import FRAME, ALL, HEADER
from urllib.parse import urlparse
import textwrap
load_dotenv()

def fact_check(statement):

    api_key = os.getenv('GROUNDING_API_KEY')
    api_url = os.getenv('GROUNDING_API_URL')

    if not api_key:
        raise Exception("Please set the GROUNDING_API_KEY environment variable.")
        
    url = api_url
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    
    data = {
        'statement': statement
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        result = response.json()
        results_table = PrettyTable()
        results_table.align = "l"
        results_table.padding_width = 3
        results_table.border = True
        results_table.header = False
        results_table.hrules = ALL
        results_table.header_style = "upper"
        results_table.field_names = ["Category", "Details"]
        
        is_supportive_str = str(result['data']['result']).upper()
        emoji = "✅" if result['data']['result'] else "❌"
        combined_result = f"{is_supportive_str} {emoji} | Sources indicate a {is_supportive_str} statement w/ a grounding score of: {result['data']['factuality']}"
        
        wrapped_statement = textwrap.fill(statement, width=80)
        results_table.add_row(["Statement or Claim", wrapped_statement])

        results_table.add_row(["Fact Check Result", combined_result])
        wrapped_reason = textwrap.fill(result['data']['reason'], width=80)
        
        results_table.add_row(["Reason", wrapped_reason])

        print(results_table)

        # GROUNDING REFERENCE TABLE
        
        references = result['data']['references']
        table = PrettyTable()
        table.align = "l"
        table.padding_width = 3
        table.border = True
        table.header = True
        table.header_style = "upper"
        table.hrules = ALL
        table.field_names = ["Source", "Key Quote", "Indication"]
        for ref in references:
            parsed_url = urlparse(ref['url'])
            main_source = parsed_url.netloc
            
            wrapped_key_quote = textwrap.fill(ref['keyQuote'], width=70)
            max_url_length = 65
            truncated_url = ref['url'] if len(ref['url']) <= max_url_length else ref['url'][:max_url_length] + '...'
            
            is_supportive_str = str(ref['isSupportive']).upper()
            emoji = "✅" if ref['isSupportive'] else "❌"
            
            table.add_row([main_source, wrapped_key_quote + f"\n({truncated_url})", f"{is_supportive_str} {emoji}"])
        print("\n📑 Reference Sources ------------------>")

        print(table)

        print("\n⚠️  Disclaimer ------------------>\n")
        print("The reliability of the grounding API depends on the quality of the sources it finds. If the search results are poor or biased, the grounding process may echo these flaws, possibly resulting in erroneous or deceptive conclusions. Currently, it's crucial to always fact-check sources and assess the trustworthiness of retrieved data, particularly for critical topics or contentious claims.\n")
        print("Grounding is not applicable to all statements. Personal feelings or experiences cannot be grounded because they are subjective and not based on facts. Similarly, future events or hypothetical scenarios cannot be verified as true or false. In many instances, grounding would be impractical or meaningless.")
    else:
        print(f"Failed to fact-check the statement. Status code: {response.status_code}")
        print(f"Response: {response.json()}")

# Example statement to fact check
statement = "Under the constitution of the Republic of Korea, the presiding President can legally declare Martial Law under certain circumstances."

fact_check(statement)