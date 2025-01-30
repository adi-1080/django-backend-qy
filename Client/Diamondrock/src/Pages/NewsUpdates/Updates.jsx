import React from 'react';
import { Newspaper } from 'lucide-react';

export default function Updates() {
  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full">News</button>
        <button className="px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-full">Announcements</button>
      </div>

      <div className="space-y-6">
        {newsUpdates.map((news, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-medium mb-2">{news.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{news.sector}</p>
                <div className="flex items-center text-xs text-gray-400">
                  <Newspaper className="w-4 h-4 mr-1" />
                  <span>{news.time}</span>
                </div>
              </div>
              {news.image && (
                <img src={news.image} alt={news.title} className="w-24 h-24 object-cover rounded-lg" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const newsUpdates = [
  {
    title: "Ministry of Corporate Affairs has approved incorporation of Wholly Owned Subsidiary of Dharmaj Crop Guard Limited in the name of DCGL Industries Limited",
    sector: "Pesticides & Agrochemicals",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Azad Engineering Limited has signed a Contract & Price Agreement with Siemens Energy Global GmbH & Co. KG, for manufacturing and supply of mission critical components",
    sector: "Engineering - Industrial Equipments",
    time: "3 hours ago",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Tata Motors Limited reported total income of Rs 115,365 crores, up by 2.93% (YoY) & profit of Rs 5,578 crores, down by 21.93% (YoY) in Q3 FY 2025",
    sector: "Automobiles-Trucks/Lcv",
    time: "4 hours ago",
    image: "https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];