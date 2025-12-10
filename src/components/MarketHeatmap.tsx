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
    if (change > 0.4) return 'from-lime-400 to-lime-500';
    if (change > 0.2) return 'from-cyan-400 to-cyan-500';
    if (change > 0) return 'from-blue-400 to-blue-500';
    if (change > -0.2) return 'from-pink-300 to-pink-400';
    if (change > -0.4) return 'from-rose-400 to-rose-500';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
      {heatmapData.map((item) => (
        <div
          key={item.pair}
          className={`bg-gradient-to-br ${getColor(item.change)} aspect-square rounded-2xl p-3 flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-lg`}
        >
          <p className="text-xs text-black/70 mb-1">{item.pair}</p>
          <p className="text-black text-lg mb-0.5">
            {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%
          </p>
          <p className="text-xs text-black/60">{item.volume}</p>
        </div>
      ))}
    </div>
  );
}