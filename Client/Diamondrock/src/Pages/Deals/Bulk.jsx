import React from 'react';

export default function Bulk() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th className="px-6 py-3">Investor</th>
            <th className="px-6 py-3">Stock Name</th>
            <th className="px-6 py-3">Exch</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">Price (Rs.)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bulkDeals.map((deal, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {deal.flag && (
                    <span className="w-4 h-4 mr-2 text-red-500">🚩</span>
                  )}
                  <span>{deal.investor}</span>
                </div>
              </td>
              <td className="px-6 py-4">{deal.stockName}</td>
              <td className="px-6 py-4">{deal.exchange}</td>
              <td className="px-6 py-4">{deal.quantity.toLocaleString()}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <span>{deal.price.toFixed(2)}</span>
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    deal.type === 'Bought' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {deal.type}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const bulkDeals = [
  {
    investor: "AMAZON.COM NV INVESTMENT HOLDINGS LLC",
    stockName: "Quess Corp Ltd.",
    exchange: "BSE",
    quantity: 754437,
    price: 610.20,
    type: "Sold",
    flag: true
  },
  {
    investor: "Alia Commosales LLP",
    stockName: "Aayush Wellness Ltd.",
    exchange: "BSE",
    quantity: 344959,
    price: 60.74,
    type: "Sold",
    flag: false
  },
  {
    investor: "C LEELA BAI",
    stockName: "Cupid Breweries And Distilleries Ltd.",
    exchange: "BSE",
    quantity: 13200,
    price: 110.10,
    type: "Sold",
    flag: false
  },
  {
    investor: "DHANKALASH DISTRIBUTORS PRIVATE LIMITED",
    stockName: "Cupid Breweries And Distilleries Ltd.",
    exchange: "BSE",
    quantity: 11149,
    price: 110.10,
    type: "Bought",
    flag: false
  }
];