export default function MetricCard({ label, value, sub, primary }) {
  return (
    <div style={{
      background: primary ? '#0ea5e9' : '#ffffff',
      border: `1px solid ${primary ? '#0ea5e9' : '#e0f2fe'}`,
      borderRadius: 10,
      padding: '16px 20px',
    }}>
      <span style={{
        fontSize: 11, color: primary ? '#bae6fd' : '#64748b',
        letterSpacing: '0.06em', textTransform: 'uppercase',
        display: 'block', marginBottom: 6,
      }}>{label}</span>
      <span style={{
        fontSize: 26, fontWeight: 700,
        color: primary ? '#ffffff' : '#0f172a',
        display: 'block', lineHeight: 1.1,
      }}>{value}</span>
      {sub && (
        <span style={{
          fontSize: 12, color: primary ? '#bae6fd' : '#94a3b8',
          display: 'block', marginTop: 3,
        }}>{sub}</span>
      )}
    </div>
  );
}
