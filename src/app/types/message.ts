export enum IFCRole {
  USER = "user",
  ASSISTANT = "assistant",
}
export interface IFCMessage {
  role: IFCRole;
  content: string;
}

export interface IFCChatState extends IFCChatParameters {
  messages: IFCMessage[];
}

export interface IFCChatParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  model: string;
  apiKey: string;
}

export enum IFCChatParameterKeys {
  temperature = "temperature",
  maxTokens = "maxTokens",
  topP = "topP",
  frequencyPenalty = "frequencyPenalty",
  presencePenalty = "presencePenalty",
}

export enum IFCChatActionType {
  ADD_MESSAGE = "ADD_MESSAGE",
  LOAD_MESSAGES = "LOAD_MESSAGES",
  SET_MODEL = "SET_MODEL",
  SET_TEMPERATURE = "SET_TEMPERATURE",
  SET_MAX_TOKENS = "SET_MAX_TOKENS",
  SET_TOP_P = "SET_TOP_P",
  SET_FREQUENCY_PENALTY = "SET_FREQUENCY_PENALTY",
  SET_PRESENCE_PENALTY = "SET_PRESENCE_PENALTY",
  SET_ALL_PARAMS = "SET_ALL_PARAMS",
  SET_RESPONSE_FORMAT = "SET_RESPONSE_FORMAT",
  SET_API_KEY = "SET_API_KEY",
}

export type IFCChatAction =
  | { type: IFCChatActionType.ADD_MESSAGE; payload: IFCMessage }
  | { type: IFCChatActionType.LOAD_MESSAGES; payload: IFCMessage[] }
  | { type: IFCChatActionType.SET_MODEL; payload: string }
  | { type: IFCChatActionType.SET_TEMPERATURE; payload: number }
  | { type: IFCChatActionType.SET_MAX_TOKENS; payload: number }
  | { type: IFCChatActionType.SET_TOP_P; payload: number }
  | { type: IFCChatActionType.SET_FREQUENCY_PENALTY; payload: number }
  | { type: IFCChatActionType.SET_PRESENCE_PENALTY; payload: number }
  | { type: IFCChatActionType.SET_API_KEY; payload: string }
  | {
      type: IFCChatActionType.SET_ALL_PARAMS;
      payload: IFCChatParameters;
    }
  | { type: IFCChatActionType.SET_RESPONSE_FORMAT; payload: { type: "text" } };
