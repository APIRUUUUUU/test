import { useState } from 'react';
import { createCampaign } from '../lib/api';

export default function CampaignCreateScreen({ company, onCreated, onBack }) {
  const [form, setForm] = useState({
    campaign_name: '',
    description: '',
    target_url: '',
    start_date: new Date().toISOString().slice(0, 10),
    end_date: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    status: 'active',
  });
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

  const update = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const handle = async () => {
    if (!form.campaign_name.trim()) { setErr('案件名を入力してください'); return; }
    if (!form.target_url.trim()) { setErr('リダイレクト先URLを入力してください'); return; }
    if (!form.target_url.match(/^https?:\/\//)) { setErr('URLはhttp://またはhttps://で始めてください'); return; }
    if (form.start_date > form.end_date) { setErr('終了日は開始日より後にしてください'); return; }

    setSaving(true);
    setErr('');
    try {
      await createCampaign({ ...form, company_id: company.company_id });
      onCreated();
    } catch (e) {
      setErr(e.message || '保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '9px 12px',
    border: '1.5px solid #bae6fd', borderRadius: 8,
    fontSize: 13, outline: 'none', background: '#fff', color: '#0f172a',
  };
  const labelStyle = { fontSize: 12, color: '#64748b', display: 'block', marginBottom: 6, fontWeight: 500 };

  return (
    <div style={{ padding: '28px 32px', flex: 1, background: '#f0f9ff' }}>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', color: '#64748b',
        fontSize: 12, cursor: 'pointer', marginBottom: 16, padding: 0,
      }}>← ダッシュボードへ戻る</button>

      <h1 style={{ fontSize: 19, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>新しい案件を作成</h1>
      <p style={{ fontSize: 12, color: '#64748b', marginBottom: 24 }}>案件作成後、VTuber URL管理画面から個別URLを発行できます</p>

      <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: 10, padding: 24, maxWidth: 600 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>案件名 *</label>
          <input
            value={form.campaign_name}
            onChange={e => update('campaign_name', e.target.value)}
            placeholder="例：新作ゲームローンチキャンペーン"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>説明</label>
          <textarea
            value={form.description}
            onChange={e => update('description', e.target.value)}
            placeholder="案件の概要を入力（任意）"
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>リダイレクト先URL *</label>
          <input
            value={form.target_url}
            onChange={e => update('target_url', e.target.value)}
            placeholder="https://example.com/landing"
            style={inputStyle}
          />
          <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
            VTuber専用URLがクリックされた際の遷移先
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>開始日 *</label>
            <input
              type="date"
              value={form.start_date}
              onChange={e => update('start_date', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>終了日 *</label>
            <input
              type="date"
              value={form.end_date}
              onChange={e => update('end_date', e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>ステータス</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['active', 'ended'].map(s => (
              <button
                key={s}
                onClick={() => update('status', s)}
                style={{
                  padding: '6px 16px', borderRadius: 8,
                  border: `1.5px solid ${form.status === s ? '#0ea5e9' : '#bae6fd'}`,
                  background: form.status === s ? '#0ea5e9' : '#fff',
                  color: form.status === s ? '#fff' : '#64748b',
                  fontSize: 12, fontWeight: 600,
                }}
              >{s === 'active' ? '配信中' : '終了'}</button>
            ))}
          </div>
        </div>

        {err && (
          <div style={{
            padding: '10px 14px', borderRadius: 8,
            background: '#fef2f2', color: '#dc2626',
            fontSize: 12, marginBottom: 16,
          }}>{err}</div>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onBack} style={{
            padding: '9px 18px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8,
            color: '#64748b', fontSize: 13, fontWeight: 500,
          }}>キャンセル</button>
          <button onClick={handle} disabled={saving} style={{
            padding: '9px 22px', background: '#0ea5e9', border: 'none', borderRadius: 8,
            color: '#fff', fontSize: 13, fontWeight: 600,
            opacity: saving ? 0.7 : 1,
          }}>{saving ? '保存中...' : '作成する'}</button>
        </div>
      </div>
    </div>
  );
}
