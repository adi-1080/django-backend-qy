import React, { useState } from "react";

const categories = [
  "Price Movers",
  "Volume Shockers",
  "52 Week High Low",
  "All Time High Low",
  "Most Visited",
];

const stocks = [
  {
    logo: "CAP",
    name: "Capri Global Capital Ltd.",
    sector: "Finance",
    ltp: "200.60",
    change: "+18.84",
    changePercent: "10.4",
  },
  {
    logo: "KFI",
    name: "KFin Technologies Ltd.",
    sector: "Finance",
    ltp: "1,164.90",
    change: "+60.85",
    changePercent: "5.5",
  },
  {
    logo: "FIV",
    name: "Five-Star Business Finance Ltd.",
    sector: "Finance",
    ltp: "703.95",
    change: "+28.75",
    changePercent: "4.3",
  },
  {
    logo: "TTK",
    name: "TTK Prestige Ltd.",
    sector: "Consumer Durables",
    ltp: "776.95",
    change: "+29.30",
    changePercent: "3.9",
  },
];

export function TrendingStocks() {
  const [view, setView] = useState("gainers");

  return (
    <div className="bg-white rounded-lg shadow-sm h-[420px] p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-medium text-lg">Trending Stocks</h2>
        <a href="#" className="text-blue-600 hover:underline text-sm">
          View All
        </a>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {categories.map((category) => (
          <button
            key={category}
            className="text-xs py-1 px-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-600">Fri, 24 Jan 2025</span>
        <div className="flex rounded-md border text-xs">
          <button
            className={`px-3 py-1 rounded-l-md ${
              view === "gainers"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
            }`}
            onClick={() => setView("gainers")}
          >
            Gainers
          </button>
          <button
            className={`px-3 py-1 rounded-r-md ${
              view === "losers"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
            }`}
            onClick={() => setView("losers")}
          >
            Losers
          </button>
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100%-7rem)]">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-gray-600">
              <th className="text-left font-medium py-1 sticky top-0 bg-white">
                Stock Name
              </th>
              <th className="text-right font-medium py-1 sticky top-0 bg-white">
                LTP
              </th>
              <th className="text-right font-medium py-1 sticky top-0 bg-white">
                Chg
              </th>
              <th className="text-right font-medium py-1 sticky top-0 bg-white">
                Chg%
              </th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center text-[10px] font-medium">
                      {stock.logo}
                    </div>
                    <div>
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-[10px] text-gray-500">
                        {stock.sector}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-right py-2">{stock.ltp}</td>
                <td className="text-right py-2 text-emerald-600">
                  {stock.change}
                </td>
                <td className="text-right py-2 text-emerald-600">
                  ▲{stock.changePercent}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
