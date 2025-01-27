import React, { useState } from "react";
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
  { id: "market-home", icon: BarChart2, label: "Market Home", path: "/" },
  { id: "indices", icon: TrendingUp, label: "Indices", path: "/indices" },
  {
    id: "trending-stocks",
    icon: LineChart,
    label: "Trending Stocks",
    path: "/trending-stocks",
  },
  {
    id: "news-updates",
    icon: Newspaper,
    label: "News & Updates",
    path: "/news",
  },
  { id: "deals", icon: Briefcase, label: "Deals", path: "/deals" },
  {
    id: "fii-dii",
    icon: PieChart,
    label: "FII / DII Activity",
    path: "/fii-dii",
  },
  { id: "sectors", icon: Building2, label: "Sectors", path: "/sectors" },
  { id: "ipo", icon: Users, label: "IPO", path: "/ipo" },
  { id: "investors", icon: Users, label: "Investors", path: "/investors" },
  { id: "sme", icon: Building2, label: "SME Zone", path: "/sme" },
  { id: "learn", icon: GraduationCap, label: "Learn", path: "/learn" },
  {
    id: "investment",
    icon: BookOpen,
    label: "Investment Cases",
    path: "/investment",
  },
];

const analyticsItems = [
  { id: "menu", icon: Menu, label: "" },
  { id: "market", icon: LineChart, label: "Market", path: "/market" },
  { id: "analytics", icon: BarChart2, label: "Analytics", path: "/analytics" },
  { id: "my-se", icon: PieChart, label: "My SE", path: "/my-se" },
  { id: "notes", icon: Newspaper, label: "Notes", path: "/notes" },
];

export function Sidebar({ isExpanded, onToggle }) {
  // Store active menu item in state
  const [activeMenuItem, setActiveMenuItem] = useState("market-home");
  const [activeAnalyticItem, setActiveAnalyticItem] = useState(null);

  const handleMenuClick = (itemId, path) => {
    setActiveMenuItem(itemId);
    setActiveAnalyticItem(null);
    // Here you would typically use a router to navigate
    // For now, we'll just update the active state
    console.log(`Navigating to: ${path}`);
  };

  const handleAnalyticClick = (itemId, path) => {
    if (itemId === "menu") {
      onToggle();
      return;
    }
    setActiveAnalyticItem(itemId);
    setActiveMenuItem(null);
    console.log(`Navigating to: ${path}`);
  };

  return (
    <div className="fixed top-14 left-2 bottom-0 flex">
      <div className="flex flex-col items-center py-4 bg-gray w-18">
        {analyticsItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center mb-4 p-2 w-full hover:bg-gray-200 text-gray-600 transition-colors
              ${activeAnalyticItem === item.id ? "bg-gray-200" : ""}
            `}
            onClick={() => handleAnalyticClick(item.id, item.path)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[12px]">{item.label}</span>
          </button>
        ))}
      </div>
      <div
        className={`bg-gray-50 border-r flex rounded-lg my-2 flex-col transition-all duration-300 ${
          isExpanded ? "w-60" : "w-0 overflow-hidden"
        }`}
      >
        <div>
          <div className="px-4 py-3 border-b">
            <h2 className="font-medium text-center">Market</h2>
          </div>
          <div className="px-2 py-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.path)}
                className={`flex items-center gap-2 px-2 py-3 text-sm rounded-lg text-gray-700 hover:bg-gray-200 w-full transition-colors
                  ${
                    activeMenuItem === item.id
                      ? "bg-gray-200 text-blue-600"
                      : ""
                  }
                `}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
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
