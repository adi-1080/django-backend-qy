import React, { useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Updates from './Updates';
import Upcoming from './Upcoming';
import FIIDII from './FIIDII';
import FuturesOI from './FuturesOI';

export default function NewsUpdates() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Updates');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">News & Updates</h1>
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-gray-500">Wed, 29 Jan 2025</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-8">
          <TabLink to="/news" label="Updates" active={location.pathname === '/news'} />
          <TabLink to="/news/upcoming" label="Upcoming" active={location.pathname === '/news/upcoming'} />
          <TabLink to="/news/results" label="Results" active={location.pathname === '/news/results'} />
          <TabLink to="/news/fii-dii" label="FII/DII" active={location.pathname === '/news/fii-dii'} />
          <TabLink to="/news/futures-oi" label="Futures OI" active={location.pathname === '/news/futures-oi'} />
          <TabLink to="/news/options-oi" label="Options OI" active={location.pathname === '/news/options-oi'} />
        </div>
      </div>

      {/* Content Area */}
      <Routes>
        <Route index element={<Updates />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="fii-dii" element={<FIIDII />} />
        <Route path="futures-oi" element={<FuturesOI />} />
      </Routes>
    </div>
  );
}

function TabLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`pb-4 px-1 relative ${
        active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
      )}
    </Link>
  );
}