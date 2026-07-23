import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { conversationId, message } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Message is required." } },
        { status: 400 }
      );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(
          encoder.encode(
            `event: thinking\ndata: ${JSON.stringify({ message: "Analyzing query intent..." })}\n\n`
          )
        );

        controller.enqueue(
          encoder.encode(
            `event: reply\ndata: ${JSON.stringify({ delta: "I am ready to help you find the best options for " + message })}\n\n`
          )
        );

        controller.enqueue(
          encoder.encode(
            `event: end\ndata: ${JSON.stringify({ conversationId: conversationId || "conv_sample_123" })}\n\n`
          )
        );

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Chat endpoint failure." } },
      { status: 500 }
    );
  }
}
