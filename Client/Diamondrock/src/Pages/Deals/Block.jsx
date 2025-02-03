import React from 'react';

export default function Block() {
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
          {blockDeals.map((deal, index) => (
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

const blockDeals = [
  {
    investor: "Bnp Paribas Financial Markets",
    stockName: "PNB Housing Finance Ltd.",
    exchange: "BSE",
    quantity: 118440,
    price: 862.40,
    type: "Bought",
    flag: true
  },
  {
    investor: "COPTHALL MAURITIUS INVESTMENT LTD",
    stockName: "PNB Housing Finance Ltd.",
    exchange: "BSE",
    quantity: 118440,
    price: 862.40,
    type: "Sold",
    flag: true
  }
];