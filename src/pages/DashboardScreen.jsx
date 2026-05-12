import { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

import MetricCard from '../components/MetricCard';
import PeriodSelector from '../components/PeriodSelector';
import StatusBadge from '../components/StatusBadge';
import { fetchCampaigns, fetchDashboardTimeseries, fetchUniqueVtuberCount } from '../lib/api';

const tt = { background: '#fff', border: '1px solid #bae6fd', borderRadius: 8, color: '#0f172a', fontSize: 12 };
const LINE_COLORS = ['#0ea5e9', '#38bdf8', '#0284c7', '#7dd3fc', '#06b6d4', '#22d3ee'];

export default function DashboardScreen({ company, onSelectCampaign, onCreate }) {
  const [period, setPeriod] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [vtuberCount, setVtuberCount] = useState(0);
  const [timeseries, setTimeseries] = useState([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const days = period === '30d' ? 30 : 365;
        const [c, v, ts] = await Promise.all([
          fetchCampaigns(company.company_id),
          fetchUniqueVtuberCount(company.company_id),
          fetchDashboardTimeseries(company.company_id, days),
        ]);
        if (!mounted) return;
        setCampaigns(c);
        setVtuberCount(v);
        setTimeseries(ts);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [company.company_id, period]);

  const totalClicks = campaigns.reduce((s, c) => s + (c.totalClicks || 0), 0);
  const activeCount = campaigns.filter(c => c.status === 'active').length;
  const barData = campaigns.map(c => ({
    name: c.campaign_name.length > 9 ? c.campaign_name.slice(0, 9) + '…' : c.campaign_name,
    clicks: c.totalClicks || 0,
  }));
  const campaignKeys = campaigns.map(c => c.campaign_name);

  return (
    <div style={{ padding: '28px 32px', flex: 1, background: '#f0f9ff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 19, fontWeight: 700, color: '#0f172a' }}>ダッシュボード</h1>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 3 }}>全案件パフォーマンス概要</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <PeriodSelector value={period} onChange={setPeriod} />
          <button
            onClick={onCreate}
            style={{
              padding: '6px 16px', background: '#0ea5e9', border: 'none', borderRadius: 8,
              color: '#fff', fontSize: 13, fontWeight: 600,
            }}
          >+ 案件を作成</button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: '#64748b', fontSize: 13 }}>読み込み中...</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
            <MetricCard label="総クリック数（KPI）" value={totalClicks.toLocaleString()} sub="全案件合計" primary />
            <MetricCard label="配信中案件" value={activeCount} sub={`全 ${campaigns.length} 案件`} />
            <MetricCard label="参加VTuber" value={vtuberCount} sub="名（重複なし）" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14, marginBottom: 20 }}>
            <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, padding: 18 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 14 }}>期間別クリック数トレンド</p>
              {timeseries.length === 0 ? (
                <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', padding: 60 }}>データなし</p>
              ) : (
                <ResponsiveContainer width="100%" height={190}>
                  <LineChart data={timeseries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} interval={Math.floor(timeseries.length / 6)} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={tt} />
                    <Legend wrapperStyle={{ fontSize: 11, color: '#64748b' }} />
                    {campaignKeys.map((key, i) => (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={LINE_COLORS[i % LINE_COLORS.length]}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
            <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, padding: 18 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 14 }}>案件別クリック数</p>
              {barData.length === 0 ? (
                <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', padding: 60 }}>データなし</p>
              ) : (
                <ResponsiveContainer width="100%" height={190}>
                  <BarChart data={barData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                    <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#64748b' }} width={72} />
                    <Tooltip contentStyle={tt} />
                    <Bar dataKey="clicks" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '13px 20px', borderBottom: '1px solid #e0f2fe' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>案件一覧</p>
            </div>
            {campaigns.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
                案件がまだありません。<br />
                <button
                  onClick={onCreate}
                  style={{
                    marginTop: 12, padding: '6px 16px', background: '#0ea5e9', border: 'none', borderRadius: 8,
                    color: '#fff', fontSize: 13, fontWeight: 600,
                  }}
                >+ 最初の案件を作成</button>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['案件名', 'ステータス', '期間', '総クリック数', ''].map((h, i) => (
                      <th key={i} style={{
                        padding: '9px 18px', textAlign: i >= 2 ? 'center' : 'left',
                        color: '#94a3b8', fontWeight: 500, fontSize: 11,
                        letterSpacing: '0.05em', textTransform: 'uppercase',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map(c => (
                    <tr key={c.campaign_id} style={{ borderTop: '1px solid #f0f9ff' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f0f9ff'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '13px 18px', color: '#0f172a', fontWeight: 500 }}>{c.campaign_name}</td>
                      <td style={{ padding: '13px 18px' }}><StatusBadge status={c.status} /></td>
                      <td style={{ padding: '13px 18px', color: '#64748b', textAlign: 'center', fontSize: 12 }}>
                        {c.start_date} → {c.end_date}
                      </td>
                      <td style={{ padding: '13px 18px', textAlign: 'center', color: '#0ea5e9', fontWeight: 700, fontSize: 15 }}>
                        {(c.totalClicks || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: '13px 18px', textAlign: 'center' }}>
                        <button onClick={() => onSelectCampaign(c)} style={{
                          padding: '5px 14px', borderRadius: 6,
                          border: '1px solid #bae6fd', background: '#f0f9ff',
                          color: '#0284c7', fontSize: 12, fontWeight: 500,
                        }}>詳細</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
