import { TrendingUp, TrendingDown } from 'lucide-react';

interface CurrencyPairCardProps {
  pair: string;
  rate: number;
  change: number;
  high: number;
  low: number;
  volume: string;
  isSelected: boolean;
  onClick: () => void;
}

export function CurrencyPairCard({
  pair,
  rate,
  change,
  high,
  low,
  volume,
  isSelected,
  onClick,
}: CurrencyPairCardProps) {
  const isPositive = change >= 0;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-slate-900 mb-1">{pair}</p>
          <p className="text-slate-900">{rate.toFixed(4)}</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded ${
          isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span className="text-sm">{Math.abs(change)}%</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <p className="text-slate-500 text-xs">High</p>
          <p className="text-slate-700">{high.toFixed(4)}</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs">Low</p>
          <p className="text-slate-700">{low.toFixed(4)}</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs">Volume</p>
          <p className="text-slate-700">{volume}</p>
        </div>
      </div>
    </button>
  );
}
