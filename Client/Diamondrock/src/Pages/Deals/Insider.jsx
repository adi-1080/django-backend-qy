import React from 'react';

export default function Insider() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th className="px-6 py-3">Name of Person</th>
            <th className="px-6 py-3">Transaction Type</th>
            <th className="px-6 py-3">Stock Name</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">Holding Post Deal</th>
            <th className="px-6 py-3">Deal Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {insiderDeals.map((deal, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div>{deal.name}</div>
                  <div className="text-sm text-gray-500">{deal.designation}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    deal.type === 'Bought' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {deal.type}
                  </span>
                  <div className="text-sm text-gray-500 mt-1">{deal.mode}</div>
                </div>
              </td>
              <td className="px-6 py-4">{deal.stockName}</td>
              <td className="px-6 py-4">
                <div>
                  <div>{deal.quantity.toLocaleString()}</div>
                  {deal.value && (
                    <div className="text-sm text-gray-500">
                      Rs. {deal.value.toLocaleString()}
                      <br />@ {deal.price}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <div>{deal.holdingPost.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">({deal.percentage})</div>
                </div>
              </td>
              <td className="px-6 py-4">{deal.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const insiderDeals = [
  {
    name: "Krish Bhavesh Thakkar",
    designation: "Promoters",
    type: "Sold",
    mode: "Inter Se Transfer",
    stockName: "ADF Foods Ltd.",
    quantity: 10000000,
    holdingPost: 165000,
    percentage: "0.15%",
    date: "31 Jan 2025"
  },
  {
    name: "Prisha Bavesh Thakkar",
    designation: "Promoter Group",
    type: "Bought",
    mode: "Inter Se Transfer",
    stockName: "ADF Foods Ltd.",
    quantity: 10000000,
    holdingPost: 1000000,
    percentage: "0.01%",
    date: "31 Jan 2025"
  },
  {
    name: "Priti Haresh Shah",
    designation: "Promoter Group",
    type: "Bought",
    mode: "Market",
    stockName: "Tokyo Plast International Ltd.",
    quantity: 27,
    value: 3034,
    price: "112.37",
    holdingPost: 987956,
    percentage: "10.48%",
    date: "30 Jan 2025"
  }
];