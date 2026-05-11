// ============================================================
// モックデータ
// 実際のAPIと接続する際はこのファイルをAPI呼び出しに置き換えてください
// ============================================================

export const generateDailyData = () => {
  const data = [];
  const base = new Date('2025-04-13');
  for (let i = 0; i < 30; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    data.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      キャンペーンA: Math.floor(800 + Math.random() * 600 + i * 20),
      キャンペーンB: Math.floor(400 + Math.random() * 400 + i * 10),
      キャンペーンC: Math.floor(200 + Math.random() * 300 + i * 5),
    });
  }
  return data;
};

export const mockDailyData = generateDailyData();

export const campaigns = [
  {
    id: 'c1',
    name: '新作ゲームローンチキャンペーン',
    description: 'RPG新作タイトル「クロニクル・ゼロ」のリリース記念タイアップ広告',
    start_date: '2025-04-13',
    end_date: '2025-05-12',
    status: 'active',
    totalClicks: 87432,
    vtubers: [
      { id: 'v1', name: '星宮あかり', clicks: 32100, trend: 12 },
      { id: 'v2', name: '夜空みこと', clicks: 21400, trend: 8 },
      { id: 'v3', name: '蒼井ルナ',   clicks: 18900, trend: -3 },
      { id: 'v4', name: '紅羽そら',   clicks: 11200, trend: 21 },
      { id: 'v5', name: '碧音ゆい',   clicks:  3832, trend: -1 },
    ],
    daily: mockDailyData.map(d => ({ date: d.date, clicks: d['キャンペーンA'] })),
  },
  {
    id: 'c2',
    name: '夏コレクション告知',
    description: 'アパレルブランドの夏季新作ラインナップをVTuberと共にPR',
    start_date: '2025-03-01',
    end_date: '2025-04-30',
    status: 'ended',
    totalClicks: 41280,
    vtubers: [
      { id: 'v2', name: '夜空みこと', clicks: 15600, trend: 5 },
      { id: 'v6', name: '白雪ちとせ', clicks: 14200, trend: 2 },
      { id: 'v3', name: '蒼井ルナ',   clicks: 11480, trend: -7 },
    ],
    daily: mockDailyData.map(d => ({ date: d.date, clicks: d['キャンペーンB'] })),
  },
  {
    id: 'c3',
    name: '新サービス認知拡大',
    description: '動画配信サービス「StreamBox」のブランド認知向上施策',
    start_date: '2025-05-01',
    end_date: '2025-06-30',
    status: 'active',
    totalClicks: 19870,
    vtubers: [
      { id: 'v1', name: '星宮あかり', clicks: 9870, trend: 34 },
      { id: 'v4', name: '紅羽そら',   clicks: 7300, trend: 18 },
      { id: 'v5', name: '碧音ゆい',   clicks: 2700, trend: 6 },
    ],
    daily: mockDailyData.map(d => ({ date: d.date, clicks: d['キャンペーンC'] })),
  },
];

export const allVtubers = (() => {
  const map = {};
  campaigns.forEach(c => {
    c.vtubers.forEach(v => {
      if (!map[v.id]) map[v.id] = { id: v.id, name: v.name, campaigns: [] };
      map[v.id].campaigns.push({
        campaignId: c.id,
        campaignName: c.name,
        clicks: v.clicks,
      });
    });
  });
  return Object.values(map);
})();

export const COLORS = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#0284c7', '#06b6d4', '#22d3ee'];
