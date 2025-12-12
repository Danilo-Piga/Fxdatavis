export function MarketHeatmap() {
  const heatmapData = [
    { pair: 'EUR/USD', change: 0.34, volume: 'High' },
    { pair: 'GBP/USD', change: -0.21, volume: 'High' },
    { pair: 'USD/JPY', change: 0.56, volume: 'Very High' },
    { pair: 'USD/CHF', change: -0.12, volume: 'Medium' },
    { pair: 'AUD/USD', change: 0.18, volume: 'Medium' },
    { pair: 'USD/CAD', change: -0.08, volume: 'Medium' },
    { pair: 'NZD/USD', change: 0.42, volume: 'Low' },
    { pair: 'EUR/GBP', change: 0.15, volume: 'Medium' },
    { pair: 'EUR/JPY', change: -0.28, volume: 'High' },
    { pair: 'GBP/JPY', change: 0.67, volume: 'Medium' },
    { pair: 'AUD/JPY', change: -0.33, volume: 'Low' },
    { pair: 'CHF/JPY', change: 0.21, volume: 'Low' },
  ];

  const getColor = (change: number) => {
    if (change > 0.4) return 'from-cyan-300 to-cyan-200';
    if (change > 0.2) return 'from-cyan-400 to-cyan-300';
    if (change > 0) return 'from-cyan-500 to-cyan-400';
    if (change > -0.2) return 'from-blue-400 to-blue-500';
    if (change > -0.4) return 'from-blue-600 to-blue-700';
    return 'from-blue-800 to-blue-900';
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
      {heatmapData.map((item) => {
        const isLight = item.change > 0.2;
        return (
          <div
            key={item.pair}
            className={`bg-gradient-to-br ${getColor(item.change)} aspect-square rounded-2xl p-3 flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-lg`}
          >
            <p className={`text-xs mb-1 ${isLight ? 'text-blue-900/70' : 'text-white/70'}`}>{item.pair}</p>
            <p className={`text-lg mb-0.5 ${isLight ? 'text-blue-900' : 'text-white'}`}>
              {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%
            </p>
            <p className={`text-xs ${isLight ? 'text-blue-900/60' : 'text-white/60'}`}>{item.volume}</p>
          </div>
        );
      })}
    </div>
  );
}