import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface CurrencyPair {
  pair: string;
  rate: number;
  change: number;
  high: number;
  low: number;
  volume: string;
}

interface CurrencyConverterProps {
  currencyPairs: CurrencyPair[];
}

export function CurrencyConverter({ currencyPairs }: CurrencyConverterProps) {
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  // Extract unique currencies from pairs
  const currencies = Array.from(
    new Set(
      currencyPairs.flatMap(cp => cp.pair.split('/'))
    )
  ).sort();

  // Calculate conversion rate
  const getConversionRate = (from: string, to: string): number => {
    if (from === to) return 1;

    // Try to find direct pair
    const directPair = currencyPairs.find(cp => cp.pair === `${from}/${to}`);
    if (directPair) return directPair.rate;

    // Try inverse pair
    const inversePair = currencyPairs.find(cp => cp.pair === `${to}/${from}`);
    if (inversePair) return 1 / inversePair.rate;

    // Cross rate calculation (via USD)
    if (from !== 'USD') {
      const fromUSD = currencyPairs.find(cp => cp.pair === `${from}/USD`);
      const inverseFromUSD = currencyPairs.find(cp => cp.pair === `USD/${from}`);
      const fromRate = fromUSD ? fromUSD.rate : (inverseFromUSD ? 1 / inverseFromUSD.rate : 1);

      if (to !== 'USD') {
        const toUSD = currencyPairs.find(cp => cp.pair === `${to}/USD`);
        const inverseToUSD = currencyPairs.find(cp => cp.pair === `USD/${to}`);
        const toRate = toUSD ? toUSD.rate : (inverseToUSD ? 1 / inverseToUSD.rate : 1);
        return fromRate / toRate;
      }
      return fromRate;
    }

    // Default approximation
    return 1;
  };

  const rate = getConversionRate(fromCurrency, toCurrency);
  const convertedAmount = parseFloat(amount || '0') * rate;

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
      {/* From Currency */}
      <div>
        <label className="block text-xs text-black/70 mb-2">From</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-black/10 rounded-2xl text-black bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-black/20 placeholder-black/40"
            placeholder="Amount"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="px-3 py-3 border-2 border-black/10 rounded-2xl text-black bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <button
          onClick={swapCurrencies}
          className="w-12 h-12 bg-black/20 hover:bg-black/30 backdrop-blur-sm text-black rounded-2xl transition-all flex items-center justify-center shadow-lg"
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>
      </div>

      {/* To Currency */}
      <div>
        <label className="block text-xs text-black/70 mb-2">To</label>
        <div className="flex gap-2">
          <div className="flex-1 px-4 py-3 border-2 border-black/10 rounded-2xl bg-black/10 backdrop-blur-sm text-black">
            {convertedAmount.toFixed(2)}
          </div>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="px-3 py-3 border-2 border-black/10 rounded-2xl text-black bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exchange Rate Display */}
      <div className="md:col-span-3 mt-1">
        <p className="text-xs text-black/60">
          1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
        </p>
      </div>
    </div>
  );
}