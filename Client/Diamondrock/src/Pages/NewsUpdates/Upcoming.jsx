import React from 'react';
import { Calendar } from 'lucide-react';

export default function Upcoming() {
  const [activeFilter, setActiveFilter] = React.useState('Corp. Actions');
  const [activeType, setActiveType] = React.useState('All');

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-full ${
            activeFilter === 'Corp. Actions' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-500 hover:bg-gray-50'
          }`}
          onClick={() => setActiveFilter('Corp. Actions')}
        >
          Corp. Actions
        </button>
        <button 
          className={`px-4 py-2 rounded-full ${
            activeFilter === 'Events' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-500 hover:bg-gray-50'
          }`}
          onClick={() => setActiveFilter('Events')}
        >
          Events
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        {['All', 'Bonus', 'Dividend', 'Rights', 'Split/Conso'].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg ${
              activeType === type 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
            onClick={() => setActiveType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {upcomingActions.map((action, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                {action.symbol}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{action.company}</h3>
                <p className="text-sm text-gray-500">{action.details}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                {action.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const upcomingActions = [
  {
    company: "Accelya Solutions India Ltd.",
    symbol: "ACCELYA",
    details: "Interim Dividend 500% @ Rs. 50 per share",
    date: "30 Jan 2025"
  },
  {
    company: "Balkrishna Industries Ltd.",
    symbol: "BKT",
    details: "Interim Dividend 200% @ Rs. 4 per share",
    date: "30 Jan 2025"
  },
  {
    company: "Coforge Ltd.",
    symbol: "COFORGE",
    details: "Interim Dividend 190% @ Rs. 19 per share",
    date: "30 Jan 2025"
  },
  {
    company: "Housing & Urban Development Corporation Ltd.",
    symbol: "HUDCO",
    details: "Interim Dividend 20.5% @ Rs. 2.05 per share",
    date: "30 Jan 2025"
  }
];