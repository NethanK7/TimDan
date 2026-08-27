/**
 * YouTube Data API v3 integration.
 *
 * Env (set in .env.local locally and in the Vercel dashboard):
 *   YOUTUBE_API_KEY          – required. console.cloud.google.com → enable "YouTube Data API v3" → create API key
 *   YOUTUBE_CHANNEL_ID       – e.g. UCxxxxxxxxxxxxxxxxxxxxxx  (preferred: 1 fewer API call)
 *   YOUTUBE_CHANNEL_HANDLE   – e.g. @pastortimothydaniel       (used only if CHANNEL_ID is absent)
 *
 * "Tim Drops Truth" (the Watch tab's short-form grid) reads from the same channel by
 * default. If those drops live on a separate channel, point it there instead:
 *   YOUTUBE_TRUTH_CHANNEL_ID     – e.g. UCxxxxxxxxxxxxxxxxxxxxxx
 *   YOUTUBE_TRUTH_CHANNEL_HANDLE – e.g. @timdropstruth
 *
 * With no key configured the site still renders: both `getChannelVideos` and
 * `getShorts` return `{ videos: [], configured: false }` and the UI shows a
 * graceful empty state.
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
  /** Seconds. Present on Video objects returned by getShorts(). */
  durationSeconds?: number;
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

async function resolveChannel(
  key: string,
  channelId: string | undefined,
  handle: string | undefined
): Promise<{ channel: ChannelMeta; uploads: string } | { error: string }> {
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
    return { error: "Channel not found — check the configured channel id / handle." };
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

  return { channel, uploads };
}

async function fetchUploads(uploads: string, key: string, limit: number): Promise<Video[]> {
  const playlist = await yt<PlaylistItemsResponse>("playlistItems", {
    part: "snippet,contentDetails",
    playlistId: uploads,
    maxResults: String(Math.min(Math.max(limit, 1), 50)),
    key,
  });

  return (playlist.items ?? [])
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
}

export async function getChannelVideos(limit = 12): Promise<VideosPayload> {
  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE;

  if (!key || (!channelId && !handle)) {
    return { configured: false, videos: [], channel: null };
  }

  try {
    const resolved = await resolveChannel(key, channelId, handle);
    if ("error" in resolved) {
      return { configured: true, videos: [], channel: null, error: resolved.error };
    }

    const videos = await fetchUploads(resolved.uploads, key, limit);
    return { configured: true, videos, channel: resolved.channel };
  } catch (err) {
    return {
      configured: true,
      videos: [],
      channel: null,
      error: err instanceof Error ? err.message : "Unknown YouTube error",
    };
  }
}

type VideosListResponse = {
  items?: Array<{ id: string; contentDetails?: { duration?: string } }>;
};

/** Parses ISO-8601 durations ("PT1M32S", "PT45S") into whole seconds. */
function parseISODuration(iso: string): number {
  const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!m) return 0;
  const [, h, min, s] = m;
  return (Number(h) || 0) * 3600 + (Number(min) || 0) * 60 + (Number(s) || 0);
}

const SHORT_MAX_SECONDS = 180;

/**
 * "Tim Drops Truth" short-form drops. YouTube's API has no "is this a Short"
 * flag, so this fetches the channel's recent uploads, looks up each one's
 * duration, and keeps whatever comes in at 3 minutes or under.
 */
export async function getShorts(limit = 9): Promise<VideosPayload> {
  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_TRUTH_CHANNEL_ID ?? process.env.YOUTUBE_CHANNEL_ID;
  const handle = process.env.YOUTUBE_TRUTH_CHANNEL_HANDLE ?? process.env.YOUTUBE_CHANNEL_HANDLE;

  if (!key || (!channelId && !handle)) {
    return { configured: false, videos: [], channel: null };
  }

  try {
    const resolved = await resolveChannel(key, channelId, handle);
    if ("error" in resolved) {
      return { configured: true, videos: [], channel: null, error: resolved.error };
    }

    // Pull a wider pool of recent uploads, since only some will be short-form.
    const candidates = await fetchUploads(resolved.uploads, key, 50);
    if (candidates.length === 0) {
      return { configured: true, videos: [], channel: resolved.channel };
    }

    const durations = await yt<VideosListResponse>("videos", {
      part: "contentDetails",
      id: candidates.map((v) => v.id).join(","),
      key,
    });

    const durationById = new Map(
      (durations.items ?? []).map((item) => [
        item.id,
        parseISODuration(item.contentDetails?.duration ?? "PT0S"),
      ])
    );

    const shorts = candidates
      .map((v) => ({ ...v, durationSeconds: durationById.get(v.id) ?? 0 }))
      .filter((v) => v.durationSeconds > 0 && v.durationSeconds <= SHORT_MAX_SECONDS)
      .slice(0, limit);

    return { configured: true, videos: shorts, channel: resolved.channel };
  } catch (err) {
    return {
      configured: true,
      videos: [],
      channel: null,
      error: err instanceof Error ? err.message : "Unknown YouTube error",
    };
  }
}
