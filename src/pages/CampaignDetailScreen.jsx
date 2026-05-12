import { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

import MetricCard from '../components/MetricCard';
import PeriodSelector from '../components/PeriodSelector';
import StatusBadge from '../components/StatusBadge';
import { fetchCampaignVtubers, fetchCampaignDaily, fetchCampaignTotalClicks, deleteCampaign } from '../lib/api';

const tt = { background: '#fff', border: '1px solid #bae6fd', borderRadius: 8, color: '#0f172a', fontSize: 12 };
const COLORS = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#0284c7', '#06b6d4', '#22d3ee'];

export default function CampaignDetailScreen({ campaign, onSelectVtuber, onManageVtubers, onBack }) {
  const [period, setPeriod] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [vtubers, setVtubers] = useState([]);
  const [daily, setDaily] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const days = period === '30d' ? 30 : 365;
        const [v, d, t] = await Promise.all([
          fetchCampaignVtubers(campaign.campaign_id),
          fetchCampaignDaily(campaign.campaign_id, days),
          fetchCampaignTotalClicks(campaign.campaign_id),
        ]);
        if (!mounted) return;
        setVtubers(v);
        setDaily(d);
        setTotalClicks(t);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [campaign.campaign_id, period]);

  const handleDelete = async () => {
    if (!confirm(`案件「${campaign.campaign_name}」を削除します。よろしいですか？\n（関連するURL・クリックログも削除されます）`)) return;
    try {
      await deleteCampaign(campaign.campaign_id);
      onBack();
    } catch (e) {
      alert('削除に失敗しました: ' + e.message);
    }
  };

  const barData = vtubers.map(v => ({ name: v.name, clicks: v.clicks }));
  const avg = vtubers.length > 0 ? Math.round(totalClicks / vtubers.length) : 0;

  return (
    <div style={{ padding: '28px 32px', flex: 1, background: '#f0f9ff' }}>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', color: '#64748b',
        fontSize: 12, cursor: 'pointer', marginBottom: 16, padding: 0,
      }}>← ダッシュボードへ戻る</button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h1 style={{ fontSize: 19, fontWeight: 700, color: '#0f172a' }}>{campaign.campaign_name}</h1>
            <StatusBadge status={campaign.status} />
          </div>
          {campaign.description && <p style={{ fontSize: 12, color: '#64748b', marginBottom: 2 }}>{campaign.description}</p>}
          <p style={{ fontSize: 11, color: '#94a3b8' }}>期間：{campaign.start_date} 〜 {campaign.end_date}</p>
          {campaign.target_url && (
            <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
              リダイレクト先：<a href={campaign.target_url} target="_blank" rel="noreferrer" style={{ color: '#0284c7' }}>{campaign.target_url}</a>
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <PeriodSelector value={period} onChange={setPeriod} />
          <button onClick={onManageVtubers} style={{
            padding: '6px 14px', background: '#0ea5e9', border: 'none', borderRadius: 8,
            color: '#fff', fontSize: 13, fontWeight: 600,
          }}>VTuber URL管理</button>
          <button onClick={handleDelete} style={{
            padding: '6px 12px', background: '#fff', border: '1px solid #fecaca', borderRadius: 8,
            color: '#dc2626', fontSize: 12,
          }}>削除</button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: '#64748b', fontSize: 13 }}>読み込み中...</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
            <MetricCard label="総クリック数" value={totalClicks.toLocaleString()} sub="案件全体" primary />
            <MetricCard label="参加VTuber" value={vtubers.length} sub="名" />
            <MetricCard label="平均/VTuber" value={avg.toLocaleString()} sub="クリック" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14, marginBottom: 20 }}>
            <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, padding: 18 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 14 }}>クリック数トレンド</p>
              {daily.length === 0 ? (
                <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', padding: 60 }}>データなし</p>
              ) : (
                <ResponsiveContainer width="100%" height={190}>
                  <LineChart data={daily}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} interval={Math.floor(daily.length / 6)} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={tt} />
                    <Line type="monotone" dataKey="clicks" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
            <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, padding: 18 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 14 }}>VTuber別クリック数</p>
              {barData.length === 0 ? (
                <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', padding: 60 }}>VTuberがまだ登録されていません</p>
              ) : (
                <ResponsiveContainer width="100%" height={190}>
                  <BarChart data={barData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                    <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#64748b' }} width={70} />
                    <Tooltip contentStyle={tt} />
                    <Bar dataKey="clicks" fill="#38bdf8" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '13px 20px', borderBottom: '1px solid #e0f2fe' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>
                VTuber別クリック数 <span style={{ fontSize: 11, fontWeight: 400, color: '#94a3b8' }}>（降順）</span>
              </p>
            </div>
            {vtubers.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
                VTuberがまだ登録されていません。<br />
                <button
                  onClick={onManageVtubers}
                  style={{
                    marginTop: 12, padding: '6px 16px', background: '#0ea5e9', border: 'none', borderRadius: 8,
                    color: '#fff', fontSize: 13, fontWeight: 600,
                  }}
                >+ VTuber URLを発行</button>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['順位', 'VTuber名', 'クリック数', 'シェア', ''].map((h, i) => (
                      <th key={i} style={{
                        padding: '9px 18px', textAlign: i >= 2 ? 'center' : 'left',
                        color: '#94a3b8', fontWeight: 500, fontSize: 11,
                        letterSpacing: '0.05em', textTransform: 'uppercase',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vtubers.map((v, i) => {
                    const share = totalClicks > 0 ? ((v.clicks / totalClicks) * 100).toFixed(1) : '0.0';
                    return (
                      <tr key={v.url_id} style={{ borderTop: '1px solid #f0f9ff' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f0f9ff'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '12px 18px' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: 22, height: 22, borderRadius: '50%', fontSize: 11, fontWeight: 700,
                            background: i === 0 ? '#fef3c7' : i === 1 ? '#e0f2fe' : '#f1f5f9',
                            color: i === 0 ? '#d97706' : i === 1 ? '#0284c7' : '#94a3b8',
                          }}>{i + 1}</span>
                        </td>
                        <td style={{ padding: '12px 18px' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: 26, height: 26, borderRadius: '50%', marginRight: 8,
                            background: COLORS[i % COLORS.length] + '20', color: COLORS[i % COLORS.length],
                            fontSize: 11, fontWeight: 700, verticalAlign: 'middle',
                          }}>{v.name[0]}</span>
                          <span style={{ color: '#0f172a', fontWeight: 500 }}>{v.name}</span>
                        </td>
                        <td style={{ padding: '12px 18px', textAlign: 'center', color: '#0ea5e9', fontWeight: 700 }}>
                          {v.clicks.toLocaleString()}
                        </td>
                        <td style={{ padding: '12px 18px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                            <div style={{ width: 56, height: 4, borderRadius: 2, background: '#e0f2fe', overflow: 'hidden' }}>
                              <div style={{ width: share + '%', height: '100%', background: '#38bdf8', borderRadius: 2 }} />
                            </div>
                            <span style={{ fontSize: 11, color: '#64748b' }}>{share}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 18px', textAlign: 'center' }}>
                          <button onClick={() => onSelectVtuber(v)} style={{
                            padding: '4px 12px', borderRadius: 6,
                            border: '1px solid #bae6fd', background: 'transparent',
                            color: '#0284c7', fontSize: 12,
                          }}>詳細</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
