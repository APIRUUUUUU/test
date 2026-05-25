import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // YouTube Data API v3のAPIキーを環境変数から取得
    const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
    const CHANNEL_ID = 'UCO0UOvSRvaRe2XTBQ5pjRYQ'; // 黄白レモのチャンネルID

    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API key is not configured');
    }

    // チャンネル統計情報を取得
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );

    if (!channelResponse.ok) {
      const errorData = await channelResponse.text();
      console.error('YouTube API Error:', errorData);
      throw new Error(`YouTube API request failed: ${channelResponse.status}`);
    }

    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found');
    }

    const statistics = channelData.items[0].statistics;
    const subscriberCount = parseInt(statistics.subscriberCount || '0');

    // メンバーシップ数は直接取得できないため、
    // 別途手動更新または推定値を使用
    // ここでは既存の値を保持するか、デフォルト値を使用
    const membershipCount = 80; // 手動更新が必要

    const result = {
      subscribers: subscriberCount,
      membership: membershipCount,
      lastUpdated: new Date().toISOString(),
      videoCount: parseInt(statistics.videoCount || '0'),
      viewCount: parseInt(statistics.viewCount || '0'),
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching YouTube stats:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message,
        subscribers: 17965,
        membership: 80,
        lastUpdated: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // エラー時もフォールバック値を返す
      }
    );
  }
});
