import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const YOUTUBE_API_KEY = Deno.env.get("YOUTUBE_API_KEY");
    if (!YOUTUBE_API_KEY) {
      throw new Error("YouTube API key not configured");
    }

    const channelId = "UCiGm0nlI1NZNhBjN-vd38YA";

    // Method 1: Search for upcoming and live broadcasts
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=upcoming&type=video&maxResults=50&key=${YOUTUBE_API_KEY}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    // Method 2: Search for live broadcasts
    const liveUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`;
    const liveResponse = await fetch(liveUrl);
    const liveData = await liveResponse.json();

    // Method 3: Get channel's uploads playlist
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`;
    const channelResponse = await fetch(channelUrl);
    const channelData = await channelResponse.json();
    
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    
    let playlistVideoIds: string[] = [];
    if (uploadsPlaylistId) {
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${YOUTUBE_API_KEY}`;
      const playlistResponse = await fetch(playlistUrl);
      const playlistData = await playlistResponse.json();
      playlistVideoIds = playlistData.items?.map((item: any) => item.snippet.resourceId.videoId).filter(Boolean) || [];
    }

    // Combine all video IDs
    const upcomingIds = searchData.items?.map((item: any) => item.id.videoId).filter(Boolean) || [];
    const liveIds = liveData.items?.map((item: any) => item.id.videoId).filter(Boolean) || [];
    const allVideoIds = [...new Set([...upcomingIds, ...liveIds, ...playlistVideoIds])];

    let videoDetails: any[] = [];
    if (allVideoIds.length > 0) {
      // Split into chunks of 50 (API limit)
      const chunks = [];
      for (let i = 0; i < allVideoIds.length; i += 50) {
        chunks.push(allVideoIds.slice(i, i + 50));
      }

      for (const chunk of chunks) {
        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${chunk.join(",")}&key=${YOUTUBE_API_KEY}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();
        
        if (detailsData.items) {
          videoDetails = [...videoDetails, ...detailsData.items];
        }
      }
    }

    // Filter only live and upcoming streams
    const schedules = videoDetails
      .filter((video: any) => {
        const broadcastContent = video.snippet.liveBroadcastContent;
        return broadcastContent === "live" || broadcastContent === "upcoming";
      })
      .map((video: any) => {
        const isLive = video.snippet.liveBroadcastContent === "live";
        const scheduledTime = video.liveStreamingDetails?.scheduledStartTime || 
                            video.liveStreamingDetails?.actualStartTime;
        
        return {
          id: video.id,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.medium?.url,
          scheduledStartTime: scheduledTime,
          isLive,
          url: `https://www.youtube.com/watch?v=${video.id}`,
          channelTitle: video.snippet.channelTitle,
        };
      })
      .sort((a: any, b: any) => {
        if (a.isLive && !b.isLive) return -1;
        if (!a.isLive && b.isLive) return 1;
        return new Date(a.scheduledStartTime).getTime() - new Date(b.scheduledStartTime).getTime();
      });

    return new Response(JSON.stringify({ schedules }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});