import React from "react";

const tabs = ["Ongoing", "Upcoming", "Listed"];

const ipos = [
  {
    logo: "DW",
    name: "Denta Water And Infra Solutions Ltd.",
    dates: "22 Jan 2025- 24 Jan 2025",
    price: "279.00-294.00",
    lotSize: "50",
    issueSize: "146.48 - 154.35",
    subscribed: "221.52",
  },
  {
    logo: "CN",
    name: "CapitalNumbers Infotech Ltd.",
    dates: "20 Jan 2025- 22 Jan 2025",
    price: "250.00-263.00",
    lotSize: "400",
    issueSize: "115.19 - 121.18",
    subscribed: "125.04",
    tag: "SME",
  },
];

export function IPOListing() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">IPO Listing</h2>
        <a href="#" className="text-blue-600 hover:underline text-sm">
          View All
        </a>
      </div>
      <div className="flex gap-4 border-b mb-4">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`pb-2 text-sm ${
              index === 0
                ? "border-b-2 border-blue-600 font-medium"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {ipos.map((ipo) => (
          <div key={ipo.name} className="p-4 border rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">
                {ipo.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-medium">{ipo.name}</h3>
                  {ipo.tag && (
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {ipo.tag}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-600">{ipo.dates}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-600 mb-1">
                  Offer Price (Rs.)
                </div>
                <div className="text-sm">{ipo.price}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Lot Size</div>
                <div className="text-sm">{ipo.lotSize}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">
                  Issue Size (Rs. Cr.)
                </div>
                <div className="text-sm">{ipo.issueSize}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Subscribed</div>
                <div className="text-sm">{ipo.subscribed} times</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
