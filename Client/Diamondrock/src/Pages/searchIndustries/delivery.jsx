import React, { useState } from "react";
import { ArrowLeft, Star, Share2 } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";

const StockDetails = () => {
  const [activeTab, setActiveTab] = useState("deliveries");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [timeframe, setTimeframe] = useState("Daily");
  const [exchange, setExchange] = useState("Both");

  const data = [
    {
      date: "26 Feb",
      deliveredQty: 5200,
      tradedQty: 11500,
      percentage: "45.2%",
      price: "1,15,960.75",
      priceChange: "0.8%",
      priceChangeType: "positive",
    },
    {
      date: "25 Feb",
      deliveredQty: 4900,
      tradedQty: 10800,
      percentage: "45.4%",
      price: "1,15,034.70",
      priceChange: "-0.2%",
      priceChangeType: "negative",
    },
    {
      date: "24 Feb",
      deliveredQty: 5100,
      tradedQty: 12000,
      percentage: "42.5%",
      price: "1,15,264.30",
      priceChange: "0.5%",
      priceChangeType: "positive",
    },
    {
      date: "23 Feb",
      deliveredQty: 4700,
      tradedQty: 11200,
      percentage: "42.0%",
      price: "1,14,689.45",
      priceChange: "-0.3%",
      priceChangeType: "negative",
    },
    {
      date: "22 Feb",
      deliveredQty: 5300,
      tradedQty: 13500,
      percentage: "39.3%",
      price: "1,15,034.50",
      priceChange: "1.2%",
      priceChangeType: "positive",
    },
    {
      date: "21 Feb",
      deliveredQty: 4800,
      tradedQty: 12700,
      percentage: "37.8%",
      price: "1,13,669.50",
      priceChange: "-0.4%",
      priceChangeType: "negative",
    },
    {
      date: "20 Feb",
      deliveredQty: 5500,
      tradedQty: 14200,
      percentage: "38.7%",
      price: "1,14,124.95",
      priceChange: "0.6%",
      priceChangeType: "positive",
    },
    {
      date: "19 Feb",
      deliveredQty: 6200,
      tradedQty: 15500,
      percentage: "40.0%",
      price: "1,13,443.70",
      priceChange: "-0.2%",
      priceChangeType: "negative",
    },
    {
      date: "16 Feb",
      deliveredQty: 5800,
      tradedQty: 13800,
      percentage: "42.0%",
      price: "1,13,671.45",
      priceChange: "0.7%",
      priceChangeType: "positive",
    },
    {
      date: "15 Feb",
      deliveredQty: 5100,
      tradedQty: 12900,
      percentage: "39.5%",
      price: "1,12,877.80",
      priceChange: "-0.5%",
      priceChangeType: "negative",
    },
    {
      date: "14 Feb",
      deliveredQty: 5400,
      tradedQty: 13200,
      percentage: "40.9%",
      price: "1,13,442.90",
      priceChange: "0.9%",
      priceChangeType: "positive",
    },
    {
      date: "13 Feb",
      deliveredQty: 4900,
      tradedQty: 11800,
      percentage: "41.5%",
      price: "1,12,431.55",
      priceChange: "-0.3%",
      priceChangeType: "negative",
    },
    {
      date: "12 Feb",
      deliveredQty: 5200,
      tradedQty: 12500,
      percentage: "41.6%",
      price: "1,12,769.85",
      priceChange: "0.4%",
      priceChangeType: "positive",
    },
    {
      date: "09 Feb",
      deliveredQty: 4800,
      tradedQty: 11900,
      percentage: "40.3%",
      price: "1,12,318.65",
      priceChange: "-0.2%",
      priceChangeType: "negative",
    },
    {
      date: "08 Feb",
      deliveredQty: 5100,
      tradedQty: 12200,
      percentage: "41.8%",
      price: "1,12,543.25",
      priceChange: "0.6%",
      priceChangeType: "positive",
    },
    {
      date: "07 Feb",
      deliveredQty: 4700,
      tradedQty: 11500,
      percentage: "40.9%",
      price: "1,11,869.70",
      priceChange: "-0.4%",
      priceChangeType: "negative",
    },
    {
      date: "06 Feb",
      deliveredQty: 4900,
      tradedQty: 11800,
      percentage: "41.5%",
      price: "1,12,317.35",
      priceChange: "0.5%",
      priceChangeType: "positive",
    },
    {
      date: "05 Feb",
      deliveredQty: 4800,
      tradedQty: 9900,
      percentage: "48.5%",
      price: "1,11,756.75",
      priceChange: "0.0%",
      priceChangeType: "neutral",
    },
    {
      date: "04 Feb",
      deliveredQty: 4200,
      tradedQty: 12150,
      percentage: "34.6%",
      price: "1,11,756.70",
      priceChange: "1.0%",
      priceChangeType: "positive",
    },
    {
      date: "03 Feb",
      deliveredQty: 3600,
      tradedQty: 13250,
      percentage: "27.1%",
      price: "1,10,649.30",
      priceChange: "-0.3%",
      priceChangeType: "negative",
    },
    {
      date: "02 Feb",
      deliveredQty: 3800,
      tradedQty: 13500,
      percentage: "28.1%",
      price: "1,10,981.45",
      priceChange: "0.4%",
      priceChangeType: "positive",
    },
    {
      date: "01 Feb",
      deliveredQty: 3400,
      tradedQty: 13075,
      percentage: "26.0%",
      price: "1,10,538.45",
      priceChange: "0.5%",
      priceChangeType: "positive",
    },
    {
      date: "31 Jan",
      deliveredQty: 5900,
      tradedQty: 14000,
      percentage: "42.1%",
      price: "1,09,987.50",
      priceChange: "0.9%",
      priceChangeType: "positive",
    },
    {
      date: "30 Jan",
      deliveredQty: 4900,
      tradedQty: 13350,
      percentage: "36.7%",
      price: "1,09,007.50",
      priceChange: "0.3%",
      priceChangeType: "positive",
    },
    {
      date: "29 Jan",
      deliveredQty: 6500,
      tradedQty: 17325,
      percentage: "37.5%",
      price: "1,08,680.95",
      priceChange: "-0.5%",
      priceChangeType: "negative",
    },
    {
      date: "28 Jan",
      deliveredQty: 9200,
      tradedQty: 18500,
      percentage: "49.7%",
      price: "1,08,224.70",
      priceChange: "1.5%",
      priceChangeType: "positive",
    },
    {
      date: "27 Jan",
      deliveredQty: 6800,
      tradedQty: 21125,
      percentage: "32.2%",
      price: "1,07,609.45",
      priceChange: "-0.2%",
      priceChangeType: "negative",
    },
  ];

  const tabs = [
    { id: "prices", label: "Prices" },
    { id: "deliveries", label: "Deliveries" },
    { id: "updates", label: "Updates" },
    { id: "edge-report", label: "Edge Report" },
    { id: "technicals", label: "Technicals" },
    { id: "fundamental", label: "Fundamental" },
    { id: "financials", label: "Financials" },
  ];

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
          <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <ArrowLeft className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h1 className="text-lg font-medium">
                        Reliance Industries Ltd.
                      </h1>
                      <span className="text-gray-500 text-sm">
                        NSE: RELIANCE
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">1,278.20</span>
                      <span className="text-red-500 ml-2">-7.00 (-0.5%)</span>
                      <span className="text-gray-500 ml-2">
                        05 Feb 2025, 03:49 PM IST
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-gray-400" />
                  <Share2 className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Tabs Section */}
              <div className="flex space-x-6 px-4 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 text-sm whitespace-nowrap border-b-2 ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6">
              {/* Filters */}
              <div className="flex justify-end gap-2 mb-6">
                <div className="flex">
                  {["Daily", "Weekly", "Monthly"].map((t) => (
                    <button
                      key={t}
                      className={`px-3 py-1 text-m ${
                        timeframe === t ? "bg-white font-medium" : "bg-gray-100"
                      } border ${
                        t === "Weekly" ? "border-l-0 border-r-0" : ""
                      }`}
                      onClick={() => setTimeframe(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex">
                  {["NSE", "BSE", "Both"].map((e) => (
                    <button
                      key={e}
                      className={`px-3 py-1 text-m ${
                        exchange === e ? "bg-white font-medium" : "bg-gray-100"
                      } border ${e === "BSE" ? "border-l-0 border-r-0" : ""}`}
                      onClick={() => setExchange(e)}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center ml-16 gap-6 mb-6 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-[#4A90E2]"></div>
                  <span>Delivered Qty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-[#B1D1F6]"></div>
                  <span>Traded Qty</span>
                </div>
              </div>

              {/* Chart */}
              <div className="relative pl-[4.5rem] pr-32">
                {/* X-axis labels */}
                <div className="flex justify-between text-xs text-gray-600 mb-1 px-1">
                  <span>0</span>
                  <span className="absolute left-1/2 -translate-x-1/2">
                    10,000
                  </span>
                  <span>Price</span>
                </div>

                {/* Chart content */}
                <div className="relative">
                  {/* Y-axis year label */}
                  <div className="absolute -left-[3rem] -top-[1.5rem] text-xs text-[#4A90E2]">
                    2025
                  </div>

                  {/* Vertical and horizontal lines */}
                  <div className="absolute -top-1 left-0 right-0 h-[1px] bg-black "></div>
                  <div className="absolute left-0 -top-4 -bottom-4 w-[1.5px] bg-black"></div>
                  <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-black "></div>

                  {/* Bars */}
                  {data.map((item) => (
                    <div
                      key={item.date}
                      className="flex items-center h-8 relative mb-5"
                    >
                      <div className="absolute -left-[3rem] text-xs text-gray-600">
                        {item.date}
                      </div>
                      <div className="flex-1 h-5 relative">
                        {/* Traded Qty bar */}
                        <div
                          className="absolute left-0 h-7 -top-1 bg-[#B1D1F6]"
                          style={{
                            width: `${(item.tradedQty / 22000) * 100}%`,
                          }}
                        ></div>
                        {/* Delivered Qty bar */}
                        <div
                          className="absolute left-0 top-0 h-full bg-[#4A90E2]"
                          style={{
                            width: `${(item.deliveredQty / 22000) * 100}%`,
                          }}
                        ></div>
                        {/* Percentage */}
                        <span
                          className="absolute top-1/2 -translate-y-1/2 text-xs text-gray-600"
                          style={{
                            left: `calc(${Math.max(
                              (item.tradedQty / 22000) * 100,
                              (item.deliveredQty / 22000) * 100
                            )}% + 10px)`, // Dynamically position right after the largest bar
                          }}
                        >
                          {item.percentage}
                        </span>
                        {/* Price and change */}
                        <div className="absolute -right-32 top-1/2 -translate-y-1/2 text-right">
                          <div className="text-xs font-medium text-gray-800">
                            {item.price}
                          </div>
                          <div
                            className={`text-[10px] ${
                              item.priceChangeType === "positive"
                                ? "text-green-500"
                                : item.priceChangeType === "negative"
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          >
                            {item.priceChange}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StockDetails;
