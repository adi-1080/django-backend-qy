import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { IndicesCard } from "../sections/IndicesCard";
import { NiftyCard } from "../sections/Niftycard";
import { AdvancesDeclines } from "../sections/AdvancesDeclines";
import { TrendingNow } from "../sections/TrendingNow";
import { TrendingStocks } from "../sections/TrendingStocks";
import { MarketEvents } from "../sections/MarketEvents";
import { Deals } from "../sections/Deals";
import { NewsAndUpdates } from "../sections/NewsAndUpdates";

function MarketHome() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
        <main
          className={`flex-1 p-4 transition-all duration-300 ${
            isSidebarExpanded ? "ml-[calc(3rem+16rem)]" : "ml-[4.5rem]"
          } max-w-[calc(100vw-${
            isSidebarExpanded ? "calc(3rem+16rem)" : "4.5rem"
          })] overflow-x-hidden`}
        >
          <div className="max-w-[1600px] mx-auto bg-white p-4 rounded-lg">
            <div className="p-2 mb-4">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium">Indices</h1>
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  View All
                </a>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="border-spacing-2 shadow-xl rounded-lg">
                  <NiftyCard />
                </div>
                <div className="border-spacing-2 shadow-xl rounded-lg">
                  <IndicesCard />
                </div>
                <div className="border-spacing-2 shadow-xl rounded-lg">
                  <AdvancesDeclines />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="col-span-1 border-spacing-2 shadow-xl rounded-lg">
                <TrendingNow />
              </div>
              <div className="col-span-2 border-spacing-2 shadow-xl rounded-lg">
                <TrendingStocks />
              </div>
            </div>
            
            <div className="p-4 mb-4 border-spacing-2 shadow-xl rounded-lg">
              <NewsAndUpdates />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="col-span-1 border-spacing-2 shadow-xl rounded-lg">
                <MarketEvents />
              </div>
              <div className="col-span-2 border-spacing-2 shadow-xl rounded-lg">
                <Deals />
              </div>
            </div>

            
          </div>
        </main>
      </div>
    </div>
  );
}

export default MarketHome;
