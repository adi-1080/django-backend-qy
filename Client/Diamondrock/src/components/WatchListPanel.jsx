import React from 'react';
import { ChevronDown, BarChart2, Settings2, Clock, Plus, MoreHorizontal } from 'lucide-react';
import SeasonalChart from './SeasonalChart';

const watchlistData = [
  { symbol: 'SPX', last: 5998.23, change: -103.02, changePercent: -1.69, type: 'index' },
  { symbol: 'NDQ', last: 21175.17, change: -598.84, changePercent: -2.75, type: 'index' },
  { symbol: 'DJI', last: 44318.94, change: -105.31, changePercent: -0.24, type: 'index' },
  { symbol: 'VIX', last: 18.51, change: 3.66, changePercent: 24.65, type: 'index' },
  { symbol: 'DXY', last: 107.269, change: -0.196, changePercent: -0.18, type: 'index' },
  { symbol: 'AAPL', last: 225.12, change: 2.34, changePercent: 1.05, type: 'stock' },
];

// Sample historical data for the seasonal chart
const seasonalData = [
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 2.5 },
  { month: 'Mar', value: -1.2 },
  { month: 'Apr', value: 3.8 },
  { month: 'May', value: 1.5 },
  { month: 'Jun', value: -2.1 },
  { month: 'Jul', value: 4.2 },
  { month: 'Aug', value: 3.1 },
  { month: 'Sep', value: -3.5 },
  { month: 'Oct', value: 2.8 },
  { month: 'Nov', value: 5.2 },
  { month: 'Dec', value: 4.1 },
];

const WatchlistPanel = () => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Watchlist <ChevronDown className="w-4 h-4" />
          </h2>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <Clock className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 text-xs text-gray-500">
          <div>Symbol</div>
          <div className="text-right">Last</div>
          <div className="text-right">Chg%</div>
        </div>
      </div>

      {/* Watchlist Content */}
      <div className="flex-1 overflow-auto">
        {/* Indices Section */}
        <div className="px-4 py-2 bg-gray-50 text-xs font-medium text-gray-600">
          INDICES
        </div>
        {watchlistData
          .filter((item) => item.type === 'index')
          .map((item) => (
            <div
              key={item.symbol}
              className="px-4 py-2 hover:bg-gray-50 grid grid-cols-3 items-center text-sm border-b border-gray-100"
            >
              <div className="font-medium">{item.symbol}</div>
              <div className="text-right">{item.last.toLocaleString()}</div>
              <div
                className={`text-right ${
                  item.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {item.changePercent >= 0 ? '+' : ''}
                {item.changePercent.toFixed(2)}%
              </div>
            </div>
          ))}

        {/* Stocks Section */}
        <div className="px-4 py-2 bg-gray-50 text-xs font-medium text-gray-600">
          STOCKS
        </div>
        {watchlistData
          .filter((item) => item.type === 'stock')
          .map((item) => (
            <div
              key={item.symbol}
              className="px-4 py-2 hover:bg-gray-50 grid grid-cols-3 items-center text-sm border-b border-gray-100"
            >
              <div className="font-medium">{item.symbol}</div>
              <div className="text-right">{item.last.toLocaleString()}</div>
              <div
                className={`text-right ${
                  item.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {item.changePercent >= 0 ? '+' : ''}
                {item.changePercent.toFixed(2)}%
              </div>
            </div>
          ))}
      </div>

      {/* Seasonals Section */}
      <div className="border-t border-gray-200">
        <div className="px-4 py-2 flex items-center justify-between bg-gray-50">
          <span className="text-sm font-medium">Seasonals</span>
          <div className="flex gap-2">
            <button className="p-1 hover:bg-gray-200 rounded">
              <BarChart2 className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>6M</span>
            <span>YTD</span>
            <span>1Y</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-red-500">-6.82%</span>
            <span className="text-red-500">-5.46%</span>
            <span className="text-green-500">+6.67%</span>
          </div>
          <div className="mt-2">
            <SeasonalChart data={seasonalData} />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              {seasonalData.filter((_, i) => i % 3 === 0).map((point) => (
                <span key={point.month}>{point.month}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistPanel;