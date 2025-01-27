import { Clock, TrendingDown, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('major');

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Indices</h1>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Clock size={16} />  
          <span>Last Update: 04:14:59 pm</span>
        </div>
      </header>

      <nav className="border-b mb-6">
        <div className="flex gap-8">
          {['Major', 'Gainers', 'Losers'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-4 px-1 relative ${
                activeTab === tab.toLowerCase() 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {activeTab === tab.toLowerCase() && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </nav>

      <div className="bg-white rounded-xl shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Index Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">LTP</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Chg</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Chg%</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Last Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getData(activeTab).map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4 text-right">
                  {item.ltp.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={item.change > 0 ? 'text-green-600' : 'text-red-600'}>
                    {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end">
                    <span className={item.change > 0 ? 'text-green-600' : 'text-red-600'}>
                      {item.change > 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                    </span>
                    {item.change > 0 ? (
                      <TrendingUp size={16} className="ml-1 text-green-600" />
                    ) : (
                      <TrendingDown size={16} className="ml-1 text-red-600" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-gray-500">04:14:59 pm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const data = {
  major: [
    { name: 'Nifty 50', ltp: 22829.15, change: -263.95, changePercent: -1.1 },
    { name: 'Nifty 500', ltp: 20510.95, change: -407.95, changePercent: -1.9 },
    { name: 'Nifty Bank', ltp: 48064.65, change: -303.15, changePercent: -0.6 },
    { name: 'Nifty Financial Services', ltp: 22383.10, change: -130.40, changePercent: -0.6 },
    { name: 'Nifty Midcap Select', ltp: 11722.20, change: -365.65, changePercent: -3.0 },
    { name: 'Nifty Next 50', ltp: 65730.90, change: -1763.10, changePercent: -2.8 },
    { name: 'Nifty 100', ltp: 23319.95, change: -340.25, changePercent: -1.4 },
    { name: 'Nifty 200', ltp: 12654.75, change: -213.75, changePercent: -1.7 }
  ],
  gainers: [
    { name: 'India VIX', ltp: 18.13, change: 1.38, changePercent: 8.2 },
    { name: 'Nifty50 PR 1x Inverse', ltp: 220.05, change: 2.60, changePercent: 1.2 },
    { name: 'Nifty50 TR 1x Inverse', ltp: 182.10, change: 2.15, changePercent: 1.2 },
    { name: 'Nifty 10 yr Benchmark G-Sec', ltp: 2471.91, change: 8.63, changePercent: 0.4 },
    { name: 'Nifty 11-15 yr G-Sec Index', ltp: 3094.40, change: 10.12, changePercent: 0.3 }
  ],
  losers: [
    { name: 'Nifty Smallcap 50', ltp: 7800.70, change: -314.80, changePercent: -3.9 },
    { name: 'Nifty Midcap 50', ltp: 14427.05, change: -399.95, changePercent: -2.7 },
    { name: 'Nifty PSU Bank', ltp: 6093.40, change: -59.55, changePercent: -1.0 },
    { name: 'Nifty IT', ltp: 42060.70, change: -1463.40, changePercent: -3.4 },
    { name: 'Nifty Auto', ltp: 21970.45, change: -200.60, changePercent: -0.9 }
  ]
};

const getData = (tab) => data[tab] || [];