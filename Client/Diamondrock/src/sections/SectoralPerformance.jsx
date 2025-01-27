import React from "react";
import { ShoppingCart, Star, Camera, Wifi, Coffee } from "lucide-react";

const sectors = [
  {
    name: "Fast Moving Consumer Goods",
    icon: ShoppingCart,
    mcap: "26,41,674",
    change: "+0.2",
  },
  {
    name: "Ratings",
    icon: Star,
    mcap: "48,351",
    change: "+0.1",
  },
  {
    name: "Photographic Product",
    icon: Camera,
    mcap: "430",
    change: "-0.0",
  },
  {
    name: "Telecom",
    icon: Wifi,
    mcap: "14,06,478",
    change: "-0.1",
  },
  {
    name: "Information Technology",
    icon: Coffee,
    mcap: "50,15,315",
    change: "-0.4",
  },
];

export function SectoralPerformance() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Sectoral Performance</h2>
        <a href="#" className="text-blue-600 hover:underline text-sm">
          View All
        </a>
      </div>
      <div className="text-sm text-gray-600 mb-4">Fri, 24 Jan 2025</div>
      <table className="w-full">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="font-medium text-left pb-2">Sector</th>
            <th className="font-medium text-right pb-2">MCap (Cr.)</th>
            <th className="font-medium text-right pb-2">Chg%</th>
          </tr>
        </thead>
        <tbody>
          {sectors.map((sector) => (
            <tr key={sector.name} className="border-b last:border-b-0">
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <sector.icon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">{sector.name}</span>
                </div>
              </td>
              <td className="py-3 text-right text-sm">{sector.mcap}</td>
              <td
                className={`py-3 text-right text-sm ${
                  sector.change.startsWith("+")
                    ? "text-emerald-500"
                    : sector.change.startsWith("-")
                    ? "text-red-500"
                    : ""
                }`}
              >
                {sector.change.startsWith("+")
                  ? "▲"
                  : sector.change.startsWith("-")
                  ? "▼"
                  : ""}
                {sector.change}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
