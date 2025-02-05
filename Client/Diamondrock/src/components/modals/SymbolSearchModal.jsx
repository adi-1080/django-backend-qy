import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const SymbolSearchModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    {'all' : "All"},
    {'stock': "Stocks"},
    {'index': "Indices"}
  ];

  const symbols = [
    { "icon": "🌐", "name": "TRENT.NS", "description": "Trent Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "BHARTIARTL.NS", "description": "Bharti Airtel Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "NTPC.NS", "description": "NTPC Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "MARUTI.NS", "description": "Maruti Suzuki India Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "BAJAJ-AUTO.NS", "description": "Bajaj Auto Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "WIPRO.NS", "description": "Wipro Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "HDFCLIFE.NS", "description": "HDFC Life Insurance Company Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "TCS.NS", "description": "Tata Consultancy Services Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "BAJFINANCE.NS", "description": "Bajaj Finance Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "RELIANCE.NS", "description": "Reliance Industries Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "ULTRACEMCO.NS", "description": "UltraTech Cement Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "TATASTEEL.NS", "description": "Tata Steel Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "HEROMOTOCO.NS", "description": "Hero MotoCorp Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "CIPLA.NS", "description": "Cipla Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "KOTAKBANK.NS", "description": "Kotak Mahindra Bank Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "BAJAJFINSV.NS", "description": "Bajaj Finserv Ltd.", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "SHRIRAMFIN.NS", "description": "Shriram Finance Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "ADANIENT.NS", "description": "Adani Enterprises Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "INDUSINDBK.NS", "description": "IndusInd Bank Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "ITC.NS", "description": "ITC Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "LT.NS", "description": "Larsen & Toubro Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "COALINDIA.NS", "description": "Coal India Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "TATACONSUM.NS", "description": "Tata Consumer Products Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "BRITANNIA.NS", "description": "Britannia Industries Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "NESTLEIND.NS", "description": "Nestlé India Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "APOLLOHOSP.NS", "description": "Apollo Hospitals Enterprise Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "HINDALCO.NS", "description": "Hindalco Industries Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "TITAN.NS", "description": "Titan Company Limited", "market": "NSE", "type": "stock" },
    { "icon": "🌐", "name": "ONGC.NS", "description": "Oil and Natural Gas Corporation Limited", "market": "NSE", "type": "stock" }
]


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
              onClick={() => {
                navigate(`/innerChart/${symbol.name}`);
                closeModal();
              }}
              className="flex items-center justify-between p-3 hover:bg-gray-100 border-b cursor-pointer"
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
