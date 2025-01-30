import React from 'react';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';

export default function FIIDII() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">NIFTY</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">23,163.10</span>
            <span className="text-green-500 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +205.85 (0.9%)
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">INDIA VIX</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">18.64</span>
            <span className="text-green-500 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +0.44 (2.4%)
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">SENSEX</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">76,532.96</span>
            <span className="text-green-500 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +631.55 (0.8%)
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6">FII / DII Activity: Net Buy/(Sell)</h2>
        <div className="space-y-6">
          {fiiDiiData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="w-1/3">{item.category}</div>
              <div className="w-1/3">
                <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full ${
                      item.value > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ 
                      width: `${Math.abs(item.value) / 100}%`,
                      left: item.value < 0 ? 'auto' : '50%',
                      right: item.value < 0 ? '50%' : 'auto'
                    }}
                  />
                </div>
              </div>
              <div className={`w-1/3 text-right ${item.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.value > 0 ? '+' : ''}{item.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const fiiDiiData = [
  { category: 'FII Cash Market (Provisional)', value: -2586.43 },
  { category: 'DII Cash Market (Provisional)', value: 1792.71 },
  { category: 'FII Index Futures', value: 165.78 },
  { category: 'FII Index Options', value: 21593.10 },
  { category: 'FII Stock Futures', value: 2868.08 },
  { category: 'FII Stock Options', value: 4345.71 }
];