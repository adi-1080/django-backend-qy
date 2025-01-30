import React from 'react';
import { BarChart2 } from 'lucide-react';

export default function FuturesOI() {
  const [activeView, setActiveView] = React.useState('Gross');
  const [activeType, setActiveType] = React.useState('Index');

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div className="flex space-x-4">
          <button 
            className={`px-4 py-2 rounded-full ${
              activeView === 'Gross' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
            onClick={() => setActiveView('Gross')}
          >
            Gross
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${
              activeView === 'Net' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
            onClick={() => setActiveView('Net')}
          >
            Net
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${
              activeView === 'Participants' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
            onClick={() => setActiveView('Participants')}
          >
            Participants
          </button>
        </div>
        <div className="flex space-x-4">
          <button 
            className={`px-4 py-2 rounded-lg ${
              activeType === 'Index' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
            onClick={() => setActiveType('Index')}
          >
            Index
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${
              activeType === 'Stocks' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
            onClick={() => setActiveType('Stocks')}
          >
            Stocks
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Gross Open Interest</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-400 rounded-sm mr-2"></div>
              <span className="text-sm text-gray-600">Long</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pink-400 rounded-sm mr-2"></div>
              <span className="text-sm text-gray-600">Short</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {futuresData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="w-24">{item.category}</div>
              <div className="flex-1 px-4">
                <div className="relative h-8">
                  {/* Long Bar */}
                  <div 
                    className="absolute top-0 left-1/2 h-full bg-emerald-400 rounded-r"
                    style={{ width: `${(item.long / 4) * 100}%` }}
                  >
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-white">
                      {item.long}L
                    </span>
                  </div>
                  {/* Short Bar */}
                  <div 
                    className="absolute top-0 right-1/2 h-full bg-pink-400 rounded-l"
                    style={{ width: `${(item.short / 4) * 100}%` }}
                  >
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-white">
                      {item.short}L
                    </span>
                  </div>
                </div>
              </div>
              <div className={`w-24 text-right ${item.netContracts > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.netContracts > 0 ? '+' : ''}{item.netContracts.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const futuresData = [
  { category: 'Client', long: 3.8, short: 1.5, netContracts: 229849 },
  { category: 'DII', long: 0.099, short: 0.062, netContracts: 37454 },
  { category: 'FII', long: 1.1, short: 3.3, netContracts: -224190 },
  { category: 'Pro', long: 0.053, short: 0.096, netContracts: -43113 }
];