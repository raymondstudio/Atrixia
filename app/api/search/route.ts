import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Query string is required." } },
        { status: 400 }
      );
    }

    // Return Server-Sent Events (SSE) reasoning stream contract stub
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Event 1: Thinking
        controller.enqueue(
          encoder.encode(
            `event: thinking\ndata: ${JSON.stringify({ step: "querying", message: "Initiating search across Amazon, eBay, Jumia..." })}\n\n`
          )
        );

        // Event 2: Intermediate Results
        controller.enqueue(
          encoder.encode(
            `event: results\ndata: ${JSON.stringify({ products: [{ id: "p1", title: "Sample Ergonomic Desk Chair", price: 149.99 }] })}\n\n`
          )
        );

        // Event 3: Final Reasoning Recommendation
        controller.enqueue(
          encoder.encode(
            `event: reasoning\ndata: ${JSON.stringify({ step: "done", recommendationId: "rec_sample_001" })}\n\n`
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
      { success: false, error: { code: "INTERNAL_ERROR", message: "Search pipeline exception." } },
      { status: 500 }
    );
  }
}
