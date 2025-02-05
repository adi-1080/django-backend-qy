import React, { useState } from 'react';
import { ArrowLeft, Share2 } from 'lucide-react';

const stockData = [
    {
        name: 'Sandur Manganese Ltd.',
        logo: '🏭',
        ltp: {
            '1D': { price: 2450.75, change: -89.25, changePercent: -3.5 },
            '1W': { price: 2500.00, change: -138.50, changePercent: -5.2 },
            '1M': { price: 2600.30, change: -238.80, changePercent: -8.4 },
            '3M': { price: 2700.50, change: -339.00, changePercent: -11.2 },
            '6M': { price: 2800.75, change: -439.25, changePercent: -13.5 },
            '1Y': { price: 3000.25, change: -638.75, changePercent: -17.5 },
            '2Y': { price: 3200.50, change: -839.00, changePercent: -20.8 },
            '5Y': { price: 3500.00, change: -1138.50, changePercent: -24.5 }
        },
        lastUpdate: '03:31:09 pm'
    },
    {
        name: 'Rohit Ferro-Tech Ltd.',
        logo: '⚡',
        ltp: {
            '1D': { price: 45.20, change: -1.30, changePercent: -2.8 },
            '1W': { price: 46.50, change: -2.60, changePercent: -5.3 },
            '1M': { price: 48.75, change: -4.85, changePercent: -9.0 },
            '3M': { price: 50.90, change: -7.00, changePercent: -12.1 },
            '6M': { price: 52.30, change: -8.40, changePercent: -13.8 },
            '1Y': { price: 55.80, change: -11.90, changePercent: -17.6 },
            '2Y': { price: 58.40, change: -14.50, changePercent: -19.9 },
            '5Y': { price: 62.75, change: -18.85, changePercent: -23.1 }
        },
        lastUpdate: '03:53:06 pm'
    },
    {
        name: 'Gujarat Mineral Dev. Corp.',
        logo: '⛏️',
        ltp: {
            '1D': { price: 155.30, change: -4.20, changePercent: -2.6 },
            '1W': { price: 158.50, change: -7.40, changePercent: -4.5 },
            '1M': { price: 162.75, change: -11.65, changePercent: -6.7 },
            '3M': { price: 165.90, change: -14.80, changePercent: -8.2 },
            '6M': { price: 170.25, change: -19.15, changePercent: -10.1 },
            '1Y': { price: 175.60, change: -24.50, changePercent: -12.2 },
            '2Y': { price: 180.90, change: -29.80, changePercent: -14.1 },
            '5Y': { price: 190.45, change: -39.35, changePercent: -17.1 }
        },
        lastUpdate: '03:15:17 pm'
    }
];

const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', '2Y', '5Y'];
const exchanges = ['NSE', 'BSE'];

const SectorsLosers = () => {

    const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
    const [selectedExchange, setSelectedExchange] = useState('NSE');
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    return (
        <div className="max-w-full mx-auto bg-white min-h-screen">



            {/* Date and Toggles */}
            <div className="p-4 flex items-center justify-between border-b">
                <div className="text-gray-600">{currentDate}</div>
                <div className="flex gap-4">
                    {/* Time Period Toggle */}
                    <div className="flex rounded-lg border overflow-hidden">
                        {timeframes.map((time) => (
                            <button
                                key={time}
                                className={`px-3 py-1 text-sm ${selectedTimeframe === time
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                onClick={() => setSelectedTimeframe(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>

                    {/* Exchange Toggle */}
                    <div className="flex rounded-lg border overflow-hidden">
                        {exchanges.map((exchange) => (
                            <button
                                key={exchange}
                                className={`px-3 py-1 text-sm ${selectedExchange === exchange
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                onClick={() => setSelectedExchange(exchange)}
                            >
                                {exchange}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 px-4 py-3 border-b text-sm font-medium text-gray-600">
                <div className="col-span-6">Stock Name</div>
                <div className="col-span-2 text-right">LTP</div>
                <div className="col-span-1 text-right">Chg</div>
                <div className="col-span-2 text-right">Chg %</div>
                <div className="col-span-1 text-right">Last Update</div>
            </div>

            {/* Table Content */}
            <div className="px-4">
                {stockData.map((stock) => {
                    const data = stock.ltp[selectedTimeframe];
                    return (
                        <div key={stock.name} className="grid grid-cols-12 py-4 border-b hover:bg-gray-50">
                            <div className="col-span-6 flex items-center gap-3">
                                <span className="text-xl">{stock.logo}</span>
                                <div className="font-medium">{stock.name}</div>
                            </div>
                            <div className="col-span-2 text-right self-center">
                                {data.price.toFixed(2)}
                            </div>
                            <div className={`col-span-1 text-right self-center ${data.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}
                            </div>
                            <div className={`col-span-2 text-right self-center ${data.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {data.changePercent >= 0 ? '▲' : '▼'} {Math.abs(data.changePercent).toFixed(1)}%
                            </div>
                            <div className="col-span-1 text-right self-center text-gray-500 text-sm">
                                {stock.lastUpdate}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SectorsLosers;