/**
 * Extract YouTube video ID from various URL formats
 * Supports: youtube.com/watch?v=, youtu.be/, youtube.com/live/, youtube.com/embed/
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    
    // youtube.com/watch?v=VIDEO_ID
    if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
      return urlObj.searchParams.get('v');
    }
    
    // youtube.com/live/VIDEO_ID
    if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.startsWith('/live/')) {
      return urlObj.pathname.split('/live/')[1]?.split('?')[0] || null;
    }
    
    // youtube.com/embed/VIDEO_ID
    if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.startsWith('/embed/')) {
      return urlObj.pathname.split('/embed/')[1]?.split('?')[0] || null;
    }
    
    // youtu.be/VIDEO_ID
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1).split('?')[0] || null;
    }
    
    return null;
  } catch {
    return null;
  }
}

/**
 * Get YouTube thumbnail URL from video URL
 * Returns high quality thumbnail (maxresdefault) with fallback to hqdefault
 */
export function getYouTubeThumbnail(url: string, quality: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault' = 'maxresdefault'): string {
  const videoId = extractYouTubeVideoId(url);
  
  if (!videoId) {
    // Return placeholder image if video ID cannot be extracted
    return 'https://readdy.ai/api/search-image?query=youtube%20video%20placeholder%20thumbnail%20with%20yellow%20theme%2C%20simple%20clean%20design&width=400&height=225&seq=placeholder001&orientation=landscape';
  }
  
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Check if thumbnail exists, fallback to lower quality if not
 */
export async function getYouTubeThumbnailWithFallback(url: string): Promise<string> {
  const videoId = extractYouTubeVideoId(url);
  
  if (!videoId) {
    return 'https://readdy.ai/api/search-image?query=youtube%20video%20placeholder%20thumbnail%20with%20yellow%20theme%2C%20simple%20clean%20design&width=400&height=225&seq=placeholder001&orientation=landscape';
  }
  
  // Try maxresdefault first, fallback to hqdefault
  const maxRes = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const hqDefault = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  
  try {
    const response = await fetch(maxRes, { method: 'HEAD' });
    if (response.ok) {
      return maxRes;
    }
  } catch {
    // Fallback to hqdefault
  }
  
  return hqDefault;
}
