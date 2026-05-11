import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

import MetricCard from '../components/MetricCard';
import PeriodSelector from '../components/PeriodSelector';
import StatusBadge from '../components/StatusBadge';
import { campaigns, allVtubers, mockDailyData } from '../data/mockData';

const tt = { background: '#fff', border: '1px solid #bae6fd', borderRadius: 8, color: '#0f172a', fontSize: 12 };

export default function DashboardScreen({ onSelectCampaign }) {
  const [period, setPeriod] = useState('30d');
  const totalClicks = campaigns.reduce((s, c) => s + c.totalClicks, 0);
  const activeCount = campaigns.filter(c => c.status === 'active').length;
  const chartData = mockDailyData.filter((_, i) => i % 2 === 0);
  const barData = campaigns.map(c => ({ name: c.name.slice(0, 9) + '…', clicks: c.totalClicks }));

  return (
    <div style={{ padding: '28px 32px', flex: 1, overflowY: 'auto', background: '#f0f9ff' }}>
      {/* ヘッダー */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 19, fontWeight: 700, color: '#0f172a' }}>ダッシュボード</h1>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 3 }}>全案件パフォーマンス概要</p>
        </div>
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        <MetricCard label="総クリック数（KPI）" value={totalClicks.toLocaleString()} sub="全案件合計" primary />
        <MetricCard label="配信中案件" value={activeCount} sub={`全 ${campaigns.length} 案件`} />
        <MetricCard label="参加VTuber" value={allVtubers.length} sub="名（重複なし）" />
      </div>

      {/* グラフ */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14, marginBottom: 20 }}>
        <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 14 }}>期間別クリック数トレンド</p>
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} interval={4} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip contentStyle={tt} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#64748b' }} />
              <Line type="monotone" dataKey="キャンペーンA" stroke="#0ea5e9" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="キャンペーンB" stroke="#38bdf8" strokeWidth={2} dot={false} strokeDasharray="4 2" />
              <Line type="monotone" dataKey="キャンペーンC" stroke="#7dd3fc" strokeWidth={2} dot={false} strokeDasharray="2 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 14 }}>案件別クリック数</p>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={barData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#64748b' }} width={72} />
              <Tooltip contentStyle={tt} />
              <Bar dataKey="clicks" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 案件一覧 */}
      <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '13px 20px', borderBottom: '1px solid #e0f2fe' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>案件一覧</p>
        </div>
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
              <tr key={c.id} style={{ borderTop: '1px solid #f0f9ff' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0f9ff'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '13px 18px', color: '#0f172a', fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: '13px 18px' }}><StatusBadge status={c.status} /></td>
                <td style={{ padding: '13px 18px', color: '#64748b', textAlign: 'center', fontSize: 12 }}>
                  {c.start_date} → {c.end_date}
                </td>
                <td style={{ padding: '13px 18px', textAlign: 'center', color: '#0ea5e9', fontWeight: 700, fontSize: 15 }}>
                  {c.totalClicks.toLocaleString()}
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
      </div>
    </div>
  );
}
