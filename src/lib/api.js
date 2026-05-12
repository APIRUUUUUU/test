import { supabase } from './supabase';

// ============================================
// 認証
// ============================================
export async function loginCompany(companyId) {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('company_id', companyId)
    .single();
  if (error) throw new Error('企業IDが見つかりません');
  return data;
}

// ============================================
// 案件
// ============================================
export async function fetchCampaigns(companyId) {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false });
  if (error) throw error;

  // 各案件にクリック数を付与
  const withClicks = await Promise.all(
    (data || []).map(async (c) => {
      const total = await fetchCampaignTotalClicks(c.campaign_id);
      return { ...c, totalClicks: total };
    })
  );
  return withClicks;
}

export async function fetchCampaign(campaignId) {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('campaign_id', campaignId)
    .single();
  if (error) throw error;
  return data;
}

export async function createCampaign({
  company_id, campaign_name, description, target_url, start_date, end_date, status,
}) {
  const { data, error } = await supabase
    .from('campaigns')
    .insert({
      company_id, campaign_name, description, target_url,
      start_date, end_date, status: status || 'active',
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCampaign(campaignId) {
  const { error } = await supabase
    .from('campaigns').delete().eq('campaign_id', campaignId);
  if (error) throw error;
}

// ============================================
// クリック数集計
// ============================================
export async function fetchCampaignTotalClicks(campaignId) {
  const { data, error } = await supabase
    .from('vtuber_urls')
    .select('url_id')
    .eq('campaign_id', campaignId);
  if (error) throw error;
  const urlIds = (data || []).map(d => d.url_id);
  if (urlIds.length === 0) return 0;

  const { count } = await supabase
    .from('clicks')
    .select('*', { count: 'exact', head: true })
    .in('url_id', urlIds);
  return count || 0;
}

export async function fetchCampaignVtubers(campaignId) {
  const { data: urls, error } = await supabase
    .from('vtuber_urls')
    .select('url_id, vtuber_id, vtuber_name, short_code')
    .eq('campaign_id', campaignId);
  if (error) throw error;

  const result = await Promise.all(
    (urls || []).map(async (u) => {
      const { count } = await supabase
        .from('clicks')
        .select('*', { count: 'exact', head: true })
        .eq('url_id', u.url_id);
      return {
        id: u.vtuber_id,
        url_id: u.url_id,
        name: u.vtuber_name,
        short_code: u.short_code,
        clicks: count || 0,
        trend: 0, // Phase 2で計算
      };
    })
  );
  return result.sort((a, b) => b.clicks - a.clicks);
}

export async function fetchCampaignDaily(campaignId, days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data: urls } = await supabase
    .from('vtuber_urls')
    .select('url_id')
    .eq('campaign_id', campaignId);
  const urlIds = (urls || []).map(u => u.url_id);
  if (urlIds.length === 0) return [];

  const { data, error } = await supabase
    .from('clicks')
    .select('clicked_at')
    .in('url_id', urlIds)
    .gte('clicked_at', since.toISOString());
  if (error) throw error;

  // 日付ごとに集計
  const counts = {};
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    const key = d.toISOString().slice(0, 10);
    counts[key] = 0;
  }
  (data || []).forEach(row => {
    const key = row.clicked_at.slice(0, 10);
    if (counts[key] !== undefined) counts[key]++;
  });

  return Object.entries(counts).map(([date, clicks]) => {
    const d = new Date(date);
    return { date: `${d.getMonth() + 1}/${d.getDate()}`, clicks };
  });
}

export async function fetchDashboardTimeseries(companyId, days = 30) {
  const campaigns = await supabase
    .from('campaigns').select('campaign_id, campaign_name').eq('company_id', companyId);
  const list = campaigns.data || [];

  const seriesPerCampaign = await Promise.all(
    list.map(async (c) => ({
      name: c.campaign_name,
      daily: await fetchCampaignDaily(c.campaign_id, days),
    }))
  );

  // 日付軸を統一して merge
  const dates = seriesPerCampaign[0]?.daily?.map(d => d.date) || [];
  return dates.map((date, i) => {
    const row = { date };
    seriesPerCampaign.forEach(s => {
      row[s.name] = s.daily[i]?.clicks || 0;
    });
    return row;
  });
}

// ============================================
// VTuber
// ============================================
export async function fetchVtuberDetails(vtuberId, companyId) {
  // この企業の案件の中で、このVTuberが参加している案件を集める
  const { data: campaigns } = await supabase
    .from('campaigns').select('campaign_id, campaign_name, start_date, end_date').eq('company_id', companyId);

  const result = [];
  for (const c of (campaigns || [])) {
    const { data: urls } = await supabase
      .from('vtuber_urls')
      .select('url_id, vtuber_name')
      .eq('campaign_id', c.campaign_id)
      .eq('vtuber_id', vtuberId);
    if (!urls || urls.length === 0) continue;

    const urlIds = urls.map(u => u.url_id);
    const { count } = await supabase
      .from('clicks').select('*', { count: 'exact', head: true }).in('url_id', urlIds);

    result.push({
      campaignId: c.campaign_id,
      campaignName: c.campaign_name,
      start_date: c.start_date,
      end_date: c.end_date,
      clicks: count || 0,
      vtuber_name: urls[0].vtuber_name,
    });
  }
  return result;
}

export async function fetchUniqueVtuberCount(companyId) {
  const { data: campaigns } = await supabase
    .from('campaigns').select('campaign_id').eq('company_id', companyId);
  const campaignIds = (campaigns || []).map(c => c.campaign_id);
  if (campaignIds.length === 0) return 0;

  const { data } = await supabase
    .from('vtuber_urls').select('vtuber_id').in('campaign_id', campaignIds);
  const set = new Set((data || []).map(d => d.vtuber_id));
  return set.size;
}

// ============================================
// VTuber URL管理
// ============================================
export async function createVtuberUrl({ campaign_id, vtuber_id, vtuber_name }) {
  const short_code = generateShortCode();
  const { data, error } = await supabase
    .from('vtuber_urls')
    .insert({ campaign_id, vtuber_id, vtuber_name, short_code })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteVtuberUrl(urlId) {
  const { error } = await supabase
    .from('vtuber_urls').delete().eq('url_id', urlId);
  if (error) throw error;
}

function generateShortCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// ============================================
// 管理者用 API（Vplus運営）
// ============================================
export async function fetchAllCompanies() {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;

  // 各企業のキャンペーン数・総クリック数を集計
  const enriched = await Promise.all(
    (data || []).map(async (c) => {
      const { data: cams } = await supabase
        .from('campaigns')
        .select('campaign_id')
        .eq('company_id', c.company_id);
      const campaignIds = (cams || []).map(x => x.campaign_id);

      let totalClicks = 0;
      if (campaignIds.length > 0) {
        const { data: urls } = await supabase
          .from('vtuber_urls')
          .select('url_id')
          .in('campaign_id', campaignIds);
        const urlIds = (urls || []).map(u => u.url_id);
        if (urlIds.length > 0) {
          const { count } = await supabase
            .from('clicks')
            .select('*', { count: 'exact', head: true })
            .in('url_id', urlIds);
          totalClicks = count || 0;
        }
      }
      return { ...c, campaignCount: campaignIds.length, totalClicks };
    })
  );
  return enriched;
}

export async function createCompany({ company_id, company_name }) {
  const { data, error } = await supabase
    .from('companies')
    .insert({ company_id, company_name })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCompany(companyId) {
  const { error } = await supabase
    .from('companies').delete().eq('company_id', companyId);
  if (error) throw error;
}

export async function fetchAllCampaignsAdmin() {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*, companies(company_name)')
    .order('created_at', { ascending: false });
  if (error) throw error;

  const enriched = await Promise.all(
    (data || []).map(async (c) => {
      const totalClicks = await fetchCampaignTotalClicks(c.campaign_id);
      const { count: vtuberCount } = await supabase
        .from('vtuber_urls')
        .select('*', { count: 'exact', head: true })
        .eq('campaign_id', c.campaign_id);
      return { ...c, totalClicks, vtuberCount: vtuberCount || 0 };
    })
  );
  return enriched;
}

export async function fetchAllVtuberUrlsAdmin() {
  const { data, error } = await supabase
    .from('vtuber_urls')
    .select('*, campaigns(campaign_name, company_id, companies(company_name))')
    .order('created_at', { ascending: false });
  if (error) throw error;

  const enriched = await Promise.all(
    (data || []).map(async (u) => {
      const { count } = await supabase
        .from('clicks').select('*', { count: 'exact', head: true }).eq('url_id', u.url_id);
      return { ...u, clicks: count || 0 };
    })
  );
  return enriched;
}

export async function fetchSystemStats() {
  const [companies, campaigns, urls, clicks] = await Promise.all([
    supabase.from('companies').select('*', { count: 'exact', head: true }),
    supabase.from('campaigns').select('*', { count: 'exact', head: true }),
    supabase.from('vtuber_urls').select('*', { count: 'exact', head: true }),
    supabase.from('clicks').select('*', { count: 'exact', head: true }),
  ]);
  return {
    companies: companies.count || 0,
    campaigns: campaigns.count || 0,
    urls: urls.count || 0,
    clicks: clicks.count || 0,
  };
}
