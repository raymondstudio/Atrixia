import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return NextResponse.json({
    success: true,
    data: {
      id,
      productName: "Ergonomic Mesh Lumbar Desk Chair",
      confidenceScore: 94,
      summary: "Selected based on 3D lumbar support adjustability, 4.8/5 verified rating, and fast shipping.",
      pros: ["High durability mesh", "Verified 98% positive seller"],
      cons: ["Requires 20 min assembly"],
      tradeoffs: "Cheaper non-mesh models lack breathable foam cushion.",
      alternatives: [
        {
          type: "budget",
          productName: "Basic Task Chair",
          price: 79.99,
          reasoning: "Cheaper option but lacks dynamic lumbar support.",
        },
      ],
    },
  });
}
