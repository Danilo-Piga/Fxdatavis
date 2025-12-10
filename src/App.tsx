import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Euro, Globe } from 'lucide-react';
import { ExchangeRateChart } from './components/ExchangeRateChart';
import { CurrencyPairCard } from './components/CurrencyPairCard';
import { VolumeChart } from './components/VolumeChart';
import { MarketHeatmap } from './components/MarketHeatmap';

export default function App() {
  const [selectedPair, setSelectedPair] = useState('EUR/USD');
  const [timeframe, setTimeframe] = useState('1D');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-900 mb-2">Foreign Exchange Market</h1>
            <p className="text-slate-600">Real-time currency trading data and analytics</p>
          </div>
          <div className="flex gap-2">
            {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Market Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketSummary.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  {item.trend !== 0 && (
                    <div className={`flex items-center gap-1 text-sm ${
                      item.trend > 0 ? 'text-green-600' : 'text-red-600'
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
                <p className="text-slate-600 text-sm mb-1">{item.label}</p>
                <p className="text-slate-900">{item.value}</p>
              </div>
            );
          })}
        </div>

        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-slate-900 mb-1">{selectedPair} Exchange Rate</h2>
                <p className="text-slate-600 text-sm">
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
              <select
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 bg-white"
              >
                {currencyPairs.map((cp) => (
                  <option key={cp.pair} value={cp.pair}>
                    {cp.pair}
                  </option>
                ))}
              </select>
            </div>
            <ExchangeRateChart timeframe={timeframe} pair={selectedPair} />
          </div>

          {/* Currency Pairs List */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-slate-900 mb-4">Major Pairs</h2>
            <div className="space-y-3">
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
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-slate-900 mb-1">Trading Volume</h2>
            <p className="text-slate-600 text-sm mb-6">24-hour volume by currency pair</p>
            <VolumeChart />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-slate-900 mb-1">Market Heatmap</h2>
            <p className="text-slate-600 text-sm mb-6">Percentage change across major pairs</p>
            <MarketHeatmap />
          </div>
        </div>
      </div>
    </div>
  );
}
