import React from 'react';

export default function SAST() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Stock Name</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">% Holding</th>
            <th className="px-6 py-3">Deal Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sastDeals.map((deal, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div>{deal.name}</div>
                  <div className="text-sm text-gray-500">{deal.category}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  deal.type === 'Acquisition' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {deal.type}
                </span>
              </td>
              <td className="px-6 py-4">{deal.stockName}</td>
              <td className="px-6 py-4">{deal.shares.toLocaleString()}</td>
              <td className="px-6 py-4">{deal.percentage}</td>
              <td className="px-6 py-4">{deal.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const sastDeals = [
  {
    name: "Plutus Wealth Management LLP",
    category: "Acquirer",
    type: "Acquisition",
    stockName: "Authum Investment and Infrastructure Ltd.",
    shares: 1150000,
    percentage: "7.02%",
    date: "31 Jan 2025"
  },
  {
    name: "Authum Investment and Infrastructure Limited",
    category: "Target Company",
    type: "Disposal",
    stockName: "Authum Investment and Infrastructure Ltd.",
    shares: 1150000,
    percentage: "7.02%",
    date: "31 Jan 2025"
  }
];