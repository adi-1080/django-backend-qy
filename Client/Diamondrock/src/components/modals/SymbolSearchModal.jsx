import React, { useState } from "react";
import { X } from "lucide-react";

const SymbolSearchModal = ({ closeModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    {'all' : "All"},
    {'stock': "Stocks"},
    {'index': "Indices"}
  ];

  const symbols = [
    { icon: "🌐", name: "RELIANCE", description: "RELIANCE INDUSTRIES LTD", market: "NSE", type: "stock" },
    { icon: "🌐", name: "RELIANCE", description: "RELIANCE INDUSTRIES LTD.", market: "BSE", type: "stock" },
    { icon: "🔋", name: "RPOWER", description: "RELIANCE POWER LTD.", market: "NSE", type: "index" },
    { icon: "🏗️", name: "RELINFRA", description: "RELIANCE INFRASTRUCTURE LTD", market: "NSE", type: "stock" },
    { icon: "🏦", name: "RELI", description: "RELIANCE GLOBAL GROUP, INC.", market: "NASDAQ", type: "stock" },
    { icon: "🏦", name: "RELIW", description: "RELIANCE GLOBAL GROUP, INC. - SERIES A", market: "NASDAQ", type: "index" },
    // Add more sample data...
  ];

  const filteredSymbols = symbols.filter(
    (symbol) =>
      (activeFilter === "all" || symbol.type.toLowerCase() === activeFilter.toLowerCase()) &&
      symbol.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]" style={{ backdropFilter: "blur(5px)", margin: 0 }}>
      <div className="bg-white rounded-lg w-[700px] p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Symbol Search</h2>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(Object.keys(filter)[0])}
              className={`px-3 py-1 rounded-lg ${
                activeFilter === Object.keys(filter)[0]
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {Object.values(filter)[0]}
            </button>
          ))}
        </div>

        {/* Symbol List */}
        <div className="mt-4 max-h-96 overflow-y-auto scroll-custom">
          {filteredSymbols.map((symbol, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-100 border-b"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{symbol.icon}</span>
                <div>
                  <p className="font-semibold">{symbol.name}</p>
                  <p className="text-sm text-gray-500">{symbol.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs text-gray-500">{symbol.type}</div>
                <div className="text-sm text-gray-500">{symbol.market}</div>
              </div>
            </div>
          ))}
          {filteredSymbols.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymbolSearchModal;
