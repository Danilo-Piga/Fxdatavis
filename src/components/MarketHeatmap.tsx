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
    const intensity = Math.min(Math.abs(change) * 100, 70);
    if (change > 0.4) return '#22c55e';
    if (change > 0.2) return '#86efac';
    if (change > 0) return '#d1fae5';
    if (change > -0.2) return '#fee2e2';
    if (change > -0.4) return '#fca5a5';
    return '#ef4444';
  };

  const getTextColor = (change: number) => {
    return Math.abs(change) > 0.2 ? '#ffffff' : '#1e293b';
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
      {heatmapData.map((item) => (
        <div
          key={item.pair}
          className="aspect-square rounded-lg p-3 flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-sm"
          style={{
            backgroundColor: getColor(item.change),
            color: getTextColor(item.change),
          }}
        >
          <p className="text-xs mb-1 opacity-90">{item.pair}</p>
          <p className="mb-1">
            {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%
          </p>
          <p className="text-xs opacity-75">{item.volume}</p>
        </div>
      ))}
    </div>
  );
}
