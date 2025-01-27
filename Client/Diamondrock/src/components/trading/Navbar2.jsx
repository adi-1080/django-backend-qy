import { Search, User } from "lucide-react";

export function Navbar2() {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-white border-b z-10 h-14">
      {/* Left Section */}
      <div className="flex items-center gap-4 font-bold text-2xl">
        <p>Diamond-Rock</p>
      </div>

      {/* Center Section */}
      <div className="flex-1 max-w-xl mx-auto relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <input
          type="search"
          className="pl-10 w-full h-9 rounded-2xl border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for Stocks, MFs, Scans and more"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
         <User className="h-7 w-7 rounded-lg text-gray-600 cursor-pointer" />
         <button className="py-2 px-4 bg-gradient-to-bl from-violet-500 to-fuchsia-500 text-white rounded-md">Get Started</button>
      </div>
    </nav>
  );
}