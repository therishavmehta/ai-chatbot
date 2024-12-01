"use client";
import React, { createContext, Reducer, useContext, useReducer } from "react";
import {
  IFCChatState,
  IFCChatActionType,
  IFCChatAction,
} from "@/types/message";

// Initial State
const initialState: IFCChatState = {
  messages: [],
  model: "gpt-4o",
  temperature: 1.0,
  maxTokens: 2048,
  topP: 1.0,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
};

// Reducer function
const chatReducer = (
  state: IFCChatState,
  action: IFCChatAction
): IFCChatState => {
  switch (action.type) {
    case IFCChatActionType.LOAD_MESSAGES:
      return { ...state, messages: action.payload };
    case IFCChatActionType.SET_MODEL:
      return { ...state, model: action.payload };
    case IFCChatActionType.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case IFCChatActionType.SET_TEMPERATURE:
      return { ...state, temperature: action.payload };
    case IFCChatActionType.SET_MAX_TOKENS:
      return { ...state, maxTokens: action.payload };
    case IFCChatActionType.SET_TOP_P:
      return { ...state, topP: action.payload };
    case IFCChatActionType.SET_FREQUENCY_PENALTY:
      return { ...state, frequencyPenalty: action.payload };
    case IFCChatActionType.SET_PRESENCE_PENALTY:
      return { ...state, presencePenalty: action.payload };
    case IFCChatActionType.SET_ALL_PARAMS:
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

// Create Context
const ChatContext = createContext<{
  state: IFCChatState;
  dispatch: React.Dispatch<IFCChatAction>;
} | null>(null);

// Provider Component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<Reducer<IFCChatState, IFCChatAction>>(
    chatReducer,
    initialState
  );

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
