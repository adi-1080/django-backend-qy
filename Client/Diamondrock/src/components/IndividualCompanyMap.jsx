import React, { useState, useEffect} from 'react';
import { TrendingUp } from 'lucide-react';
import StockChart from './charts/CandeStickStockChart';
import { useSelector } from 'react-redux';

function IndividualCompanyMap(props) {
  const tickerDetails = useSelector((state) => state.innerChartApiData.tickerDetails);
  const [displayedVolume, setDisplayedVolume] = useState('10.11');
  const [displayedPrice, setDisplayedPrice] = useState('1,246.30');
  const [displayedPriceChange, setDisplayedPriceChange] = useState('30.85');
  const [displayedPriceChangePercentage, setDisplayedPriceChangePercentage] = useState('2.54');
  const [time, setTime] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const periods = ['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'All'];

  useEffect(() => {
    // Function to format time as HH:MM:SS UTC
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds} UTC`);
    };

    // Update the time every second
    updateTime(); // Update immediately on mount
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <section className="h-full bg-white rounded-md border border-gray-200 flex flex-col relative">
      {/* Header */}
        <div className="border-b border-gray-200" style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 100 }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Company Info */}
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h1 className="text-md font-bold">
                {tickerDetails.companyName} • {tickerDetails.market}
              </h1>
            </div>

            {/* Price Info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-emerald-600">
                <span className="text-sm font-medium">₹{displayedPrice}</span>
                <span className="text-sm font-medium"
                  style={{ color: displayedPriceChange > 0 ? '#10B981' : '#EF4444' }}
                >
                  {displayedPriceChange>0?'+':''}{displayedPriceChange} ({displayedPriceChange>0?'+':''}{displayedPriceChangePercentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Trading Actions */}
          {/* <div className="mt-1 flex gap-4">
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
             */}
          {/* Volume */}
          <div className="mt-1 text-sm text-gray-600">
            Vol <span className="text-emerald-600">{displayedVolume}M</span>
          </div>
        </div>
          
        {/* Chart Component */}
        <div className="flex-1 pt-2 px-1" style={{ paddingBottom: 0 }}>
          <StockChart selectedPeriod={selectedPeriod} setDisplayedVolume={setDisplayedVolume} setDisplayedPrice={setDisplayedPrice}
          setDisplayedPriceChange={setDisplayedPriceChange} setDisplayedPriceChangePercentage={setDisplayedPriceChangePercentage}
          isWatchlistPanelOpen={props.isWatchlistPanelOpen} isChartExpanded={props.isChartExpanded}/>
        </div>

        {/* Time Period Selector */}
        <nav
          className="flex justify-between text-sm p-2 border-t border-gray-200"
          aria-label="Chart time periods"
        >
          <div className="flex">
            {periods.map((period) => (
              <button
                key={period}
                className={`px-2 py-1 rounded transition-colors ${
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
          </div>
          <div className="px-4 pt-1 pb-0">{time}</div>
        </nav>
    </section>
  );
}

export default IndividualCompanyMap;