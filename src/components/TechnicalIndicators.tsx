import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface TechnicalIndicatorsProps {
  pair: string;
  timeframe: string;
  activeIndicators: string[];
}

export function TechnicalIndicators({ pair, timeframe, activeIndicators }: TechnicalIndicatorsProps) {
  // Generate mock RSI data
  const generateRSIData = () => {
    const points = 30;
    const data = [];
    for (let i = 0; i < points; i++) {
      const rsi = 30 + Math.random() * 40 + Math.sin(i / 5) * 20;
      data.push({
        time: i,
        rsi: Math.max(0, Math.min(100, rsi)),
      });
    }
    return data;
  };

  // Generate mock MACD data
  const generateMACDData = () => {
    const points = 30;
    const data = [];
    for (let i = 0; i < points; i++) {
      const macd = Math.sin(i / 4) * 0.003 + (Math.random() - 0.5) * 0.001;
      const signal = Math.sin(i / 4 - 0.5) * 0.003 + (Math.random() - 0.5) * 0.0005;
      data.push({
        time: i,
        macd,
        signal,
        histogram: macd - signal,
      });
    }
    return data;
  };

  const rsiData = generateRSIData();
  const macdData = generateMACDData();
  const currentRSI = rsiData[rsiData.length - 1].rsi;
  const currentMACD = macdData[macdData.length - 1];

  // Calculate EMA values
  const ema20 = 1.0962;
  const ema50 = 1.0945;
  const ema200 = 1.0913;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* EMA Card */}
      {activeIndicators.includes('EMA') && (
        <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-sm">EMA</h3>
              <p className="text-white/70 text-xs">Moving Average</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">EMA 20</span>
                <span className="text-white text-lg">{ema20.toFixed(4)}</span>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">EMA 50</span>
                <span className="text-white text-lg">{ema50.toFixed(4)}</span>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">EMA 200</span>
                <span className="text-white text-lg">{ema200.toFixed(4)}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Bullish Trend</span>
              </div>
              <p className="text-xs text-white/60 mt-1">
                Price above EMA 20 and EMA 50
              </p>
            </div>
          </div>
        </div>
      )}

      {/* RSI Card */}
      {activeIndicators.includes('RSI') && (
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-blue-900/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Activity className="w-6 h-6 text-blue-900" />
            </div>
            <div>
              <h3 className="text-blue-900 text-sm">RSI</h3>
              <p className="text-blue-900/70 text-xs">Strength Index</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="bg-blue-900/10 rounded-2xl p-4 backdrop-blur-sm mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-900/70 text-sm">Current RSI</span>
                <span className="text-blue-900 text-3xl">{currentRSI.toFixed(0)}</span>
              </div>
              <div className="w-full h-3 bg-blue-900/20 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all bg-blue-900/40`}
                  style={{ width: `${currentRSI}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-blue-900/60 mt-1">
                <span>30</span>
                <span>70</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={rsiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 58, 138, 0.2)" />
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 100]} hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(30, 58, 138, 0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    padding: '8px'
                  }}
                />
                <ReferenceLine y={70} stroke="rgba(30, 58, 138, 0.4)" strokeDasharray="3 3" />
                <ReferenceLine y={30} stroke="rgba(30, 58, 138, 0.4)" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="rsi" stroke="#1e3a8a" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 pt-3 border-t border-blue-900/20">
            <div className="flex items-center gap-2">
              {currentRSI > 70 ? (
                <>
                  <TrendingDown className="w-4 h-4 text-blue-900" />
                  <span className="text-sm text-blue-900">Overbought</span>
                </>
              ) : currentRSI < 30 ? (
                <>
                  <TrendingUp className="w-4 h-4 text-blue-900" />
                  <span className="text-sm text-blue-900">Oversold</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4 text-blue-900" />
                  <span className="text-sm text-blue-900">Neutral</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MACD Card */}
      {activeIndicators.includes('MACD') && (
        <div className="bg-gradient-to-br from-cyan-300 to-cyan-200 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-blue-900/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Activity className="w-6 h-6 text-blue-900" />
            </div>
            <div>
              <h3 className="text-blue-900 text-sm">MACD</h3>
              <p className="text-blue-900/70 text-xs">Convergence/Divergence</p>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="bg-blue-900/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-blue-900/70 text-xs">MACD Line</span>
                <span className="text-blue-900 text-sm">
                  {currentMACD.macd.toFixed(5)}
                </span>
              </div>
            </div>
            <div className="bg-blue-900/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-blue-900/70 text-xs">Signal Line</span>
                <span className="text-blue-900 text-sm">
                  {currentMACD.signal.toFixed(5)}
                </span>
              </div>
            </div>
            <div className="bg-blue-900/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-blue-900/70 text-xs">Histogram</span>
                <span className="text-blue-900 text-sm">
                  {currentMACD.histogram.toFixed(5)}
                </span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={macdData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 58, 138, 0.2)" />
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 58, 138, 0.9)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '8px'
                }}
                formatter={(value: number) => value.toFixed(5)}
              />
              <ReferenceLine y={0} stroke="rgba(30, 58, 138, 0.4)" strokeWidth={2} />
              <Line type="monotone" dataKey="macd" stroke="#1e3a8a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="signal" stroke="rgba(30, 58, 138, 0.6)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 pt-3 border-t border-blue-900/20">
            <div className="flex items-center gap-2">
              {currentMACD.macd > currentMACD.signal ? (
                <>
                  <TrendingUp className="w-4 h-4 text-blue-900" />
                  <span className="text-sm text-blue-900">Bullish Crossover</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-blue-900" />
                  <span className="text-sm text-blue-900">Bearish Crossover</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}