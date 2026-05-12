import { useState } from 'react';
import { loginCompany } from '../lib/api';

const ADMIN_ID = 'vplus0121';

export default function LoginScreen({ onLogin, onAdminLogin }) {
  const [id, setId] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    const value = id.trim();
    if (!value) { setErr('企業IDを入力してください'); return; }

    // 管理者ID
    if (value === ADMIN_ID) {
      onAdminLogin();
      return;
    }

    setLoading(true);
    setErr('');
    try {
      const company = await loginCompany(value);
      onLogin(company);
    } catch (e) {
      setErr(e.message || 'ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#f0f9ff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: 360 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 48, height: 48, borderRadius: 14, background: '#0ea5e9', marginBottom: 12,
          }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>V</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Vplus</h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>企業向けダッシュボード</p>
        </div>

        <div style={{
          background: '#ffffff', border: '1px solid #e0f2fe',
          borderRadius: 14, padding: 28,
          boxShadow: '0 2px 12px rgba(14,165,233,0.07)',
        }}>
          <label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 6, fontWeight: 500 }}>企業ID</label>
          <input
            value={id}
            onChange={e => { setId(e.target.value); setErr(''); }}
            onKeyDown={e => e.key === 'Enter' && handle()}
            placeholder="例：corp-001"
            style={{
              width: '100%', padding: '10px 12px',
              border: `1.5px solid ${err ? '#fca5a5' : '#bae6fd'}`,
              borderRadius: 8, fontSize: 14, outline: 'none',
              background: '#ffffff', color: '#0f172a',
              marginBottom: err ? 4 : 16,
            }}
          />
          {err && <p style={{ fontSize: 11, color: '#ef4444', marginBottom: 12 }}>{err}</p>}
          <button
            onClick={handle}
            disabled={loading}
            style={{
              width: '100%', background: '#0ea5e9', border: 'none', borderRadius: 8,
              padding: '11px', color: '#fff', fontSize: 14, fontWeight: 600,
              opacity: loading ? 0.7 : 1,
            }}
          >{loading ? 'ログイン中...' : 'ログイン'}</button>
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 16 }}>
          ※ Phase 1：企業IDのみで認証
        </p>
      </div>
    </div>
  );
}
