import React from "react";
import {
  BarChart2,
  TrendingUp,
  LineChart,
  Newspaper,
  Briefcase,
  PieChart,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  Menu,
} from "lucide-react";

const menuItems = [
  { icon: BarChart2, label: "Market Home", active: true },
  { icon: TrendingUp, label: "Indices" },
  { icon: LineChart, label: "Trending Stocks" },
  { icon: Newspaper, label: "News & Updates" },
  { icon: Briefcase, label: "Deals" },
  { icon: PieChart, label: "FII / DII Activity" },
  { icon: Building2, label: "Sectors" },
  { icon: Users, label: "IPO" },
  { icon: Users, label: "Investors" },
  { icon: Building2, label: "SME Zone" },
  { icon: GraduationCap, label: "Learn" },
  { icon: BookOpen, label: "Investment Cases" },
];

const analyticsItems = [
  { icon: Menu, label: "" },
  { icon: LineChart, label: "Market" },
  { icon: BarChart2, label: "Analytics" },
  { icon: PieChart, label: "My SE" },
  { icon: Newspaper, label: "Notes" },
];

export function Sidebar() {
  return (
    <div className="fixed top-14 left-2 bottom-0 flex">
      <div className="flex flex-col items-center py-4 bg-gray w-18">
        {analyticsItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center mb-4 p-2 w-full hover:bg-gray-100 text-gray-600"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[12px]">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="w-60 bg-gray-50 border-r flex rounded-lg my-2 flex-col">
        <div>
          <div className="px-4 py-3 border-b">
            <h2 className="font-medium  text-center">Market</h2>
          </div>
          <div className="px-2 py-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-2 px-2 py-3 text-sm rounded-lg text-gray-700 hover:bg-gray-100 ${
                  item.active ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm">Dark Mode</span>
            <div className="w-10 h-5 bg-gray-200 rounded-full relative">
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
