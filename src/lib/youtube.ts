/**
 * YouTube Data API v3 integration.
 *
 * Env (set in .env.local locally and in the Vercel dashboard):
 *   YOUTUBE_API_KEY        – required. console.cloud.google.com → enable "YouTube Data API v3" → create API key
 *   YOUTUBE_CHANNEL_ID     – e.g. UCxxxxxxxxxxxxxxxxxxxxxx  (preferred: 1 fewer API call)
 *   YOUTUBE_CHANNEL_HANDLE – e.g. @timdropstruth            (used only if CHANNEL_ID is absent)
 *
 * With no key configured the site still renders: `getChannelVideos` returns
 * `{ videos: [], configured: false }` and the UI shows a graceful empty state.
 */

const API = "https://www.googleapis.com/youtube/v3";

/** Cache YouTube responses for 6h — quota is 10k units/day and playlistItems costs 1 unit. */
const REVALIDATE = 60 * 60 * 6;

export type Video = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
};

export type ChannelMeta = {
  title: string;
  handle?: string;
  subscribers?: string;
  videoCount?: string;
  avatar?: string;
  url?: string;
};

export type VideosPayload = {
  configured: boolean;
  videos: Video[];
  channel: ChannelMeta | null;
  error?: string;
};

type YtThumb = { url: string; width: number; height: number };

function pickThumb(thumbs: Record<string, YtThumb> | undefined): string {
  if (!thumbs) return "";
  return (
    thumbs.maxres?.url ??
    thumbs.standard?.url ??
    thumbs.high?.url ??
    thumbs.medium?.url ??
    thumbs.default?.url ??
    ""
  );
}

async function yt<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${API}/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url, { next: { revalidate: REVALIDATE } });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // Surface Google's own reason ("quotaExceeded", "keyInvalid") — it makes debugging on Vercel far quicker
    let reason = `${res.status} ${res.statusText}`;
    try {
      const parsed = JSON.parse(body);
      reason = parsed?.error?.message ?? reason;
    } catch {
      /* non-JSON error body — keep the status line */
    }
    throw new Error(`YouTube API: ${reason}`);
  }

  return res.json() as Promise<T>;
}

type ChannelsResponse = {
  items?: Array<{
    id: string;
    snippet?: {
      title?: string;
      customUrl?: string;
      thumbnails?: Record<string, YtThumb>;
    };
    statistics?: { subscriberCount?: string; videoCount?: string };
    contentDetails?: { relatedPlaylists?: { uploads?: string } };
  }>;
};

type PlaylistItemsResponse = {
  items?: Array<{
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      thumbnails?: Record<string, YtThumb>;
      resourceId?: { videoId?: string };
    };
    contentDetails?: { videoId?: string; videoPublishedAt?: string };
  }>;
};

function compact(n?: string): string | undefined {
  if (!n) return undefined;
  const v = Number(n);
  if (!Number.isFinite(v)) return undefined;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(v);
}

export async function getChannelVideos(limit = 12): Promise<VideosPayload> {
  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE;

  if (!key || (!channelId && !handle)) {
    return { configured: false, videos: [], channel: null };
  }

  try {
    // channels.list accepts either an id or a handle, so one call resolves both
    // the channel metadata and the "uploads" playlist that holds every video.
    const channelRes = await yt<ChannelsResponse>("channels", {
      part: "snippet,statistics,contentDetails",
      ...(channelId
        ? { id: channelId }
        : { forHandle: handle!.startsWith("@") ? handle! : `@${handle}` }),
      key,
    });

    const ch = channelRes.items?.[0];
    const uploads = ch?.contentDetails?.relatedPlaylists?.uploads;

    if (!ch || !uploads) {
      return {
        configured: true,
        videos: [],
        channel: null,
        error: "Channel not found — check YOUTUBE_CHANNEL_ID / YOUTUBE_CHANNEL_HANDLE.",
      };
    }

    const customUrl = ch.snippet?.customUrl;
    const channel: ChannelMeta = {
      title: ch.snippet?.title ?? "YouTube",
      handle: customUrl,
      subscribers: compact(ch.statistics?.subscriberCount),
      videoCount: compact(ch.statistics?.videoCount),
      avatar: pickThumb(ch.snippet?.thumbnails),
      url: customUrl
        ? `https://www.youtube.com/${customUrl}`
        : `https://www.youtube.com/channel/${ch.id}`,
    };

    const playlist = await yt<PlaylistItemsResponse>("playlistItems", {
      part: "snippet,contentDetails",
      playlistId: uploads,
      maxResults: String(Math.min(Math.max(limit, 1), 50)),
      key,
    });

    const videos: Video[] = (playlist.items ?? [])
      .map((item) => {
        const id = item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId ?? "";
        return {
          id,
          title: item.snippet?.title ?? "Untitled",
          description: item.snippet?.description ?? "",
          publishedAt: item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt ?? "",
          thumbnail: pickThumb(item.snippet?.thumbnails),
          url: `https://www.youtube.com/watch?v=${id}`,
        };
      })
      // Deleted/private uploads stay in the playlist with a blank id and a
      // "Private video" title — drop them so the grid never shows dead cards.
      .filter((v) => v.id && v.title !== "Private video" && v.title !== "Deleted video");

    return { configured: true, videos, channel };
  } catch (err) {
    return {
      configured: true,
      videos: [],
      channel: null,
      error: err instanceof Error ? err.message : "Unknown YouTube error",
    };
  }
}
