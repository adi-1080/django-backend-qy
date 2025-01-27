import React from "react";

const indices = [
  {
    index: "Nifty 50",
    advances: 18,
    declines: 31,
    percentage: "0.5",
    total: 49,
  },
  {
    index: "Nifty 500",
    advances: 66,
    declines: 433,
    percentage: "1.0",
    total: 499,
  },
  {
    index: "Nifty Bank",
    advances: 2,
    declines: 10,
    percentage: "0.5",
    total: 12,
  },
];

export function AdvancesDeclines() {
  return (
    <div className="bg-white rounded-lg shadow-sm h-[300px] p-4">
      <h2 className="font-medium text-sm mb-4">Advances/Declines</h2>
      <div className="space-y-4">
        {indices.map((item) => (
          <div key={item.index} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{item.index}</span>
              <span className="text-red-500">▼ {item.percentage}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 rounded-sm bg-gray-100 overflow-hidden">
                <div className="relative w-full h-full">
                  <div
                    className="absolute left-0 h-full bg-emerald-500"
                    style={{
                      width: `${(item.advances / item.total) * 100}%`,
                    }}
                  />
                  <div
                    className="absolute right-0 h-full bg-red-500"
                    style={{
                      width: `${(item.declines / item.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2 text-[10px] tabular-nums min-w-[60px] justify-end">
                <span className="text-emerald-600">▲{item.advances}</span>
                <span className="text-red-500">▼{item.declines}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
