import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function VolumeChart() {
  const data = [
    { pair: 'EUR/USD', volume: 2.3 },
    { pair: 'USD/JPY', volume: 3.1 },
    { pair: 'GBP/USD', volume: 1.8 },
    { pair: 'AUD/USD', volume: 1.5 },
    { pair: 'USD/CAD', volume: 1.1 },
    { pair: 'USD/CHF', volume: 1.2 },
    { pair: 'NZD/USD', volume: 0.9 },
    { pair: 'EUR/GBP', volume: 1.4 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="pair" 
          stroke="#64748b"
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          stroke="#64748b"
          tick={{ fontSize: 12 }}
          label={{ value: 'Billions (USD)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#64748b' } }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            padding: '12px'
          }}
          formatter={(value: number) => [`$${value}B`, 'Volume']}
        />
        <Bar dataKey="volume" fill="#3b82f6" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
