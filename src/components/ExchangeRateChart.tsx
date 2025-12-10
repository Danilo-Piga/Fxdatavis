import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from 'recharts';

interface ExchangeRateChartProps {
  timeframe: string;
  pair: string;
  showHistorical: boolean;
  activeIndicators: string[];
}

export function ExchangeRateChart({ timeframe, pair, showHistorical, activeIndicators }: ExchangeRateChartProps) {
  // Generate mock data based on timeframe
  const generateData = () => {
    const dataPoints = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : 365;
    const data = [];
    let baseRate = 1.0952;
    let historicalBase = 1.0850;
    
    for (let i = 0; i < dataPoints; i++) {
      const variation = (Math.random() - 0.5) * 0.02;
      baseRate += variation;
      historicalBase += (Math.random() - 0.5) * 0.015;
      
      let timeLabel;
      if (timeframe === '1D') {
        timeLabel = `${i}:00`;
      } else if (timeframe === '1W') {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        timeLabel = days[i % 7];
      } else {
        timeLabel = `${i + 1}`;
      }
      
      // Calculate EMA values
      const ema20 = baseRate + (Math.random() - 0.5) * 0.005;
      const ema50 = baseRate - 0.001 + (Math.random() - 0.5) * 0.005;
      const ema200 = baseRate - 0.003 + (Math.random() - 0.5) * 0.005;
      
      data.push({
        time: timeLabel,
        rate: parseFloat(baseRate.toFixed(4)),
        historical: parseFloat(historicalBase.toFixed(4)),
        high: parseFloat((baseRate + Math.random() * 0.01).toFixed(4)),
        low: parseFloat((baseRate - Math.random() * 0.01).toFixed(4)),
        ema20: parseFloat(ema20.toFixed(4)),
        ema50: parseFloat(ema50.toFixed(4)),
        ema200: parseFloat(ema200.toFixed(4)),
      });
    }
    
    return data;
  };

  const data = generateData();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis 
          dataKey="time" 
          stroke="#475569"
          tick={{ fontSize: 11, fill: '#64748b' }}
        />
        <YAxis 
          stroke="#475569"
          tick={{ fontSize: 11, fill: '#64748b' }}
          domain={['auto', 'auto']}
          tickFormatter={(value) => value.toFixed(4)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            color: '#fff',
            padding: '12px'
          }}
          formatter={(value: number, name: string) => {
            const labels: Record<string, string> = {
              rate: 'Current',
              historical: 'Historical',
              ema20: 'EMA 20',
              ema50: 'EMA 50',
              ema200: 'EMA 200',
            };
            return [value.toFixed(4), labels[name] || name];
          }}
        />
        <Legend wrapperStyle={{ color: '#94a3b8' }} />
        
        {/* Historical Data */}
        {showHistorical && (
          <Area
            type="monotone"
            dataKey="historical"
            stroke="#a855f7"
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="url(#colorHistorical)"
            name="Historical"
          />
        )}
        
        {/* Current Rate */}
        <Area
          type="monotone"
          dataKey="rate"
          stroke="#06b6d4"
          strokeWidth={3}
          fill="url(#colorRate)"
          name="Current"
        />
        
        {/* EMA Indicators */}
        {activeIndicators.includes('EMA') && (
          <>
            <Line
              type="monotone"
              dataKey="ema20"
              stroke="#a855f7"
              strokeWidth={2}
              dot={false}
              name="EMA 20"
            />
            <Line
              type="monotone"
              dataKey="ema50"
              stroke="#ec4899"
              strokeWidth={2}
              dot={false}
              name="EMA 50"
            />
            <Line
              type="monotone"
              dataKey="ema200"
              stroke="#84cc16"
              strokeWidth={2}
              dot={false}
              name="EMA 200"
            />
          </>
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}