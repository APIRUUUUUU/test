import { useEffect, useState } from 'react';
import {
  fetchAllCompanies, createCompany, deleteCompany,
  fetchAllCampaignsAdmin, fetchAllVtuberUrlsAdmin, fetchSystemStats,
} from '../lib/api';
import MetricCard from '../components/MetricCard';

const TABS = [
  { key: 'overview',  label: '概要' },
  { key: 'companies', label: '企業管理' },
  { key: 'campaigns', label: '全案件' },
  { key: 'urls',      label: '全URL' },
];

export default function AdminScreen({ onLogout }) {
  const [tab, setTab] = useState('overview');

  return (
    <div style={{ minHeight: '100vh', background: '#f0f9ff' }}>
      {/* ヘッダー */}
      <header style={{
        background: '#0c4a6e', color: '#fff', padding: '14px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7, background: '#0ea5e9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 800,
          }}>V</div>
          <div>
            <h1 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.1 }}>Vplus 管理ツール</h1>
            <p style={{ fontSize: 10, color: '#bae6fd', marginTop: 2 }}>運営者専用</p>
          </div>
        </div>
        <button onClick={onLogout} style={{
          padding: '6px 14px', background: 'transparent',
          border: '1px solid #38bdf8', color: '#bae6fd', fontSize: 12, borderRadius: 6,
        }}>ログアウト</button>
      </header>

      {/* タブ */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #e0f2fe', padding: '0 32px',
        display: 'flex', gap: 4,
      }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '12px 18px', border: 'none', background: 'transparent',
              borderBottom: `2px solid ${tab === t.key ? '#0ea5e9' : 'transparent'}`,
              color: tab === t.key ? '#0284c7' : '#64748b',
              fontSize: 13, fontWeight: tab === t.key ? 600 : 400,
            }}
          >{t.label}</button>
        ))}
      </div>

      {/* コンテンツ */}
      <div style={{ padding: '24px 32px' }}>
        {tab === 'overview'  && <OverviewTab />}
        {tab === 'companies' && <CompaniesTab />}
        {tab === 'campaigns' && <CampaignsTab />}
        {tab === 'urls'      && <UrlsTab />}
      </div>
    </div>
  );
}

// ============================================
function OverviewTab() {
  const [stats, setStats] = useState(null);
  useEffect(() => { fetchSystemStats().then(setStats).catch(console.error); }, []);

  if (!stats) return <p style={{ color: '#64748b', fontSize: 13 }}>読み込み中...</p>;

  return (
    <div>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>システム概要</h2>
      <p style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>プラットフォーム全体の統計情報</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <MetricCard label="登録企業数" value={stats.companies.toLocaleString()} sub="社" primary />
        <MetricCard label="案件総数" value={stats.campaigns.toLocaleString()} sub="件" />
        <MetricCard label="発行URL数" value={stats.urls.toLocaleString()} sub="件" />
        <MetricCard label="総クリック数" value={stats.clicks.toLocaleString()} sub="回" />
      </div>
    </div>
  );
}

// ============================================
function CompaniesTab() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ company_id: '', company_name: '' });
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

  const reload = async () => {
    setLoading(true);
    try {
      const data = await fetchAllCompanies();
      setList(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { reload(); }, []);

  const handleCreate = async () => {
    if (!form.company_id.trim() || !form.company_name.trim()) {
      setErr('企業IDと企業名を両方入力してください'); return;
    }
    if (form.company_id === 'vplus0121') {
      setErr('この企業IDは予約されています'); return;
    }
    setSaving(true);
    setErr('');
    try {
      await createCompany({
        company_id: form.company_id.trim(),
        company_name: form.company_name.trim(),
      });
      setForm({ company_id: '', company_name: '' });
      await reload();
    } catch (e) {
      setErr(e.message?.includes('duplicate') ? 'この企業IDは既に存在します' : (e.message || '登録失敗'));
    }
    setSaving(false);
  };

  const handleDelete = async (companyId) => {
    if (!confirm(`企業「${companyId}」を削除します。\n（関連する案件・URL・クリックも全て削除されます）\n本当によろしいですか？`)) return;
    try {
      await deleteCompany(companyId);
      await reload();
    } catch (e) {
      alert('削除失敗: ' + e.message);
    }
  };

  const inputStyle = {
    padding: '9px 12px', border: '1.5px solid #bae6fd', borderRadius: 8,
    fontSize: 13, outline: 'none', background: '#fff', color: '#0f172a',
  };

  return (
    <div>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>企業ID管理</h2>
      <p style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>企業の登録・削除を行います</p>

      {/* 登録フォーム */}
      <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, padding: 20, marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 14 }}>+ 新しい企業を登録</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10, alignItems: 'end' }}>
          <div>
            <label style={{ fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>企業ID（ログインID）</label>
            <input
              value={form.company_id}
              onChange={e => { setForm(s => ({ ...s, company_id: e.target.value })); setErr(''); }}
              placeholder="例：corp-003"
              style={{ ...inputStyle, width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>企業名（表示用）</label>
            <input
              value={form.company_name}
              onChange={e => { setForm(s => ({ ...s, company_name: e.target.value })); setErr(''); }}
              placeholder="例：株式会社サンプル"
              style={{ ...inputStyle, width: '100%' }}
            />
          </div>
          <button onClick={handleCreate} disabled={saving} style={{
            padding: '9px 20px', background: '#0ea5e9', border: 'none', borderRadius: 8,
            color: '#fff', fontSize: 13, fontWeight: 600, opacity: saving ? 0.7 : 1, whiteSpace: 'nowrap',
          }}>{saving ? '登録中...' : '登録'}</button>
        </div>
        {err && <p style={{ fontSize: 11, color: '#dc2626', marginTop: 8 }}>{err}</p>}
      </div>

      {/* 一覧 */}
      <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '13px 20px', borderBottom: '1px solid #e0f2fe' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>登録企業一覧（{list.length}社）</p>
        </div>
        {loading ? (
          <p style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>読み込み中...</p>
        ) : list.length === 0 ? (
          <p style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>企業がまだ登録されていません</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['企業ID', '企業名', '案件数', '総クリック数', '登録日', ''].map((h, i) => (
                  <th key={i} style={{
                    padding: '9px 18px', textAlign: i >= 2 && i <= 3 ? 'center' : 'left',
                    color: '#94a3b8', fontWeight: 500, fontSize: 11,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map(c => (
                <tr key={c.company_id} style={{ borderTop: '1px solid #f0f9ff' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f0f9ff'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 18px' }}>
                    <code style={{ fontSize: 12, color: '#0284c7', fontFamily: 'ui-monospace, monospace' }}>{c.company_id}</code>
                  </td>
                  <td style={{ padding: '12px 18px', color: '#0f172a', fontWeight: 500 }}>{c.company_name}</td>
                  <td style={{ padding: '12px 18px', textAlign: 'center', color: '#64748b' }}>{c.campaignCount}</td>
                  <td style={{ padding: '12px 18px', textAlign: 'center', color: '#0ea5e9', fontWeight: 700 }}>
                    {c.totalClicks.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 18px', color: '#64748b', fontSize: 12 }}>
                    {new Date(c.created_at).toLocaleDateString('ja-JP')}
                  </td>
                  <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                    <button onClick={() => handleDelete(c.company_id)} style={{
                      padding: '4px 12px', borderRadius: 6,
                      border: '1px solid #fecaca', background: '#fff',
                      color: '#dc2626', fontSize: 12,
                    }}>削除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ============================================
function CampaignsTab() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCampaignsAdmin().then(d => { setList(d); setLoading(false); }).catch(console.error);
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>全案件一覧</h2>
      <p style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>プラットフォーム上の全企業の案件を表示</p>

      <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '13px 20px', borderBottom: '1px solid #e0f2fe' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>案件一覧（{list.length}件）</p>
        </div>
        {loading ? (
          <p style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>読み込み中...</p>
        ) : list.length === 0 ? (
          <p style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>案件がまだありません</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['企業', '案件名', 'ステータス', '期間', 'VTuber数', 'クリック数'].map((h, i) => (
                  <th key={i} style={{
                    padding: '9px 18px', textAlign: i >= 2 ? 'center' : 'left',
                    color: '#94a3b8', fontWeight: 500, fontSize: 11,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map(c => (
                <tr key={c.campaign_id} style={{ borderTop: '1px solid #f0f9ff' }}>
                  <td style={{ padding: '12px 18px' }}>
                    <p style={{ color: '#0f172a', fontWeight: 500, fontSize: 13 }}>{c.companies?.company_name || '—'}</p>
                    <p style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'ui-monospace, monospace' }}>{c.company_id}</p>
                  </td>
                  <td style={{ padding: '12px 18px', color: '#0f172a' }}>{c.campaign_name}</td>
                  <td style={{ padding: '12px 18px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      padding: '2px 8px', borderRadius: 20,
                      background: c.status === 'active' ? '#dcfce7' : '#f1f5f9',
                      color: c.status === 'active' ? '#15803d' : '#64748b',
                    }}>{c.status === 'active' ? '配信中' : '終了'}</span>
                  </td>
                  <td style={{ padding: '12px 18px', textAlign: 'center', color: '#64748b', fontSize: 12 }}>
                    {c.start_date} → {c.end_date}
                  </td>
                  <td style={{ padding: '12px 18px', textAlign: 'center', color: '#64748b' }}>{c.vtuberCount}</td>
                  <td style={{ padding: '12px 18px', textAlign: 'center', color: '#0ea5e9', fontWeight: 700 }}>
                    {c.totalClicks.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ============================================
function UrlsTab() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    fetchAllVtuberUrlsAdmin().then(d => { setList(d); setLoading(false); }).catch(console.error);
  }, []);

  const copyUrl = (urlId, fullUrl) => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedId(urlId);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  return (
    <div>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>全VTuber URL一覧</h2>
      <p style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>プラットフォーム上の全URL を表示</p>

      <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '13px 20px', borderBottom: '1px solid #e0f2fe' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>VTuber URL一覧（{list.length}件）</p>
        </div>
        {loading ? (
          <p style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>読み込み中...</p>
        ) : list.length === 0 ? (
          <p style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>URLがまだありません</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['企業 / 案件', 'VTuber', '専用URL', 'クリック数'].map((h, i) => (
                  <th key={i} style={{
                    padding: '9px 18px', textAlign: i === 3 ? 'center' : 'left',
                    color: '#94a3b8', fontWeight: 500, fontSize: 11,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map(u => {
                const full = `${baseUrl}/r/${u.short_code}`;
                return (
                  <tr key={u.url_id} style={{ borderTop: '1px solid #f0f9ff' }}>
                    <td style={{ padding: '12px 18px' }}>
                      <p style={{ color: '#0f172a', fontWeight: 500, fontSize: 13 }}>
                        {u.campaigns?.companies?.company_name || '—'}
                      </p>
                      <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
                        {u.campaigns?.campaign_name || '—'}
                      </p>
                    </td>
                    <td style={{ padding: '12px 18px' }}>
                      <p style={{ color: '#0f172a', fontWeight: 500 }}>{u.vtuber_name}</p>
                      <p style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'ui-monospace, monospace' }}>{u.vtuber_id}</p>
                    </td>
                    <td style={{ padding: '12px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <code style={{
                          fontSize: 11, padding: '3px 7px',
                          background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 4,
                          color: '#0284c7', fontFamily: 'ui-monospace, monospace',
                        }}>{full}</code>
                        <button onClick={() => copyUrl(u.url_id, full)} style={{
                          padding: '3px 8px', borderRadius: 5,
                          border: '1px solid #bae6fd', background: copiedId === u.url_id ? '#dcfce7' : '#fff',
                          color: copiedId === u.url_id ? '#15803d' : '#0284c7', fontSize: 10, fontWeight: 600,
                        }}>{copiedId === u.url_id ? '✓' : 'コピー'}</button>
                      </div>
                    </td>
                    <td style={{ padding: '12px 18px', textAlign: 'center', color: '#0ea5e9', fontWeight: 700 }}>
                      {u.clicks.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
