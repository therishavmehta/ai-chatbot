import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
});

async function getChatResponse() {
  try {
    const responseStream = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: "hello",
        },
        {
          role: "assistant",
          content: "Hello! How can I assist you today?",
        },
        {
          role: "user",
          content: "how to build a custom playground?",
        },
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true, // Enable streaming
    });

    for await (const chunk of responseStream) {
      processChunk(chunk);
    }
  } catch (error) {
    console.error("Error in streaming response:", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractChunkContent(chunk: any): string | null {
  if (chunk?.choices?.[0]?.delta?.content) {
    return chunk.choices[0].delta.content;
  }
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function processChunk(chunk: any) {
  try {
    // Check if the chunk is already an object
    if (typeof chunk === "object" && chunk !== null) {
      const parsedChunk = chunk;

      // Extract text content from the delta
      if (parsedChunk.choices && parsedChunk.choices[0]?.delta?.content) {
        const text = parsedChunk.choices[0].delta.content;
        console.log("Streamed text:", text);

        // Modify the text if needed
        const modifiedText = text.replace(
          "playground",
          "custom interactive space"
        );
        console.log("Modified text:", modifiedText);
      }
    } else {
      console.warn("Unexpected chunk format:", chunk);
    }
  } catch (error) {
    console.error("Error processing chunk:", error);
  }
}

export { getChatResponse };
