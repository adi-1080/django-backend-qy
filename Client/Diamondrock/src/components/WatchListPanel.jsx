    import React, { useState } from 'react';
    import { ChevronDown, ChevronUp, BarChart2, Settings2, Clock, Plus, MoreHorizontal, Grid, Edit3 } from 'lucide-react';
    import SeasonalChart from './SeasonalChart';

    const watchlistData = [
    { symbol: 'SPX', last: 5998.23, change: -103.02, changePercent: -1.69, type: 'index' },
    { symbol: 'NDQ', last: 21175.17, change: -598.84, changePercent: -2.75, type: 'index' },
    { symbol: 'DJI', last: 44318.94, change: -105.31, changePercent: -0.24, type: 'index' },
    { symbol: 'VIX', last: 18.51, change: 3.66, changePercent: 24.65, type: 'index' },
    { symbol: 'DXY', last: 107.269, change: -0.196, changePercent: -0.18, type: 'index' },
    { symbol: 'AAPL', last: 225.12, change: 2.34, changePercent: 1.05, type: 'stock' },
    { symbol: 'TSLA', last: 397.15, change: -9.34, changePercent: -2.32, type: 'stock' },
    { symbol: 'NFLX', last: 971.89, change: -5.74, changePercent: -0.58, type: 'stock' }
    ];

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
    const [showIndices, setShowIndices] = useState(true);
    const [showStocks, setShowStocks] = useState(true);
    const [showSeasonals, setShowSeasonals] = useState(true);
    const [selectedSymbol, setSelectedSymbol] = useState('BANKNIFTY');

    return (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col rounded-tl" style={{ height: '100%' }}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
            <h2 className="text-md font-semibold flex items-center gap-2">
                Watchlist <ChevronDown className="w-4 h-4" />
            </h2>
            <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                {/* <Clock className="w-4 h-4" /> */}
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                {/* <Plus className="w-4 h-4" /> */}
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                {/* <MoreHorizontal className="w-4 h-4" /> */}
                </button>
            </div>
            </div>
            <div className="grid grid-cols-4 text-xs text-gray-500">
            <div>Symbol</div>
            <div className="text-right">Last</div>
            <div className="text-right">Chg</div>
            <div className="text-right">Chg%</div>
            </div>
        </div>

        {/* Watchlist Content */}
        <div className="flex-1 overflow-auto scroll-custom">
            {/* Selected Symbol Info */}
            

            {/* Indices Section */}
            <div>
            <button
                onClick={() => setShowIndices(!showIndices)}
                className="w-full px-4 py-2 bg-gray-50 text-xs font-medium text-gray-600 flex items-center justify-between hover:bg-gray-100"
            >
                <span>INDICES</span>
                {showIndices ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showIndices && watchlistData
                .filter((item) => item.type === 'index')
                .map((item) => (
                <div
                    key={item.symbol}
                    className="px-4 py-2 hover:bg-gray-50 grid grid-cols-4 items-center text-sm border-b border-gray-100 cursor-pointer"
                    onClick={() => setSelectedSymbol(item.symbol)}
                >
                    <div className="font-medium">{item.symbol}</div>
                    <div className="text-right">{item.last.toLocaleString()}</div>
                    <div
                    className={`text-right ${
                        item.change >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                    >
                    {item.change >= 0 ? '+' : ''}
                    {item.change.toFixed(2)}
                    </div>
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

            {/* Stocks Section */}
            <div>
            <button
                onClick={() => setShowStocks(!showStocks)}
                className="w-full px-4 py-2 bg-gray-50 text-xs font-medium text-gray-600 flex items-center justify-between hover:bg-gray-100"
            >
                <span>STOCKS</span>
                {showStocks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showStocks && watchlistData
                .filter((item) => item.type === 'stock')
                .map((item) => (
                <div
                    key={item.symbol}
                    className="px-4 py-2 hover:bg-gray-50 grid grid-cols-4 items-center text-sm border-b border-gray-100 cursor-pointer"
                    onClick={() => setSelectedSymbol(item.symbol)}
                >
                    <div className="font-medium">{item.symbol}</div>
                    <div className="text-right">{item.last.toLocaleString()}</div>
                    <div
                    className={`text-right ${
                        item.change >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                    >
                    {item.change >= 0 ? '+' : ''}
                    {item.change.toFixed(2)}
                    </div>
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
        </div>

        {/* Performance Section */}
        <div className={`border-t border-gray-200 ${showSeasonals ? "max-h-96" : "h-12"} overflow-y-auto transition-all duration-300 scroll-custom`}>
            <div
            onClick={() => setShowSeasonals(!showSeasonals)}
            className="w-full px-4 py-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
            >
            <span className="text-sm font-medium">Performance</span>
            <div className="flex gap-2 items-center">
                <button className="p-1 hover:bg-gray-200 rounded" onClick={(e) => e.stopPropagation()}>
                {/* <BarChart2 className="w-4 h-4" /> */}
                </button>
                <button className="p-1 hover:bg-gray-200 rounded" onClick={(e) => e.stopPropagation()}>
                {/* <Settings2 className="w-4 h-4" /> */}
                </button>
                {showSeasonals ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
            </div>
            <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                <h3 className="font-semibold">{selectedSymbol}</h3>
                <span className="text-xs text-gray-500">NSE • Index</span>
                </div>
                <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                    {/* <Grid className="w-4 h-4" /> */}
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                    {/* <Edit3 className="w-4 h-4" /> */}
                </button>
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">48,866.85</span>
                <span className="text-sm text-green-500">+802.20 (+1.67%)</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
                Last update at 15:29 GMT+5:30 • Market closed
            </div>
            </div>
            {showSeasonals && (
            <div className="p-4">
                <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-red-50 p-2 rounded">
                    <div className="text-xs text-gray-500">1W</div>
                    <div className="text-sm text-red-500">-1.34%</div>
                </div>
                <div className="bg-red-50 p-2 rounded">
                    <div className="text-xs text-gray-500">1M</div>
                    <div className="text-sm text-red-500">-4.68%</div>
                </div>
                <div className="bg-red-50 p-2 rounded">
                    <div className="text-xs text-gray-500">6M</div>
                    <div className="text-sm text-red-500">-6.00%</div>
                </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-red-50 p-2 rounded">
                    <div className="text-xs text-gray-500">6M</div>
                    <div className="text-sm text-red-500">-5.43%</div>
                </div>
                <div className="bg-red-50 p-2 rounded">
                    <div className="text-xs text-gray-500">YTD</div>
                    <div className="text-sm text-red-500">-3.88%</div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                    <div className="text-xs text-gray-500">1Y</div>
                    <div className="text-sm text-green-500">+8.18%</div>
                </div>
                </div>
                <div className="mt-4">
                <div className="text-sm font-medium mb-2">Seasonals</div>
                <SeasonalChart data={seasonalData} />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    {seasonalData.filter((_, i) => i % 3 === 0).map((point) => (
                    <span key={point.month}>{point.month}</span>
                    ))}
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    );
    };

    export default WatchlistPanel;