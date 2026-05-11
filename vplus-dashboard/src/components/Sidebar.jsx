const NAV_ITEMS = [
  { key: 'dashboard', label: 'ダッシュボード', icon: '▦' },
  { key: 'campaigns_view', label: '案件一覧', icon: '◈' },
];

export default function Sidebar({ current, onNav, onLogout, companyId }) {
  return (
    <div style={{
      width: 200, minHeight: '100vh',
      background: '#ffffff',
      borderRight: '1px solid #e0f2fe',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      {/* ロゴ */}
      <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid #e0f2fe' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: '#0ea5e9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: '#fff',
          }}>
            V
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Vplus
          </span>
        </div>
      </div>

      {/* ナビ */}
      <nav style={{ flex: 1, padding: '10px 10px' }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.key}
            onClick={() => onNav(item.key)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 12px', borderRadius: 8, border: 'none',
              background: current === item.key ? '#e0f2fe' : 'transparent',
              color: current === item.key ? '#0284c7' : '#64748b',
              fontSize: 13, fontWeight: current === item.key ? 600 : 400,
              textAlign: 'left', marginBottom: 2,
            }}
          >
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* ユーザー */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid #e0f2fe' }}>
        <div style={{
          padding: '8px 12px', borderRadius: 8,
          background: '#f0f9ff', marginBottom: 6,
        }}>
          <p style={{ fontSize: 10, color: '#94a3b8' }}>ログイン中</p>
          <p style={{ fontSize: 12, color: '#0284c7', fontWeight: 600, marginTop: 1 }}>{companyId}</p>
        </div>
        <button
          onClick={onLogout}
          style={{
            width: '100%', padding: '7px 12px',
            background: 'transparent', border: 'none',
            color: '#94a3b8', fontSize: 12, borderRadius: 8, textAlign: 'left',
          }}
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}
