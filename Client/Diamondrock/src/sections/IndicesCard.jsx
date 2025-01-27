import React from "react"
import { LineChart } from "./LineChart"

const mockData = {
  chartData: [46400, 46500, 46600, 46700, 46600, 46500, 46400, 46367],
  timeLabels: ["10 AM", "11 AM", "12 PM", "01 PM", "02 PM", "03 PM", "04 PM", "04:14 PM"],
}

export function IndicesCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm h-[300px] p-4">
      <div className="mb-4">
        <div className="flex gap-4">
          <button className="text-sm font-medium pb-1 text-gray-500">Nifty 50</button>
          <button className="text-sm font-medium pb-1 text-gray-500">Nifty 500</button>
          <button className="text-sm font-medium pb-1 border-b-2 border-blue-600">Nifty Bank</button>
        </div>
      </div>
      <div className="h-[220px]">
        <LineChart data={mockData.chartData} labels={mockData.timeLabels} />
      </div>
    </div>
  )
}

