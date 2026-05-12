import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

import MetricCard from '../components/MetricCard';
import { fetchVtuberDetails } from '../lib/api';

const tt = { background: '#fff', border: '1px solid #bae6fd', borderRadius: 8, color: '#0f172a', fontSize: 12 };
const COLORS = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#0284c7', '#06b6d4', '#22d3ee'];

export default function VtuberDetailScreen({ vtuber, company, onBack }) {
  const [loading, setLoading] = useState(true);
  const [breakdown, setBreakdown] = useState([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const d = await fetchVtuberDetails(vtuber.id, company.company_id);
        if (mounted) setBreakdown(d);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [vtuber.id, company.company_id]);

  const total = breakdown.reduce((s, c) => s + c.clicks, 0);
  const barData = breakdown.map(c => ({
    name: c.campaignName.length > 9 ? c.campaignName.slice(0, 9) + '…' : c.campaignName,
    clicks: c.clicks,
  }));

  return (
    <div style={{ padding: '28px 32px', flex: 1, background: '#f0f9ff' }}>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', color: '#64748b',
        fontSize: 12, cursor: 'pointer', marginBottom: 16, padding: 0,
      }}>← 案件詳細へ戻る</button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: '#e0f2fe', border: '2px solid #7dd3fc',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: '#0284c7', fontWeight: 700,
        }}>{vtuber.name[0]}</div>
        <div>
          <h1 style={{ fontSize: 19, fontWeight: 700, color: '#0f172a' }}>{vtuber.name}</h1>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>VTuber詳細 — 全案件クリック数分析</p>
        </div>
      </div>

      {loading ? (
        <p style={{ color: '#64748b', fontSize: 13 }}>読み込み中...</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
            <MetricCard label="全案件クリック合計" value={total.toLocaleString()} sub="このVTuber" primary />
            <MetricCard label="参加案件数" value={breakdown.length} sub="件" />
            <MetricCard
              label="平均/案件"
              value={breakdown.length > 0 ? Math.round(total / breakdown.length).toLocaleString() : '0'}
              sub="クリック"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, padding: 18 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 14 }}>案件別クリック数</p>
              {barData.length === 0 ? (
                <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', padding: 60 }}>データなし</p>
              ) : (
                <ResponsiveContainer width="100%" height={190}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={tt} />
                    <Bar dataKey="clicks" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, padding: 18 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 14 }}>案件別シェア</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
                {breakdown.map((c, i) => {
                  const share = total > 0 ? ((c.clicks / total) * 100).toFixed(1) : '0.0';
                  return (
                    <div key={c.campaignId}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ fontSize: 12, color: '#334155' }}>
                          {c.campaignName.length > 14 ? c.campaignName.slice(0, 14) + '…' : c.campaignName}
                        </span>
                        <span style={{ fontSize: 12, color: '#0284c7', fontWeight: 600 }}>{share}%</span>
                      </div>
                      <div style={{ width: '100%', height: 6, background: '#e0f2fe', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{
                          width: share + '%', height: '100%',
                          background: COLORS[i % COLORS.length], borderRadius: 3, transition: 'width .5s',
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '13px 20px', borderBottom: '1px solid #e0f2fe' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>案件ごとのクリック数一覧</p>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['案件名', 'クリック数', 'シェア'].map((h, i) => (
                    <th key={i} style={{
                      padding: '9px 18px', textAlign: i === 0 ? 'left' : 'center',
                      color: '#94a3b8', fontWeight: 500, fontSize: 11,
                      letterSpacing: '0.05em', textTransform: 'uppercase',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {breakdown.map((c, i) => {
                  const share = total > 0 ? ((c.clicks / total) * 100).toFixed(1) : '0.0';
                  return (
                    <tr key={c.campaignId} style={{ borderTop: '1px solid #f0f9ff' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f0f9ff'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '12px 18px' }}>
                        <p style={{ color: '#0f172a', fontWeight: 500 }}>{c.campaignName}</p>
                        <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{c.start_date} 〜 {c.end_date}</p>
                      </td>
                      <td style={{ padding: '12px 18px', textAlign: 'center', color: '#0ea5e9', fontWeight: 700 }}>
                        {c.clicks.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 18px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                          <div style={{ width: 80, height: 4, borderRadius: 2, background: '#e0f2fe', overflow: 'hidden' }}>
                            <div style={{ width: share + '%', height: '100%', background: COLORS[i % COLORS.length] }} />
                          </div>
                          <span style={{ fontSize: 12, color: '#64748b', minWidth: 36 }}>{share}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
