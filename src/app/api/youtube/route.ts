import { NextResponse } from "next/server";
import { getChannelVideos } from "@/lib/youtube";

export const revalidate = 21600; // 6h

export async function GET(request: Request) {
  const limit = Number(new URL(request.url).searchParams.get("limit") ?? 12);
  const payload = await getChannelVideos(Number.isFinite(limit) ? limit : 12);

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
    },
  });
}
