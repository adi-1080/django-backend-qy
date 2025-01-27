import React from "react";

const activities = [
  { name: "FII CM (Pr.)", value: -2758.49, color: "red" },
  { name: "DII CM (Pr.)", value: 2402.31, color: "green" },
  { name: "FII Idx Fut", value: 303.22, color: "green" },
  { name: "FII Idx Opt", value: -12745.12, color: "red" },
  { name: "FII Stk Fut", value: 188.33, color: "green" },
  { name: "FII Stk Opt", value: 332.2, color: "green" },
];

const indices = [
  {
    name: "NIFTY",
    value: "23,092.20",
    change: "-113.15",
    changePercent: "0.5",
  },
  {
    name: "INDIA VIX",
    value: "16.75",
    change: "+0.05",
    changePercent: "0.3",
    positive: true,
  },
  {
    name: "SENSEX",
    value: "76,190.46",
    change: "-329.92",
    changePercent: "0.4",
  },
];

export function FIIDIIActivity() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">FII/DII Activity</h2>
        <a href="#" className="text-blue-600 hover:underline text-sm">
          View All
        </a>
      </div>
      <div className="text-sm text-gray-600 mb-4">Fri, 24 Jan 2025</div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm font-medium">
          <span>Net Buy/(Sell)</span>
          <span>(Rs. Crores)</span>
        </div>
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-24 text-sm">{activity.name}</div>
            <div className="flex-1 h-6 bg-gray-100 rounded relative">
              <div
                className={`absolute top-0 ${
                  activity.value < 0 ? "right-1/2" : "left-1/2"
                } bottom-0 ${
                  activity.value < 0 ? "bg-red-500" : "bg-emerald-500"
                }`}
                style={{
                  width: `${Math.min(Math.abs(activity.value) / 150, 50)}%`,
                }}
              />
            </div>
            <div
              className={`w-24 text-right text-sm ${
                activity.value < 0 ? "text-red-500" : "text-emerald-500"
              }`}
            >
              {activity.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
        {indices.map((index) => (
          <div key={index.name}>
            <div className="text-sm font-medium">{index.name}</div>
            <div className="text-lg font-semibold">{index.value}</div>
            <div
              className={`text-sm ${
                index.positive ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {index.change} ({index.changePercent}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
