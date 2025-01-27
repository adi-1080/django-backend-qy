import React from "react";

const trendingItems = [
  {
    logo: "CYI",
    company: "Cyient Ltd.",
    news: "has made a new 52-W low today with LTP at 1344.90",
  },
  {
    logo: "SOB",
    company: "Sobha Ltd.",
    news: "has made a new 52-W low today with LTP at 1136.50",
  },
  {
    logo: "CEL",
    company: "Cello World Ltd.",
    news: "has made a new all-time low with LTP at 644.90",
  },
  {
    logo: "TAT",
    company: "Tata Technologies Ltd.",
    news: "has made a new all-time low with LTP at 782.90",
  },
  {
    logo: "CAP",
    company: "Capri Global Capital Ltd.",
    news: "today's Volume is 101.28 times higher than last 5 days average Volume",
  },
];

export function TrendingNow() {
  return (
    <div className="bg-white rounded-lg shadow-sm h-[420px] p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-lg">Trending Now</h2>
        <a href="#" className="text-blue-600 hover:underline text-sm">
          View All
        </a>
      </div>
      <div className="space-y-3 overflow-y-auto h-[calc(100%-2rem)]">
        {trendingItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center text-xs font-medium">
              {item.logo}
            </div>
            <p className="text-xs leading-tight">
              <span className="font-medium">{item.company}</span> {item.news}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
