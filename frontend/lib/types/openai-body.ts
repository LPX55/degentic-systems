import type {DemoChatOpenAITextRequestBody} from './chat-request';

export function createReqChatBody(body: DemoChatOpenAITextRequestBody, stream?: boolean) {
  // Text messages are stored inside request body using the Deep Chat JSON format:
  // https://deepchat.dev/docs/connect
  const chatBody = {
    messages: body.messages.map((message) => {
      return {role: message.role === 'ai' ? 'assistant' : message.role, content: message.text};
    }),
    model: body.model,
  } as {
    [x: string]: any;
    stream?: boolean;
  };
  if (stream) chatBody.stream = true;
  return chatBody;
}