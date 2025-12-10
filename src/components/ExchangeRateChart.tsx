import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface ExchangeRateChartProps {
  timeframe: string;
  pair: string;
}

export function ExchangeRateChart({ timeframe, pair }: ExchangeRateChartProps) {
  // Generate mock data based on timeframe
  const generateData = () => {
    const dataPoints = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : 365;
    const data = [];
    let baseRate = 1.0952;
    
    for (let i = 0; i < dataPoints; i++) {
      const variation = (Math.random() - 0.5) * 0.02;
      baseRate += variation;
      
      let timeLabel;
      if (timeframe === '1D') {
        timeLabel = `${i}:00`;
      } else if (timeframe === '1W') {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        timeLabel = days[i % 7];
      } else {
        timeLabel = `${i + 1}`;
      }
      
      data.push({
        time: timeLabel,
        rate: parseFloat(baseRate.toFixed(4)),
        high: parseFloat((baseRate + Math.random() * 0.01).toFixed(4)),
        low: parseFloat((baseRate - Math.random() * 0.01).toFixed(4)),
      });
    }
    
    return data;
  };

  const data = generateData();

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="time" 
          stroke="#64748b"
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          stroke="#64748b"
          tick={{ fontSize: 12 }}
          domain={['auto', 'auto']}
          tickFormatter={(value) => value.toFixed(4)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            padding: '12px'
          }}
          formatter={(value: number) => [value.toFixed(4), 'Rate']}
        />
        <Area
          type="monotone"
          dataKey="rate"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#colorRate)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
