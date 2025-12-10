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

  const colors = [
    'from-lime-400 to-lime-500',
    'from-cyan-400 to-cyan-500',
    'from-pink-400 to-pink-500',
    'from-purple-400 to-purple-500',
    'from-blue-400 to-blue-500',
    'from-rose-400 to-rose-500',
  ];
  
  const colorIndex = pair.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl transition-all ${
        isSelected
          ? `bg-gradient-to-br ${colors[colorIndex]} shadow-2xl scale-105`
          : 'bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-lg'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className={`text-sm mb-1 ${isSelected ? 'text-black/70' : 'text-slate-500'}`}>
            {pair}
          </p>
          <p className={`text-2xl ${isSelected ? 'text-black' : 'text-white'}`}>
            {rate.toFixed(4)}
          </p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
          isSelected 
            ? 'bg-black/20' 
            : isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
        }`}>
          {isPositive ? (
            <TrendingUp className={`w-3 h-3 ${isSelected ? 'text-black' : 'text-green-400'}`} />
          ) : (
            <TrendingDown className={`w-3 h-3 ${isSelected ? 'text-black' : 'text-red-400'}`} />
          )}
          <span className={`text-xs ${isSelected ? 'text-black' : isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className={isSelected ? 'text-black/60' : 'text-slate-500'}>High</p>
          <p className={isSelected ? 'text-black/90' : 'text-slate-300'}>{high.toFixed(4)}</p>
        </div>
        <div>
          <p className={isSelected ? 'text-black/60' : 'text-slate-500'}>Low</p>
          <p className={isSelected ? 'text-black/90' : 'text-slate-300'}>{low.toFixed(4)}</p>
        </div>
        <div>
          <p className={isSelected ? 'text-black/60' : 'text-slate-500'}>Vol</p>
          <p className={isSelected ? 'text-black/90' : 'text-slate-300'}>{volume}</p>
        </div>
      </div>
    </button>
  );
}