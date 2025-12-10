import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Euro, Globe, ArrowRightLeft } from 'lucide-react';
import { ExchangeRateChart } from './components/ExchangeRateChart';
import { CurrencyPairCard } from './components/CurrencyPairCard';
import { VolumeChart } from './components/VolumeChart';
import { MarketHeatmap } from './components/MarketHeatmap';
import { CurrencyConverter } from './components/CurrencyConverter';
import { TechnicalIndicators } from './components/TechnicalIndicators';

export default function App() {
  const [selectedPair, setSelectedPair] = useState('EUR/USD');
  const [timeframe, setTimeframe] = useState('1D');
  const [showHistorical, setShowHistorical] = useState(false);
  const [activeIndicators, setActiveIndicators] = useState<string[]>([]);

  const currencyPairs = [
    { 
      pair: 'EUR/USD', 
      rate: 1.0952, 
      change: 0.34, 
      high: 1.0987, 
      low: 1.0921,
      volume: '2.3B'
    },
    { 
      pair: 'GBP/USD', 
      rate: 1.2734, 
      change: -0.21, 
      high: 1.2765, 
      low: 1.2701,
      volume: '1.8B'
    },
    { 
      pair: 'USD/JPY', 
      rate: 149.82, 
      change: 0.56, 
      high: 150.12, 
      low: 149.34,
      volume: '3.1B'
    },
    { 
      pair: 'USD/CHF', 
      rate: 0.8845, 
      change: -0.12, 
      high: 0.8872, 
      low: 0.8831,
      volume: '1.2B'
    },
    { 
      pair: 'AUD/USD', 
      rate: 0.6421, 
      change: 0.18, 
      high: 0.6445, 
      low: 0.6398,
      volume: '1.5B'
    },
    { 
      pair: 'USD/CAD', 
      rate: 1.4123, 
      change: -0.08, 
      high: 1.4156, 
      low: 1.4101,
      volume: '1.1B'
    },
  ];

  const marketSummary = [
    { label: 'Total Volume (24h)', value: '$6.8T', icon: Globe, trend: 2.3 },
    { label: 'Active Pairs', value: '180', icon: DollarSign, trend: 0 },
    { label: 'Avg Spread', value: '0.8 pips', icon: TrendingUp, trend: -5.2 },
    { label: 'Volatility Index', value: '12.4', icon: Euro, trend: 1.7 },
  ];

  const toggleIndicator = (indicator: string) => {
    setActiveIndicators(prev => 
      prev.includes(indicator) 
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    );
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white mb-1">FX Market</h1>
            <p className="text-slate-400 text-sm">Live trading data</p>
          </div>
          <div className="flex gap-2">
            {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  timeframe === tf
                    ? 'bg-cyan-400 text-black'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Market Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {marketSummary.map((item, index) => {
            const Icon = item.icon;
            const colors = [
              'from-lime-400 to-lime-500',
              'from-cyan-400 to-cyan-500',
              'from-pink-400 to-pink-500',
              'from-purple-400 to-purple-500'
            ];
            return (
              <div
                key={item.label}
                className={`bg-gradient-to-br ${colors[index]} rounded-3xl p-5 shadow-xl relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-black/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                    {item.trend !== 0 && (
                      <div className={`flex items-center gap-1 text-sm ${
                        item.trend > 0 ? 'text-black' : 'text-black'
                      }`}>
                        {item.trend > 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {Math.abs(item.trend)}%
                      </div>
                    )}
                  </div>
                  <p className="text-black/70 text-xs mb-1">{item.label}</p>
                  <p className="text-black text-2xl">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Currency Converter */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-black/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <ArrowRightLeft className="w-5 h-5 text-black" />
            </div>
            <h2 className="text-black">Currency Converter</h2>
          </div>
          <CurrencyConverter currencyPairs={currencyPairs} />
        </div>

        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white mb-1">{selectedPair}</h2>
                <p className="text-slate-500 text-sm">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showHistorical}
                    onChange={(e) => setShowHistorical(e.target.checked)}
                    className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
                  />
                  Historical
                </label>
                <select
                  value={selectedPair}
                  onChange={(e) => setSelectedPair(e.target.value)}
                  className="px-3 py-1.5 border border-slate-700 rounded-full text-sm text-slate-200 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  {currencyPairs.map((cp) => (
                    <option key={cp.pair} value={cp.pair}>
                      {cp.pair}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Technical Indicator Toggles */}
            <div className="flex gap-2 mb-4">
              {['EMA', 'RSI', 'MACD'].map((indicator, index) => {
                const colors = ['bg-purple-500', 'bg-pink-500', 'bg-lime-500'];
                return (
                  <button
                    key={indicator}
                    onClick={() => toggleIndicator(indicator)}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      activeIndicators.includes(indicator)
                        ? `${colors[index]} text-black shadow-lg`
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {indicator}
                  </button>
                );
              })}
            </div>

            <ExchangeRateChart 
              timeframe={timeframe} 
              pair={selectedPair} 
              showHistorical={showHistorical}
              activeIndicators={activeIndicators}
            />
          </div>

          {/* Currency Pairs List */}
          <div className="space-y-3">
            <h2 className="text-white mb-2 px-2">Major Pairs</h2>
            {currencyPairs.map((cp) => (
              <CurrencyPairCard
                key={cp.pair}
                {...cp}
                isSelected={cp.pair === selectedPair}
                onClick={() => setSelectedPair(cp.pair)}
              />
            ))}
          </div>
        </div>

        {/* Technical Indicators Panel */}
        {activeIndicators.length > 0 && (
          <TechnicalIndicators 
            pair={selectedPair}
            timeframe={timeframe}
            activeIndicators={activeIndicators}
          />
        )}

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-black" />
              </div>
              <div>
                <h2 className="text-white">Trading Volume</h2>
                <p className="text-slate-500 text-xs">24-hour volume</p>
              </div>
            </div>
            <VolumeChart />
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-black" />
              </div>
              <div>
                <h2 className="text-white">Market Heatmap</h2>
                <p className="text-slate-500 text-xs">% change</p>
              </div>
            </div>
            <MarketHeatmap />
          </div>
        </div>
      </div>
    </div>
  );
}