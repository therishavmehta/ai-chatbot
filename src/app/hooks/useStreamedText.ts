import { useState, useTransition } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Replace with the correct env variable prefix
});

type Message = { role: "user" | "assistant"; content: string };

interface ChatState {
  messages: Message[];
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  model: string;
}

export const useStreamedText = () => {
  const [streamingText, setStreamingText] = useState<string>(""); // Full text being streamed
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [streamedText, setStreamedText] = useState("");

  const fetchStream = async (params: ChatState) => {
    setIsStreaming(true);
    setStreamingText("");
    setError(null);
    setIsThinking(true);
    let res = "";

    try {
      const responseStream = await openai.chat.completions.create({
        stream: true, // Always enable streaming
        temperature: params.temperature,
        max_tokens: params.maxTokens,
        top_p: params.topP,
        frequency_penalty: params.frequencyPenalty,
        presence_penalty: params.presencePenalty,
        model: params.model,
        messages: params.messages,
      });
      setIsThinking(false);

      for await (const chunk of responseStream) {
        const content = extractChunkContent(chunk);
        if (content) {
          startTransition(() => setStreamingText((prev) => prev + content));
          res += content;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occurred during streaming.");
    } finally {
      setIsStreaming(false);
      setIsThinking(false);
      setStreamedText(res);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractChunkContent = (chunk: any): string | null => {
    if (chunk?.choices?.[0]?.delta?.content) {
      return chunk.choices[0].delta.content;
    }
    return null;
  };

  return {
    streamingText,
    isStreaming,
    error,
    fetchStream,
    setStreamingText,
    isThinking,
    streamedText,
    setStreamedText,
  };
};
