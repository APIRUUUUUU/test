const OPTIONS = [
  { value: '30d', label: '30日間' },
  { value: 'all', label: '全期間' },
];

export default function PeriodSelector({ value, onChange }) {
  return (
    <div style={{
      display: 'flex', border: '1px solid #bae6fd', borderRadius: 8, overflow: 'hidden',
    }}>
      {OPTIONS.map(o => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          style={{
            padding: '5px 14px', border: 'none',
            background: value === o.value ? '#0ea5e9' : '#ffffff',
            color: value === o.value ? '#ffffff' : '#64748b',
            fontSize: 12, fontWeight: value === o.value ? 600 : 400,
          }}
        >{o.label}</button>
      ))}
    </div>
  );
}
