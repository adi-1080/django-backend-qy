import React from "react";
import { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import Bulk from "./Bulk";
import Block from "./Block";
import Insider from "./Insider";
import SAST from "./SAST";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";

export default function Deals() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "bulk";

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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Deals</h1>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b mb-6">
            <div className="flex space-x-8">
              <TabLink
                to="/deals"
                label="Bulk"
                active={currentPath === "deals" || currentPath === "bulk"}
              />
              <TabLink
                to="/deals/block"
                label="Block"
                active={currentPath === "block"}
              />
              <TabLink
                to="/deals/insider"
                label="Insider"
                active={currentPath === "insider"}
              />
              <TabLink
                to="/deals/sast"
                label="SAST"
                active={currentPath === "sast"}
              />
            </div>
          </div>

          {/* Content Area */}
          <Routes>
            <Route index element={<Bulk />} />
            <Route path="block" element={<Block />} />
            <Route path="insider" element={<Insider />} />
            <Route path="sast" element={<SAST />} />
          </Routes>
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
