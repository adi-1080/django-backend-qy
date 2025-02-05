import React, { useState } from 'react';
import { ArrowLeft, Share2 } from 'lucide-react';

const stockData = [
    {
        name: 'Impex Ferro Tech Ltd.',
        logo: '🏭',
        ltp: {
            '1D': { price: 3.04, change: 0.10, changePercent: 3.4 },
            '1W': { price: 3.10, change: 0.15, changePercent: 4.2 },
            '1M': { price: 2.95, change: -0.05, changePercent: -1.8 },
            '3M': { price: 2.80, change: 0.30, changePercent: 8.5 },
            '6M': { price: 2.75, change: 0.35, changePercent: 9.2 },
            '1Y': { price: 2.50, change: 0.60, changePercent: 15.4 },
            '2Y': { price: 2.30, change: 0.80, changePercent: 20.1 },
            '5Y': { price: 2.00, change: 1.10, changePercent: 30.5 }
        },
        lastUpdate: '03:31:09 pm'
    },
    {
        name: 'Maithan Alloys Ltd.',
        logo: '✈️',
        ltp: {
            '1D': { price: 979.30, change: 13.65, changePercent: 1.4 },
            '1W': { price: 965.50, change: 25.45, changePercent: 2.8 },
            '1M': { price: 950.20, change: 40.75, changePercent: 4.5 },
            '3M': { price: 920.10, change: 70.85, changePercent: 7.2 },
            '6M': { price: 900.50, change: 90.45, changePercent: 9.1 },
            '1Y': { price: 850.30, change: 140.65, changePercent: 14.2 },
            '2Y': { price: 800.20, change: 190.75, changePercent: 19.3 },
            '5Y': { price: 700.10, change: 290.85, changePercent: 29.4 }
        },
        lastUpdate: '03:53:06 pm'
    },
    {
        name: 'Jainam Ferro Alloys (I) Ltd.',
        logo: '🏢',
        ltp: {
            '1D': { price: 201.00, change: 0.00, changePercent: 0.0 },
            '1W': { price: 200.50, change: 0.50, changePercent: 0.2 },
            '1M': { price: 199.00, change: 2.00, changePercent: 1.0 },
            '3M': { price: 195.00, change: 6.00, changePercent: 3.0 },
            '6M': { price: 190.00, change: 11.00, changePercent: 5.5 },
            '1Y': { price: 180.00, change: 21.00, changePercent: 10.5 },
            '2Y': { price: 170.00, change: 31.00, changePercent: 15.5 },
            '5Y': { price: 150.00, change: 51.00, changePercent: 25.5 }
        },
        lastUpdate: '03:15:17 pm'
    }
];

const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', '2Y', '5Y'];
const exchanges = ['NSE', 'BSE'];

const SectorsGainers = () => {

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

export default SectorsGainers;