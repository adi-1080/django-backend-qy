import React from 'react'
import IndividualCompanyMap from '../components/IndividualCompanyMap'
import WatchlistPanel from '../components/WatchlistPanel';

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
       
          <WatchlistPanel />
       
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