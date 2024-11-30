"use client";
import React, { createContext, useContext, useReducer } from "react";

// Define Message type and State structure
type Message = { role: "user" | "assistant"; content: string };

interface ChatState {
  messages: Message[];
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  model: string;
  responseFormat: { type: "text" };
}

// Define Actions
export type ChatAction =
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "LOAD_MESSAGES"; payload: Message[] }
  | { type: "SET_MODEL"; payload: string }
  | { type: "SET_TEMPERATURE"; payload: number }
  | { type: "SET_MAX_TOKENS"; payload: number }
  | { type: "SET_TOP_P"; payload: number }
  | { type: "SET_FREQUENCY_PENALTY"; payload: number }
  | { type: "SET_PRESENCE_PENALTY"; payload: number }
  | { type: "SET_ALL_PARAMS"; payload: any }
  | { type: "SET_RESPONSE_FORMAT"; payload: { type: "text" } };

// Initial State
const initialState: ChatState = {
  messages: [],
  model: "gpt-4o",
  temperature: 1.0,
  maxTokens: 2048,
  topP: 1.0,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
  responseFormat: { type: "text" },
};

// Reducer function
const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "LOAD_MESSAGES":
      return { ...state, messages: action.payload };
    case "SET_MODEL":
      return { ...state, model: action.payload };
    case "SET_RESPONSE_FORMAT":
      return { ...state, responseFormat: { type: "text" } };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_TEMPERATURE":
      return { ...state, temperature: action.payload };
    case "SET_MAX_TOKENS":
      return { ...state, maxTokens: action.payload };
    case "SET_TOP_P":
      return { ...state, topP: action.payload };
    case "SET_FREQUENCY_PENALTY":
      return { ...state, frequencyPenalty: action.payload };
    case "SET_PRESENCE_PENALTY":
      return { ...state, presencePenalty: action.payload };
    case "SET_ALL_PARAMS":
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

// Create Context
const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
} | null>(null);

// Provider Component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom Hook to use the Chat Context
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
