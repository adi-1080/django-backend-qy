import React from "react";

const tabs = ["Corporate Actions", "Upcoming Results", "Release"];
const events = [
  {
    date: "Mon, 27 Jan 2025",
    type: "Dividend",
    logo: "KEI",
    company: "KEI Industries Ltd.",
    details: "Interim Dividend 200% @ Rs. 4 per share",
  },
  {
    date: "Mon, 27 Jan 2025",
    type: "Dividend",
    logo: "PGI",
    company: "POWERGRID Infrastructure Investment Trust",
    details: "Dividend",
  },
  {
    date: "Mon, 27 Jan 2025",
    type: "Bonus",
    logo: "SPP",
    company: "Shraddha Prime Projects Ltd.",
    details: "Bonus 1:1",
  },
  {
    date: "Mon, 27 Jan 2025",
    type: "Dividend",
    logo: "TPL",
    company: "Tanla Platforms Ltd.",
    details: "Interim Dividend 600% @ Rs. 6 per share",
  },
];

export function MarketEvents() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Market Events</h2>
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
        {events.map((event, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
              {event.logo}
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{event.company}</span>
                <span className="text-xs text-gray-600">{event.type}</span>
              </div>
              <div className="text-xs text-gray-600">{event.details}</div>
              <div className="text-xs text-gray-500 mt-1">{event.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
