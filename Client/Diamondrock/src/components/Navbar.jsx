import React from "react";
import { Search, Bell, Download, Grid3X3, User } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-white border-b z-10 h-14">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <img
          src="https://.publi."
          alt="Diamond-Rock"
          className="h-8"
        />
      </div>

      {/* Center Section */}
      <div className="flex-1 max-w-xl mx-auto relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="search"
          className="pl-10 w-full h-9 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for Stocks, MFs, Scans and more"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        <button className="px-3 py-1 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 text-sm hidden md:block">
          New <span className="ml-1">↓</span>
        </button>
        <span className="hidden md:inline text-sm">Guest User</span>
        <button className="px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 text-sm hidden md:block">
          Subscribe
        </button>
        <Download className="h-5 w-5 text-gray-600 cursor-pointer" />
        <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
        <Grid3X3 className="h-5 w-5 text-gray-600 cursor-pointer" />
        <User className="h-7 w-7 rounded-lg text-gray-600 cursor-pointer" />
      </div>
    </nav>
  );
}
