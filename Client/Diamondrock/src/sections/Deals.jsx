import React from "react";

const tabs = ["Bulk", "Block", "Insider", "SAST"];
const deals = [
  {
    investor: "Mukul Aggarwal",
    status: "Sold",
    stock: "C2C Advanced Systems Ltd.",
    quantity: "84,000",
    price: "713.81",
  },
  {
    investor: "Business Excellence Trust Iii",
    status: "Sold",
    stock: "Happy Forgings Ltd.",
    quantity: "39,10,098",
    price: "950.06",
  },
  {
    investor: "SBI MUTUAL FUND",
    status: "Bought",
    stock: "Happy Forgings Ltd.",
    quantity: "35,91,766",
    price: "950.00",
  },
  {
    investor: "Money Logix Securities Pvt Ltd",
    status: "Bought",
    stock: "Valiant Laboratories Ltd.",
    quantity: "5,50,000",
    price: "105.78",
  },
  {
    investor: "JAINAM BROKING LIMITED",
    status: "Sold",
    stock: "Valiant Laboratories Ltd.",
    quantity: "5,50,000",
    price: "105.77",
  },
];

export function Deals() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Deals</h2>
        <a href="#" className="text-blue-600 hover:underline text-sm">
          View All
        </a>
      </div>
      <div className="flex gap-4 border-b mb-4">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`pb-2 text-sm ${
              index === 0
                ? "border-b-2 border-blue-600 font-medium"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="font-medium pb-2">Investor</th>
            <th className="font-medium pb-2">Stock Name</th>
            <th className="font-medium pb-2 text-right">Quantity</th>
            <th className="font-medium pb-2 text-right">Price (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal, index) => (
            <tr key={index} className="border-b last:border-b-0">
              <td className="py-2">
                <div>
                  {deal.investor}
                  <span
                    className={`ml-2 text-xs px-2 py-0.5 rounded ${
                      deal.status === "Bought"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {deal.status}
                  </span>
                </div>
              </td>
              <td className="py-2">{deal.stock}</td>
              <td className="py-2 text-right">{deal.quantity}</td>
              <td className="py-2 text-right">{deal.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
