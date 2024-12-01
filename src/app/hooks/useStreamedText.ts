import { useState, useTransition } from "react";
import { IFCMessage } from "@/types/message";

interface ChatState {
  messages: IFCMessage[];
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
  const [, startTransition] = useTransition();
  const [streamedText, setStreamedText] = useState("");

  const fetchStream = async (params: ChatState) => {
    setIsStreaming(true);
    setStreamingText("");
    setError(null);
    setIsThinking(true);
    let data = ""; // Initialize data to collect streamed content

    const handleSubmit = async () => {
      setIsThinking(true);
      setIsStreaming(true);
      setError("");

      try {
        const res = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: params.messages,
            model: params.model,
            temperature: params.temperature,
            max_tokens: params.maxTokens,
            top_p: params.topP,
            frequency_penalty: params.frequencyPenalty,
            presence_penalty: params.presencePenalty,
          }),
        });
        setIsThinking(false);
        if (!res.body) {
          throw new Error("Stream response body is empty.");
        }

        const decoder = new TextDecoder();
        const reader = res.body.getReader();
        let buffer = ""; // To accumulate partial chunks of data

        while (true) {
          const { value, done } = await reader.read();

          if (done) break; // Exit when streaming ends

          // Decode the chunk and append to buffer
          buffer += decoder.decode(value, { stream: true });

          // Process complete chunks (split by newline or another delimiter)
          const chunks = buffer.split("\n");

          // Iterate through all but the last chunk (which may be incomplete)
          for (let i = 0; i < chunks.length - 1; i++) {
            const chunk = chunks[i].trim();
            if (chunk) {
              try {
                const content = extractChunkContent(JSON.parse(chunk)); // Process the chunk
                startTransition(() =>
                  setStreamingText((prev) => prev + content)
                ); // Update UI
                data += content; // Accumulate the chunk content
              } catch (err) {
                console.error("Error processing chunk:", chunk, err);
              }
            }
          }

          // Keep the remaining content in the buffer (it may be an incomplete chunk)
          buffer = chunks[chunks.length - 1];
        }

        // Handle any remaining content in the buffer after the stream ends
        if (buffer.trim()) {
          try {
            const content = extractChunkContent(JSON.parse(buffer.trim()));
            console.log("Final chunk content:", content);
            startTransition(() => setStreamingText((prev) => prev + content)); // Update UI
            data += content; // Finalize the accumulated data
          } catch (err) {
            console.error("Error processing final chunk:", buffer, err);
          }
        }
      } catch (err: any) {
        console.error("Error during streaming:", err);
        setError(err.message || "An error occurred during streaming.");
      } finally {
        setIsThinking(false);
        setIsStreaming(false);
        setStreamedText(data); // Set the final accumulated text after the stream ends
      }
    };

    // Start the streaming process
    handleSubmit();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractChunkContent = (chunk: any): string | null => {
    return chunk.choices[0].delta.content || "";
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
