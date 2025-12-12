# FX Market Dashboard 📈

A comprehensive foreign exchange (forex) financial data visualization template featuring interactive charts, real-time market data, technical indicators, and advanced analytics. Built with React, TypeScript, and modern web technologies.

![FX Market Dashboard](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop)

## 🌟 Features

### Core Functionality
- **Interactive Currency Pair Cards** - View major currency pairs with live rates, daily changes, high/low values, and trading volume
- **Real-time Exchange Rate Charts** - Dynamic area charts with customizable timeframes (1D, 1W, 1M, 3M, 1Y)
- **Historical Data Overlay** - Toggle historical data comparison on charts for trend analysis
- **Bi-directional Currency Converter** - Convert between any available currency pairs with swap functionality
- **Market Heatmap** - Visual representation of market movements across currency pairs
- **Trading Volume Charts** - 24-hour volume analysis with color-coded bar charts

### Technical Analysis Tools
- **RSI (Relative Strength Index)** - Momentum oscillator with overbought/oversold signals
- **MACD (Moving Average Convergence Divergence)** - Trend-following momentum indicator
- **EMA (Exponential Moving Average)** - Multiple EMA periods (20, 50, 200) with visual overlays
- **Trading Signals** - Automated buy/sell signals based on technical indicators

### Market Intelligence
- **Market Summary Dashboard** - Key metrics including total volume, active pairs, average spread, and volatility index
- **Dynamic Card Selection** - Cards scale and illuminate when selected for enhanced UX
- **Responsive Design** - Fully responsive layout optimized for desktop and mobile devices

## 🎨 Design System

### Color Palette
The template uses a vibrant neon color scheme against a pure black background:

- **Primary Colors:**
  - Lime: `#84cc16` - `#a3e635`
  - Cyan: `#06b6d4` - `#22d3ee`
  - Pink: `#ec4899` - `#f472b6`
  - Purple: `#a855f7` - `#c084fc`
  - Blue: `#3b82f6` - `#60a5fa`

- **Background:**
  - Pure Black: `#000000`
  - Slate-900: `#0f172a`
  - Slate-800: `#1e293b`

### Design Features
- **Highly Rounded Corners** - 24px (`rounded-3xl`) and 16px (`rounded-2xl`) border radius throughout
- **Gradient Cards** - Bold neon gradients on summary cards and indicators
- **Backdrop Blur Effects** - Frosted glass effect on interactive elements
- **Card-based Layout** - Organized information hierarchy with distinct sections
- **Scale Animations** - Cards grow to 105% on selection with smooth transitions

## 📦 Project Structure

```
├── App.tsx                          # Main application component
├── components/
│   ├── CurrencyConverter.tsx        # Bi-directional currency conversion
│   ├── CurrencyPairCard.tsx         # Individual currency pair display
│   ├── ExchangeRateChart.tsx        # Main rate chart with indicators
│   ├── MarketHeatmap.tsx            # Visual market overview
│   ├── TechnicalIndicators.tsx      # RSI, MACD, EMA panels
│   ├── VolumeChart.tsx              # Trading volume visualization
│   └── ui/                          # Reusable UI components
├── styles/
│   └── globals.css                  # Global styles and theme tokens
└── utils/
    └── supabase/                    # Backend utilities
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Quick Start

1. **Clone or download the project**
   ```bash
   # The project is ready to use in Figma Make
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or the provided URL)

## 📊 Component Guide

### Currency Pair Card
**Location:** `/components/CurrencyPairCard.tsx`

Displays individual currency pair information with:
- Current exchange rate
- Percentage change (with trending indicators)
- 24h high/low values
- Trading volume
- Dynamic color coding based on pair name
- Scale animation on selection

**Props:**
```typescript
{
  pair: string;          // e.g., "EUR/USD"
  rate: number;          // Current exchange rate
  change: number;        // Percentage change
  high: number;          // 24h high
  low: number;           // 24h low
  volume: string;        // Trading volume
  isSelected: boolean;   // Selection state
  onClick: () => void;   // Click handler
}
```

### Exchange Rate Chart
**Location:** `/components/ExchangeRateChart.tsx`

Interactive area chart with:
- Multiple timeframe support (1D, 1W, 1M, 3M, 1Y)
- Historical data overlay toggle
- Technical indicator overlays (EMA)
- Gradient fill effects
- Responsive design

**Props:**
```typescript
{
  timeframe: string;            // Selected timeframe
  pair: string;                 // Currency pair to display
  showHistorical: boolean;      // Toggle historical data
  activeIndicators: string[];   // Active technical indicators
}
```

### Currency Converter
**Location:** `/components/CurrencyConverter.tsx`

Bi-directional converter featuring:
- Real-time rate calculation
- Swap button for quick reversal
- Support for all available currency pairs
- Cross-rate calculations via USD
- Exchange rate display

**Usage:**
```tsx
<CurrencyConverter currencyPairs={currencyPairs} />
```

### Technical Indicators
**Location:** `/components/TechnicalIndicators.tsx`

Three distinct indicator cards:

1. **EMA Card** (Purple gradient)
   - EMA 20, 50, and 200 values
   - Trend direction signal
   - Bullish/bearish indication

2. **RSI Card** (Pink gradient)
   - Current RSI value (0-100)
   - Visual gauge with zones
   - Mini line chart
   - Overbought/oversold/neutral signals

3. **MACD Card** (Lime gradient)
   - MACD line value
   - Signal line value
   - Histogram
   - Mini chart with crossover visualization
   - Bullish/bearish crossover indication

**Props:**
```typescript
{
  pair: string;                 // Currency pair
  timeframe: string;            // Timeframe
  activeIndicators: string[];   // Which indicators to show
}
```

### Volume Chart
**Location:** `/components/VolumeChart.tsx`

Bar chart displaying:
- 24-hour trading volume
- Color-coded bars (lime/red)
- Time-based distribution
- Responsive container

### Market Heatmap
**Location:** `/components/MarketHeatmap.tsx`

Grid-based visualization showing:
- Percentage changes across pairs
- Color intensity based on performance
- Compact, scannable layout
- Green/red color coding

## 🎯 Usage Examples

### Adding a New Currency Pair

In `/App.tsx`, add to the `currencyPairs` array:

```typescript
const currencyPairs = [
  // ... existing pairs
  { 
    pair: 'NZD/USD', 
    rate: 0.6125, 
    change: 0.42, 
    high: 0.6158, 
    low: 0.6098,
    volume: '890M'
  },
];
```

### Customizing Timeframes

Modify the timeframe buttons in `/App.tsx`:

```tsx
{['1H', '4H', '1D', '1W', '1M'].map((tf) => (
  <button
    key={tf}
    onClick={() => setTimeframe(tf)}
    className={/* ... */}
  >
    {tf}
  </button>
))}
```

### Changing Indicator Colors

In `/components/TechnicalIndicators.tsx`, update gradient classes:

```tsx
// EMA Card
<div className="bg-gradient-to-br from-indigo-500 to-indigo-600 ...">

// RSI Card
<div className="bg-gradient-to-br from-rose-400 to-rose-500 ...">

// MACD Card
<div className="bg-gradient-to-br from-emerald-400 to-emerald-500 ...">
```

### Modifying Chart Colors

In `/components/ExchangeRateChart.tsx`, update the gradient definitions:

```tsx
<linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor="#your-color" stopOpacity={0.6}/>
  <stop offset="95%" stopColor="#your-color" stopOpacity={0}/>
</linearGradient>
```

## 🛠 Technical Stack

### Core Technologies
- **React 18** - UI framework with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS v4.0** - Utility-first styling
- **Recharts** - Chart and data visualization library
- **Lucide React** - Icon system

### Key Libraries
- `recharts` - All chart components
- `lucide-react` - Icons throughout the UI
- Tailwind CSS utilities for responsive design

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization Guide

### Theme Customization

Edit `/styles/globals.css` to modify global theme tokens:

```css
:root {
  --chart-1: oklch(0.646 0.222 41.116);  /* Lime */
  --chart-2: oklch(0.6 0.118 184.704);   /* Cyan */
  --chart-3: oklch(0.398 0.07 227.392);  /* Blue */
  --chart-4: oklch(0.828 0.189 84.429);  /* Pink */
  --chart-5: oklch(0.769 0.188 70.08);   /* Purple */
}
```

### Card Border Radius

Update the radius values globally:

```css
:root {
  --radius: 0.625rem;  /* Default: 10px */
}
```

Or use Tailwind classes:
- `rounded-2xl` - 16px (current standard)
- `rounded-3xl` - 24px (current standard for cards)
- `rounded-full` - Fully rounded

### Adding Custom Indicators

1. Create a new indicator component
2. Add data generation logic
3. Update the toggle system in `/App.tsx`:

```tsx
const toggleIndicator = (indicator: string) => {
  setActiveIndicators(prev => 
    prev.includes(indicator) 
      ? prev.filter(i => i !== indicator)
      : [...prev, indicator]
  );
};
```

4. Add the button:

```tsx
<button
  onClick={() => toggleIndicator('BOLLINGER')}
  className={/* ... */}
>
  Bollinger Bands
</button>
```

## 📱 Responsive Breakpoints

The template uses Tailwind's responsive prefixes:

- **Mobile:** `< 768px` (default, no prefix)
- **Tablet:** `md:` `≥ 768px`
- **Desktop:** `lg:` `≥ 1024px`
- **Large Desktop:** `xl:` `≥ 1280px`

Example usage in components:
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  {/* 1 column on mobile, 3 columns on desktop */}
</div>
```

## 🔒 Data & API Integration

### Current Implementation
The template uses **mock data** generated in each component for demonstration purposes.

### Integrating Real Data

To connect to a real forex API:

1. **Choose an API provider:**
   - Alpha Vantage
   - Fixer.io
   - ExchangeRate-API
   - OANDA
   - Twelve Data

2. **Create an API service** (`/utils/forex-api.ts`):

```typescript
const API_KEY = 'your-api-key';
const BASE_URL = 'https://api.example.com';

export async function fetchCurrencyPairs() {
  const response = await fetch(`${BASE_URL}/latest?apikey=${API_KEY}`);
  return response.json();
}

export async function fetchHistoricalData(pair: string, timeframe: string) {
  const response = await fetch(
    `${BASE_URL}/historical/${pair}?timeframe=${timeframe}&apikey=${API_KEY}`
  );
  return response.json();
}
```

3. **Update components with real data:**

```tsx
// In App.tsx
import { fetchCurrencyPairs } from './utils/forex-api';

useEffect(() => {
  async function loadData() {
    const data = await fetchCurrencyPairs();
    setCurrencyPairs(data);
  }
  loadData();
}, []);
```

4. **Add real-time updates:**

```tsx
// Set up WebSocket or polling
useEffect(() => {
  const interval = setInterval(async () => {
    const data = await fetchCurrencyPairs();
    setCurrencyPairs(data);
  }, 30000); // Update every 30 seconds

  return () => clearInterval(interval);
}, []);
```

## 🔄 State Management

### Current Approach
The template uses React's built-in `useState` hooks for state management:

```tsx
const [selectedPair, setSelectedPair] = useState('EUR/USD');
const [timeframe, setTimeframe] = useState('1D');
const [showHistorical, setShowHistorical] = useState(false);
const [activeIndicators, setActiveIndicators] = useState<string[]>([]);
```

### Scaling to Complex State
For larger applications, consider:

**Context API:**
```tsx
// Create ForexContext
const ForexContext = createContext();

// Wrap app
<ForexContext.Provider value={{ pairs, timeframe, setPairs, setTimeframe }}>
  <App />
</ForexContext.Provider>
```

**State Management Libraries:**
- Zustand (lightweight)
- Redux Toolkit (comprehensive)
- Jotai (atomic state)

## 🧪 Testing

### Component Testing
```bash
# Add testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Example test for CurrencyPairCard
import { render, screen } from '@testing-library/react';
import { CurrencyPairCard } from './components/CurrencyPairCard';

test('renders currency pair information', () => {
  render(
    <CurrencyPairCard
      pair="EUR/USD"
      rate={1.0952}
      change={0.34}
      high={1.0987}
      low={1.0921}
      volume="2.3B"
      isSelected={false}
      onClick={() => {}}
    />
  );
  
  expect(screen.getByText('EUR/USD')).toBeInTheDocument();
  expect(screen.getByText('1.0952')).toBeInTheDocument();
});
```

## 🚀 Performance Optimization

### Current Optimizations
- Recharts uses `ResponsiveContainer` for efficient chart rendering
- Mock data generation is memoized within components
- Conditional rendering for technical indicators

### Additional Recommendations

**1. Memoization:**
```tsx
import { useMemo, memo } from 'react';

const MemoizedCurrencyPairCard = memo(CurrencyPairCard);

const data = useMemo(() => generateData(), [timeframe, pair]);
```

**2. Code Splitting:**
```tsx
import { lazy, Suspense } from 'react';

const TechnicalIndicators = lazy(() => import('./components/TechnicalIndicators'));

<Suspense fallback={<div>Loading...</div>}>
  <TechnicalIndicators />
</Suspense>
```

**3. Debouncing Updates:**
```tsx
import { debounce } from 'lodash';

const debouncedUpdate = debounce((value) => {
  setAmount(value);
}, 300);
```

## 📈 Future Enhancements

### Planned Features
- [ ] WebSocket integration for real-time data
- [ ] User authentication and personalized dashboards
- [ ] Watchlist and favorites functionality
- [ ] Price alerts and notifications
- [ ] Additional technical indicators (Bollinger Bands, Fibonacci, etc.)
- [ ] Export chart images and data
- [ ] Dark/light theme toggle
- [ ] Multi-language support
- [ ] Advanced order types simulation
- [ ] News feed integration
- [ ] Economic calendar
- [ ] Correlation matrix
- [ ] Portfolio tracking

### Community Contributions
We welcome contributions! Areas for improvement:
- Additional chart types (candlestick, Heikin-Ashi)
- More currency pairs and exotic pairs
- Enhanced mobile experience
- Accessibility improvements
- Performance optimizations
- Unit and integration tests

## 📄 License

This template is provided as-is for use in Figma Make. Feel free to customize and extend it for your projects.

## 🙏 Acknowledgments

- **Recharts** - For the excellent charting library
- **Lucide** - For the beautiful icon set
- **Tailwind CSS** - For the utility-first styling system
- **Unsplash** - For stock photography

## 📞 Support

For questions or issues:
1. Check the component documentation above
2. Review the code comments in each file
3. Refer to the official documentation:
   - [React](https://react.dev/)
   - [Recharts](https://recharts.org/)
   - [Tailwind CSS](https://tailwindcss.com/)
   - [Lucide Icons](https://lucide.dev/)

---

**Built with ❤️ using Figma Make**

*Last updated: December 2024*
