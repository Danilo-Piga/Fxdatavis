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
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis 
          dataKey="pair" 
          stroke="#475569"
          tick={{ fontSize: 11, fill: '#64748b' }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          stroke="#475569"
          tick={{ fontSize: 11, fill: '#64748b' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            color: '#fff',
            padding: '12px'
          }}
          formatter={(value: number) => [`$${value}B`, 'Volume']}
        />
        <Bar dataKey="volume" fill="url(#volumeGradient)" radius={[12, 12, 0, 0]} />
        <defs>
          <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
}