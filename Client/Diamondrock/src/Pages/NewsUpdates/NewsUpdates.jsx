// NewsUpdates.js
import { Clock } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import FIIDII from "./FIIDII";
import FuturesOI from "./FuturesOI";
import Upcoming from "./Upcoming";
import Updates from "./Updates";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";

export default function NewsUpdates() {
  const location = useLocation();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

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
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">News & Updates</h1>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500">Thu, 30 Jan 2025</span>
              </div>
            </div>

            <div className="border-b mb-6">
              <div className="flex space-x-8">
                <TabLink
                  to="/news"
                  label="Updates"
                  active={location.pathname === "/news"}
                />
                <TabLink
                  to="/news/upcoming"
                  label="Upcoming"
                  active={location.pathname === "/news/upcoming"}
                />
                <TabLink
                  to="/news/fii-dii"
                  label="FII/DII"
                  active={location.pathname === "/news/fii-dii"}
                />
                <TabLink
                  to="/news/futures-oi"
                  label="Futures OI"
                  active={location.pathname === "/news/futures-oi"}
                />
              </div>
            </div>

            <Routes>
              <Route index element={<Updates />} />
              <Route path="upcoming" element={<Upcoming />} />
              <Route path="fii-dii" element={<FIIDII />} />
              <Route path="futures-oi" element={<FuturesOI />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

function TabLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`pb-4 px-1 relative ${
        active ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
      )}
    </Link>
  );
}
