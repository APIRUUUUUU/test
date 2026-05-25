import { supabase } from './supabase';

export interface YouTubeStats {
  subscribers: number;
  membership: number;
  lastUpdated: string;
  videoCount?: number;
  viewCount?: number;
}

// キャッシュの有効期限（5分）
const CACHE_DURATION = 5 * 60 * 1000;
let cachedStats: YouTubeStats | null = null;
let lastFetchTime = 0;

export async function fetchYouTubeStats(): Promise<YouTubeStats> {
  const now = Date.now();

  // キャッシュが有効な場合は、キャッシュから返す
  if (cachedStats && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedStats;
  }

  try {
    const { data, error } = await supabase.functions.invoke('youtube-stats');

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('No data returned from function');
    }

    const stats: YouTubeStats = {
      subscribers: data.subscribers ?? 17971,
      membership: data.membership ?? 80,
      lastUpdated: data.lastUpdated ?? new Date().toISOString(),
      videoCount: data.videoCount,
      viewCount: data.viewCount,
    };

    cachedStats = stats;
    lastFetchTime = now;

    return stats;
  } catch (error) {
    console.error('YouTube統計情報の取得に失敗しました:', error);

    // エラー時はフォールバック値を返す
    return {
      subscribers: 17971,
      membership: 80,
      lastUpdated: new Date().toISOString(),
    };
  }
}

// 定期的に更新する関数
export function startPeriodicUpdate(callback: (stats: YouTubeStats) => void, intervalMinutes = 5) {
  // 初回実行
  fetchYouTubeStats().then(callback);

  // 定期実行
  const intervalId = setInterval(() => {
    fetchYouTubeStats().then(callback);
  }, intervalMinutes * 60 * 1000);

  return () => clearInterval(intervalId);
}