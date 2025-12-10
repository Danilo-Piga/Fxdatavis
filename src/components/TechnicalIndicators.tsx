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
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-black/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Activity className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-black text-sm">EMA</h3>
              <p className="text-black/70 text-xs">Moving Average</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-black/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-black/70 text-sm">EMA 20</span>
                <span className="text-black text-lg">{ema20.toFixed(4)}</span>
              </div>
            </div>
            <div className="bg-black/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-black/70 text-sm">EMA 50</span>
                <span className="text-black text-lg">{ema50.toFixed(4)}</span>
              </div>
            </div>
            <div className="bg-black/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-black/70 text-sm">EMA 200</span>
                <span className="text-black text-lg">{ema200.toFixed(4)}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-black/20">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-black" />
                <span className="text-sm text-black">Bullish Trend</span>
              </div>
              <p className="text-xs text-black/60 mt-1">
                Price above EMA 20 and EMA 50
              </p>
            </div>
          </div>
        </div>
      )}

      {/* RSI Card */}
      {activeIndicators.includes('RSI') && (
        <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-black/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Activity className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-black text-sm">RSI</h3>
              <p className="text-black/70 text-xs">Strength Index</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="bg-black/10 rounded-2xl p-4 backdrop-blur-sm mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-black/70 text-sm">Current RSI</span>
                <span className="text-black text-3xl">{currentRSI.toFixed(0)}</span>
              </div>
              <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all bg-black/40`}
                  style={{ width: `${currentRSI}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-black/60 mt-1">
                <span>30</span>
                <span>70</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={rsiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 100]} hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    padding: '8px'
                  }}
                />
                <ReferenceLine y={70} stroke="rgba(0,0,0,0.3)" strokeDasharray="3 3" />
                <ReferenceLine y={30} stroke="rgba(0,0,0,0.3)" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="rsi" stroke="#000" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 pt-3 border-t border-black/20">
            <div className="flex items-center gap-2">
              {currentRSI > 70 ? (
                <>
                  <TrendingDown className="w-4 h-4 text-black" />
                  <span className="text-sm text-black">Overbought</span>
                </>
              ) : currentRSI < 30 ? (
                <>
                  <TrendingUp className="w-4 h-4 text-black" />
                  <span className="text-sm text-black">Oversold</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4 text-black" />
                  <span className="text-sm text-black">Neutral</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MACD Card */}
      {activeIndicators.includes('MACD') && (
        <div className="bg-gradient-to-br from-lime-400 to-lime-500 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-black/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Activity className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-black text-sm">MACD</h3>
              <p className="text-black/70 text-xs">Convergence/Divergence</p>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="bg-black/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-black/70 text-xs">MACD Line</span>
                <span className="text-black text-sm">
                  {currentMACD.macd.toFixed(5)}
                </span>
              </div>
            </div>
            <div className="bg-black/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-black/70 text-xs">Signal Line</span>
                <span className="text-black text-sm">
                  {currentMACD.signal.toFixed(5)}
                </span>
              </div>
            </div>
            <div className="bg-black/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-black/70 text-xs">Histogram</span>
                <span className="text-black text-sm">
                  {currentMACD.histogram.toFixed(5)}
                </span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={macdData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '8px'
                }}
                formatter={(value: number) => value.toFixed(5)}
              />
              <ReferenceLine y={0} stroke="rgba(0,0,0,0.3)" strokeWidth={2} />
              <Line type="monotone" dataKey="macd" stroke="#000" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="signal" stroke="rgba(0,0,0,0.5)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 pt-3 border-t border-black/20">
            <div className="flex items-center gap-2">
              {currentMACD.macd > currentMACD.signal ? (
                <>
                  <TrendingUp className="w-4 h-4 text-black" />
                  <span className="text-sm text-black">Bullish Crossover</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-black" />
                  <span className="text-sm text-black">Bearish Crossover</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}