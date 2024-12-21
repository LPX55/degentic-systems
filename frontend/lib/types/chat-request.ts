export type MessageFileType = 'image' | 'audio' | 'any';

export type MessageFile = {src?: string; name?: string; type?: MessageFileType; ref?: File};

export type MessageFiles = MessageFile[];

export type MessageContent = {role?: string; text?: string; files?: MessageFiles; html?: string; _sessionId?: string};

export interface DemoChatTextRequestBody {
  messages: MessageContent[];
}

export type DemoChatOpenAITextRequestBody = DemoChatTextRequestBody & {model?: string};