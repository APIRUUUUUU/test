import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { createVtuberUrl, deleteVtuberUrl } from '../lib/api';

export default function VtuberManageScreen({ campaign, onBack }) {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ vtuber_id: '', vtuber_name: '' });
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const reload = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('vtuber_urls')
      .select('*')
      .eq('campaign_id', campaign.campaign_id)
      .order('created_at', { ascending: false });
    if (!error) setUrls(data || []);
    setLoading(false);
  };

  useEffect(() => { reload(); }, [campaign.campaign_id]);

  const handleCreate = async () => {
    if (!form.vtuber_id.trim() || !form.vtuber_name.trim()) {
      setErr('VTuberのIDと名前を両方入力してください');
      return;
    }
    setSaving(true);
    setErr('');
    try {
      await createVtuberUrl({
        campaign_id: campaign.campaign_id,
        vtuber_id: form.vtuber_id.trim(),
        vtuber_name: form.vtuber_name.trim(),
      });
      setForm({ vtuber_id: '', vtuber_name: '' });
      await reload();
    } catch (e) {
      setErr(e.message || '発行に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (urlId) => {
    if (!confirm('このVTuber URLを削除します。よろしいですか？\n（関連するクリックログも削除されます）')) return;
    try {
      await deleteVtuberUrl(urlId);
      await reload();
    } catch (e) {
      alert('削除に失敗: ' + e.message);
    }
  };

  const copyUrl = (urlId, fullUrl) => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedId(urlId);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  const inputStyle = {
    padding: '9px 12px', border: '1.5px solid #bae6fd', borderRadius: 8,
    fontSize: 13, outline: 'none', background: '#fff', color: '#0f172a',
  };

  return (
    <div style={{ padding: '28px 32px', flex: 1, background: '#f0f9ff' }}>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', color: '#64748b',
        fontSize: 12, cursor: 'pointer', marginBottom: 16, padding: 0,
      }}>← 案件詳細へ戻る</button>

      <h1 style={{ fontSize: 19, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>VTuber URL管理</h1>
      <p style={{ fontSize: 12, color: '#64748b', marginBottom: 24 }}>
        案件「{campaign.campaign_name}」の VTuber専用URL を発行・管理
      </p>

      {/* 発行フォーム */}
      <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, padding: 20, marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 14 }}>+ 新しい VTuber URL を発行</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10, alignItems: 'end' }}>
          <div>
            <label style={{ fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>VTuber ID</label>
            <input
              value={form.vtuber_id}
              onChange={e => { setForm(s => ({ ...s, vtuber_id: e.target.value })); setErr(''); }}
              placeholder="例：v1, akari など"
              style={{ ...inputStyle, width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>表示名</label>
            <input
              value={form.vtuber_name}
              onChange={e => { setForm(s => ({ ...s, vtuber_name: e.target.value })); setErr(''); }}
              placeholder="例：星宮あかり"
              style={{ ...inputStyle, width: '100%' }}
            />
          </div>
          <button onClick={handleCreate} disabled={saving} style={{
            padding: '9px 20px', background: '#0ea5e9', border: 'none', borderRadius: 8,
            color: '#fff', fontSize: 13, fontWeight: 600, opacity: saving ? 0.7 : 1, whiteSpace: 'nowrap',
          }}>{saving ? '発行中...' : 'URL発行'}</button>
        </div>
        {err && <p style={{ fontSize: 11, color: '#dc2626', marginTop: 8 }}>{err}</p>}
      </div>

      {/* URL一覧 */}
      <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '13px 20px', borderBottom: '1px solid #e0f2fe' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>発行済みURL一覧</p>
        </div>
        {loading ? (
          <p style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>読み込み中...</p>
        ) : urls.length === 0 ? (
          <p style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
            まだURLが発行されていません
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['VTuber', '専用URL', '作成日', ''].map((h, i) => (
                  <th key={i} style={{
                    padding: '9px 18px', textAlign: 'left',
                    color: '#94a3b8', fontWeight: 500, fontSize: 11,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {urls.map(u => {
                const full = `${baseUrl}/r/${u.short_code}`;
                return (
                  <tr key={u.url_id} style={{ borderTop: '1px solid #f0f9ff' }}>
                    <td style={{ padding: '12px 18px' }}>
                      <p style={{ color: '#0f172a', fontWeight: 500 }}>{u.vtuber_name}</p>
                      <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>ID: {u.vtuber_id}</p>
                    </td>
                    <td style={{ padding: '12px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <code style={{
                          fontSize: 12, padding: '4px 8px',
                          background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 4,
                          color: '#0284c7', fontFamily: 'ui-monospace, monospace',
                        }}>{full}</code>
                        <button onClick={() => copyUrl(u.url_id, full)} style={{
                          padding: '4px 10px', borderRadius: 6,
                          border: '1px solid #bae6fd', background: copiedId === u.url_id ? '#dcfce7' : '#fff',
                          color: copiedId === u.url_id ? '#15803d' : '#0284c7', fontSize: 11, fontWeight: 600,
                        }}>{copiedId === u.url_id ? '✓ コピー済' : 'コピー'}</button>
                      </div>
                    </td>
                    <td style={{ padding: '12px 18px', color: '#64748b', fontSize: 12 }}>
                      {new Date(u.created_at).toLocaleDateString('ja-JP')}
                    </td>
                    <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                      <button onClick={() => handleDelete(u.url_id)} style={{
                        padding: '4px 12px', borderRadius: 6,
                        border: '1px solid #fecaca', background: '#fff',
                        color: '#dc2626', fontSize: 12,
                      }}>削除</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: 20, padding: 16, background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10 }}>
        <p style={{ fontSize: 12, color: '#0284c7', fontWeight: 600, marginBottom: 6 }}>💡 使い方</p>
        <ol style={{ fontSize: 12, color: '#64748b', paddingLeft: 18, lineHeight: 1.7 }}>
          <li>「URL発行」でVTuberごとの専用URLを生成</li>
          <li>「コピー」ボタンでURLを取得し、VTuberに渡す</li>
          <li>視聴者がURLをクリックすると、自動的にクリック数がカウントされ、案件のリダイレクト先に遷移します</li>
        </ol>
      </div>
    </div>
  );
}
