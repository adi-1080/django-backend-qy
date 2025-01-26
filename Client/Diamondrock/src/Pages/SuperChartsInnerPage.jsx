import React from 'react'
import IndividualCompanyMap from '../components/IndividualCompanyMap'

function SuperChartsInnerPage() {
  return (
    <div className="h-screen flex flex-col gap-1 bg-gray-100">
      {/* Header */}
      <header className="h-12 bg-white flex items-center px-4 shadow">
        <div className="flex items-center w-full justify-between">
          {/* Left section of the header */}
          <div className="flex items-center gap-4">
            <div className="font-bold text-lg">RELIANCE</div>
            {/* Add more icons or elements */}
          </div>
          {/* Right section of the header */}
          <div className="flex items-center gap-2">
            {/* Add additional icons or buttons */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 gap-1 bg-gray-100">
        {/* Left Sidebar */}
        <aside className="w-12 bg-white border-r border-white flex flex-col items-center py-2 rounded-tr-md">
          <button className="mb-2">Icon 1</button>
          <button className="mb-2">Icon 2</button>
          <button className="mb-2">Icon 3</button>
          <button className="mb-2">Icon 4</button>
        </aside>

        {/* Chart Section */}
        <main className="flex-1 flex flex-col gap-1 bg-gray-100">
          {/* Chart */}
          <div className="flex-1 p-0">
            <IndividualCompanyMap />
          </div>

          {/* Footer options */}
          <div className="h-16 bg-white border-t border-gray-200 px-4 flex items-center rounded-md">
            <div className="flex gap-4">
              <button>Overview</button>
              <button>Performance</button>
              <button>Strategy Tester</button>
              <button>Trading Panel</button>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 bg-white border-l border-gray-200 p-4 rounded-tl-md">
          <div className="mb-4">
            <h3 className="font-semibold">Watchlist</h3>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span>SPX</span>
                <span>-0.29%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>NDQ</span>
                <span>-0.58%</span>
              </div>
              {/* Add more entries */}
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Reliance</h4>
            <p className="text-sm text-gray-500">Energy Minerals • Oil Refining/Marketing</p>
            <p className="text-lg font-bold">₹1,246.30</p>
            <p className="text-xs text-gray-500">Market Closed</p>
          </div>
        </aside>
        {/* Right Second Sidebar */}
        <aside className="w-12 bg-white border-r border-white flex flex-col items-center py-2">
          <button className="mb-2">Icon 1</button>
          <button className="mb-2">Icon 2</button>
          <button className="mb-2">Icon 3</button>
          <button className="mb-2">Icon 4</button>
        </aside>
      </div>
    </div>
  );
}

export default SuperChartsInnerPage