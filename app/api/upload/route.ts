import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: { code: "MISSING_FILE", message: "No image file uploaded." } },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        fileUrl: "https://dummy-storage.supabase.co/product-uploads/sample.jpg",
        filename: file.name,
        size: file.size,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "UPLOAD_FAILED", message: "Image upload handler error." } },
      { status: 500 }
    );
  }
}
