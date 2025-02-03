import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import Bulk from './Bulk';
import Block from './Block';
import Insider from './Insider';
import SAST from './SAST';

export default function Deals() {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'bulk';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Deals</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-8">
          <TabLink 
            to="/deals" 
            label="Bulk" 
            active={currentPath === 'deals' || currentPath === 'bulk'} 
          />
          <TabLink 
            to="/deals/block" 
            label="Block" 
            active={currentPath === 'block'} 
          />
          <TabLink 
            to="/deals/insider" 
            label="Insider" 
            active={currentPath === 'insider'} 
          />
          <TabLink 
            to="/deals/sast" 
            label="SAST" 
            active={currentPath === 'sast'} 
          />
        </div>
      </div>

      {/* Content Area */}
      <Routes>
        <Route index element={<Bulk />} />
        <Route path="block" element={<Block />} />
        <Route path="insider" element={<Insider />} />
        <Route path="sast" element={<SAST />} />
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