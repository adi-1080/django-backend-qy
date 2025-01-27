import React, { useState } from 'react';
import { TrendingUp, ChevronUp } from 'lucide-react';
import StockChart from './charts/CandeStickStockChart';

function IndividualCompanyMap() {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const periods = ['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'All'];

  return (
    <section className="h-full bg-white rounded-md border border-gray-200 flex flex-col relative">
      {/* Header */}
        <div className="border-b border-gray-200" style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 1000 }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Company Info */}
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h1 className="text-lg font-bold">
                RELIANCE INDUSTRIES LTD • 1M • NSE
              </h1>
            </div>

            {/* Price Info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-emerald-600">
                <ChevronUp className="h-5 w-5" />
                <span className="text-sm font-medium">₹1,246.30</span>
                <span className="text-sm font-medium">+30.85 (+2.54%)</span>
              </div>
            </div>

            {/* Badge */}
            <span className="bg-pink-50 text-pink-600 text-xs px-2 py-1 rounded font-medium">
              F
            </span>
          </div>

          {/* Trading Actions */}
          <div className="mt-1 flex gap-4">
            <button 
              className="group relative px-3 py-1 bg-white text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
              aria-label="Sell stock"
            >
              <div className="text-xs font-semibold">1,246.30</div>
              <div className="text-xs">SELL</div>
            </button>
            <button 
              className="group relative px-3 py-1 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              aria-label="Buy stock"
            >
              <div className="text-xs font-semibold">1,246.30</div>
              <div className="text-xs">BUY</div>
            </button>
          </div>
            
          {/* Volume */}
          <div className="mt-1 text-sm text-gray-600">
            Vol <span className="text-emerald-600">243.81M</span>
          </div>
        </div>
          
        {/* Chart Component */}
        <div className="flex-1 pt-11 px-1" style={{ paddingBottom: 0 }}>
          <StockChart selectedPeriod={selectedPeriod} />
        </div>

        {/* Time Period Selector */}
        <nav
          className="flex gap-3 text-sm p-2 border-t border-gray-200"
          aria-label="Chart time periods"
        >
          {periods.map((period) => (
            <button
              key={period}
              className={`px-3 py-1 rounded transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedPeriod(period)}
              aria-pressed={selectedPeriod === period}
            >
              {period}
            </button>
          ))}
        </nav>
    </section>
  );
}

export default IndividualCompanyMap;