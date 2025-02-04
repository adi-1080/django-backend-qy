import { Anchor, Building2, ChevronDown, CircleDot, Droplet, Factory, FileText, Network, Search, ShoppingBag, Truck, Wine } from 'lucide-react';
import React from 'react';
export default function Sectors() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredSectors = sectors.filter(sector =>
    sector.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sectors</h1>
        <div className="text-sm text-gray-500">
          Tue, 04 Feb 2025
        </div>
      </div>

    
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for a Sector or Industry"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-12 px-6 py-3 border-b text-sm text-gray-500">
          <div className="col-span-6">Sector</div>
          <div className="col-span-3 text-right">MCap (Cr.)</div>
          <div className="col-span-2 text-right">Change%</div>
          <div className="col-span-1"></div>
        </div>

        <div className="divide-y">
          {filteredSectors.map((sector, index) => (
            <div key={index} className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50 cursor-pointer">
              <div className="col-span-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg mr-3">
                    {sector.icon}
                  </div>
                  <div>
                    <div className="font-medium">{sector.name}</div>
                    <div className="text-sm text-gray-500">
                      Industries: {sector.industries} | Stocks: {sector.stocks}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-3 text-right self-center">
                {sector.mcap.toLocaleString()}
              </div>
              <div className="col-span-2 text-right self-center">
                <span className={`${sector.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {sector.change > 0 ? '▲' : '▼'}{Math.abs(sector.change)}%
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const sectors = [
  {
    icon: <Factory className="w-5 h-5 text-orange-500" />,
    name: "Ferro Manganese",
    industries: 1,
    stocks: 10,
    mcap: 9106,
    change: 3.0
  },
  {
    icon: <Droplet className="w-5 h-5 text-blue-500" />,
    name: "Crude Oil",
    industries: 3,
    stocks: 29,
    mcap: 2536318,
    change: 3.0
  },
  {
    icon: <Factory className="w-5 h-5 text-orange-500" />,
    name: "Finance",
    industries: 1,
    stocks: 10,
    mcap: 9106,
    change: 3.0
  },
  {
    icon: <FileText className="w-5 h-5 text-gray-500" />,
    name: "Paper",
    industries: 1,
    stocks: 52,
    mcap: 50583,
    change: 2.7
  },
  {
    icon: <Building2 className="w-5 h-5 text-purple-500" />,
    name: "Infrastructure",
    industries: 2,
    stocks: 151,
    mcap: 876908,
    change: 2.9
  },
  {
    icon: <Factory className="w-5 h-5 text-orange-500" />,
    name: "Trading",
    industries: 1,
    stocks: 10,
    mcap: 9106,
    change: 3.0
  },
    {
    icon: <Wine className="w-5 h-5 text-red-500" />,
    name: "Alcohol",
    industries: 1,
    stocks: 17,
    mcap: 235319,
    change: -0.6
  },
  {
    icon: <Anchor className="w-5 h-5 text-blue-500" />,
    name: "Ship Building",
    industries: 1,
    stocks: 6,
    mcap: 145644,
    change: -0.9
  },
  {
    icon: <ShoppingBag className="w-5 h-5 text-purple-500" />,
    name: "Retailing",
    industries: 2,
    stocks: 70,
    mcap: 711393,
    change: -1.5
  },
  {
    icon: <CircleDot className="w-5 h-5 text-orange-500" />,
    name: "Abrasives",
    industries: 1,
    stocks: 3,
    mcap: 44365,
    change: -1.6
  },
  {
    icon: <Network className="w-5 h-5 text-indigo-500" />,
    name: "Diversified",
    industries: 1,
    stocks: 11,
    mcap: 58467,
    change: -2.1
  },
  {
    icon: <FileText className="w-5 h-5 text-gray-500" />,
    name: "Paper",
    industries: 1,
    stocks: 52,
    mcap: 50583,
    change: 2.7
  },
  {
    icon: <Building2 className="w-5 h-5 text-purple-500" />,
    name: "Infrastructure",
    industries: 2,
    stocks: 151,
    mcap: 876908,
    change: 2.9
  },

  {
    icon: <Truck className="w-5 h-5 text-green-500" />,
    name: "Logistics",
    industries: 4,
    stocks: 98,
    mcap: 509158,
    change: 2.8
  },
  {
    icon: <FileText className="w-5 h-5 text-gray-500" />,
    name: "Paper",
    industries: 1,
    stocks: 52,
    mcap: 50583,
    change: 2.7
  },
  {
    icon: <Building2 className="w-5 h-5 text-purple-500" />,
    name: "Infrastructure",
    industries: 2,
    stocks: 151,
    mcap: 876908,
    change: 2.9
  },
  {
    icon: <FileText className="w-5 h-5 text-gray-500" />,
    name: "Information and Technology",
    industries: 1,
    stocks: 52,
    mcap: 50583,
    change: 2.7
  },
];