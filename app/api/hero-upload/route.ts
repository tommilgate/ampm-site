import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Issues short-lived upload tokens so the browser can upload the hero image
// directly to Vercel Blob. Only an authenticated admin can get a token.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const jar = await cookies();
        const authed = jar.get("ampm_admin")?.value === process.env.ADMIN_PASSWORD;
        if (!authed) throw new Error("Not authorized");
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
          addRandomSuffix: true,
          maximumSizeInBytes: 25 * 1024 * 1024, // 25MB ceiling
        };
      },
      // No-op: we persist the URL via the saveHeroUrl server action from the client
      // (onUploadCompleted only fires for publicly reachable callback URLs).
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
