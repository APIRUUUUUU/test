// クリックトラッキング & リダイレクト
// アクセス: /r/{short_code}
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing code');
  }

  try {
    // short_codeから URL情報を取得
    const { data: urlData, error: urlErr } = await supabase
      .from('vtuber_urls')
      .select('url_id, campaign_id, campaigns(target_url, status)')
      .eq('short_code', code)
      .single();

    if (urlErr || !urlData) {
      return res.status(404).send('URL not found');
    }

    // クリックを記録
    await supabase.from('clicks').insert({
      url_id: urlData.url_id,
      user_agent: req.headers['user-agent'] || null,
      referer: req.headers['referer'] || null,
    });

    // ターゲットURLへリダイレクト
    const targetUrl = urlData.campaigns?.target_url;
    if (!targetUrl) {
      return res.status(404).send('Target URL not configured');
    }

    res.setHeader('Cache-Control', 'no-store');
    res.redirect(302, targetUrl);
  } catch (e) {
    console.error('Tracking error:', e);
    res.status(500).send('Internal error');
  }
}
