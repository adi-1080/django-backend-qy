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
    title: "Wipro Limited secured Multi-Million-Dollar Deal by Etihad Airways for IT Transformation and Cost Optimization",
    sector: "IT - Software",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Praj Industries reported total income of Rs 866.79 crores, up by 3.47% (YoY) & profit of Rs 41.10 crores, up by 41.62% (YoY) in Q3 FY 2025",
    sector: "Engineering - Industrial Equipments",
    time: "3 hours ago",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Navin Fluorine International Limited reported total revenue of Rs 616.68 crores, up by 20.43% (YoY) & net profit of Rs 83.60 crores, up by 7.15% (YoY) in Q3 FY 2025",
    sector: "Chemicals",
    time: "4 hours ago",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];