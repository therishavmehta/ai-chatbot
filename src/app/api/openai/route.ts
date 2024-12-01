import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Ensure this is set in your environment variables
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      messages,
      model = "gpt-4o",
      temperature = 1.0,
      max_tokens = 2048,
      top_p = 1.0,
      frequency_penalty = 0.0,
      presence_penalty = 0.0,
    } = body;

    const response = await openai.chat.completions.create({
      model,
      temperature,
      max_tokens,
      messages,
      frequency_penalty,
      presence_penalty,
      top_p,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          // Simulating streaming chunks
          controller.enqueue(JSON.stringify(chunk) + "\n");
          if (chunk.choices[0].finish_reason === "stop") {
            controller.close();
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || error.data.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
