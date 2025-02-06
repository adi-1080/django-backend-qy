import React, { useState } from "react";
import { ArrowLeft, Star, Share2, Ruler } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { FiCopy, FiFileText } from "react-icons/fi";
import { RiFileTextLine } from "react-icons/ri";
const earningsData = [
  {
    date: "16 Jan 2025",
    quarter: "Q3 FY25",
    id: 1,
  },
  {
    date: "14 Oct 2024",
    quarter: "Q2 FY25",
    id: 2,
  },
  {
    date: "19 Jul 2024",
    quarter: "Q1 FY25",
    id: 3,
  },
  {
    date: "22 Apr 2024",
    quarter: "Q4 FY24",
    id: 4,
  },
  {
    date: "19 Jan 2024",
    quarter: "Q3 FY24",
    id: 5,
  },
  {
    date: "27 Oct 2023",
    quarter: "Q2 FY24",
    id: 6,
  },
  {
    date: "27 Oct 2023",
    quarter: "Q2 FY24",
    id: 7,
  },
  {
    date: "27 Oct 2023",
    quarter: "Q2 FY24",
    id: 8,
  },
  {
    date: "27 Oct 2023",
    quarter: "Q2 FY24",
    id: 9,
  },
  {
    date: "27 Oct 2023",
    quarter: "Q2 FY24",
    id: 10,
  },
  {
    date: "27 Oct 2023",
    quarter: "Q2 FY24",
    id: 11,
  },
];
const Diamondreport = () => {
  const [activeTab, setActiveTab] = useState("diamond-report");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  

  const tabs = [
    { id: "prices", label: "Prices" },
    { id: "deliveries", label: "Deliveries" },
    { id: "updates", label: "Updates" },
    { id: "diamond-report", label: "Diamond Report" },
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

            {/* Main Section */}
            <div className="max-w-full mx-auto">
              <div className="space-y">
                {earningsData.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex bg-white gap-3 items-center px-5 py-3 hover:bg-gray-100 transition-colors">
                      <div className="h-10 w-10 bg-[#E41B93] flex items-center justify-center">
                        <RiFileTextLine className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] text-gray-600 mb-0.5">
                          {item.date}
                        </div>
                        <div className="text-[15px] text-gray-900 font-medium mb-0.5">
                          Reliance Industries Limited - Earnings Call{" "}
                          {item.quarter}
                        </div>
                        <div className="text-[13px] text-gray-500">
                          Concall Analysis
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-gray-200 rounded transition-colors">
                          <FiCopy className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-red-500 hover:bg-gray-200 rounded transition-colors">
                          <FiFileText className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    {index !== earningsData.length - 1 && (
                      <hr className="border-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Diamondreport;
