import React from "react";
import { BarChart } from "../components/charts/BarChart";

const mockData = {
  barData: [-50, 60, -30, 40, -20, 30, -40, 50, -25],
  barLabels: ["14", "15", "16", "17", "20", "21", "22", "23", "24"],
};

export function NiftyCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm h-[300px] p-4 flex flex-col">
      <div className="mb-4">
        <div className="flex gap-4">
          <button className="text-sm font-medium pb-1 border-b-2 border-blue-600">
            NIFTY
          </button>
          <button className="text-sm font-medium pb-1 text-gray-500">
            SENSEX
          </button>
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-semibold">23,092.20</div>
            <div className="text-red-500 text-sm">(-113.15)</div>
          </div>
          <div className="text-xs text-gray-500">24 Jan 2025</div>
        </div>
        <div className="h-[100px] my-4">
          <BarChart data={mockData.barData} labels={mockData.barLabels} />
        </div>
        <div>
          <div className="text-sm font-medium">FII Cash</div>
          <div className="flex items-baseline gap-2">
            <span className="text-red-500 text-lg font-semibold">
              -2,758.49
            </span>
            <span className="text-xs text-gray-500">Cr.</span>
          </div>
          <div className="text-xs text-gray-500">24 Jan 2025</div>
        </div>
      </div>
    </div>
  );
}
