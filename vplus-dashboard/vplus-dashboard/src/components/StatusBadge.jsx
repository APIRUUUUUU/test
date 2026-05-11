export default function StatusBadge({ status }) {
  const cfg = status === 'active'
    ? { label: '配信中', bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' }
    : { label: '終了',   bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0' };
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
      padding: '2px 8px', borderRadius: 20,
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
    }}>
      {cfg.label}
    </span>
  );
}
