import React, { useState} from 'react'
import IndividualCompanyMap from '../components/IndividualCompanyMap'
import WatchlistPanel from '../components/WatchlistPanel';
import { Menu, Search, BarChart2, Grid, Bell, Undo, RotateCcw, Save, Eye, Plus, MoreHorizontal, Maximize2, Camera } from 'lucide-react';
import { Move, LineChart, BarChart3, Network, Settings, Edit, SmilePlus, Ruler, Magnet, Pencil, Lock, Trash } from 'lucide-react';
import { SquareMenu, Clock, Layers, MessageSquare, Target, Calendar, Users2, HelpCircle } from 'lucide-react';
import '../superchartsFonts.css'

function SuperChartsInnerPage() {
  const [isWatchlistPanelOpen, setIsWatchlistPanelOpen] = useState(false);
  const SidebarIcon = ({ icon }) => {
    return (
      <div className="flex items-center justify-center h-10 w-10 w-[rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-all duration-200">
        {icon}
      </div>
    );
  };
  return (
    <div className="h-[100vh] flex flex-col gap-1 bg-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between w-full bg-white border-b border-gray-200 px-2 font-thin text-sm" style={{ height: "7%" }}>
          {/* Left Section */}
          <div className="flex items-center space-x-2">
            <button className="relative p-1 hover:bg-gray-100 rounded-lg">
              <Menu size={25} />
              <span className="absolute top-0 -right-1 bg-red-500 border-2 border-white text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
            </button>
            
            <button className="flex items-center rounded-lg font-bold hover:bg-gray-100 px-2">
              <Search size={16} />
              RELIANCE
            </button>
            
            <button className="border border-black hover:bg-gray-100 rounded-lg" style={{ borderRadius: '50%', padding: '0.1rem' }}>
              <Plus size={14}/>
            </button>
            
            <div className="flex items-center space-x-1 px-2">
              <span>5m</span>
            </div>
          </div>

          {/* Center Section */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <BarChart2 size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Grid size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Undo size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <RotateCcw size={20} />
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <button className="flex items-center px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Save size={16} className="mr-1" />
                <span>Save</span>
              </button>
            </div>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Camera size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Eye size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Maximize2 size={20} />
            </button>
          </div>
        </div>

      {/* Main Content */}
      <div className="flex flex-1 gap-1 bg-gray-200" style={{ height: "93%" }}>
        {/* Left Sidebar */}
        <aside className="w-12 bg-white border-r border-white items-center flex flex-col py-2 rounded-tr-md">
          <SidebarIcon icon={<Move size={20} />} />
          <SidebarIcon icon={<LineChart size={20} />} />
          <SidebarIcon icon={<BarChart3 size={20} />} />
          <SidebarIcon icon={<Network size={20} />} />
          <SidebarIcon icon={<Settings size={20} />} />
          <SidebarIcon icon={<Edit size={20} />} />
          <SidebarIcon icon={<SmilePlus size={20} />} />
          <SidebarIcon icon={<Ruler size={20} />} />
          <SidebarIcon icon={<Plus size={20} />} />
          <SidebarIcon icon={<Magnet size={20} />} />
          <SidebarIcon icon={<Pencil size={20} />} />
          <SidebarIcon icon={<Lock size={20} />} />
          <SidebarIcon icon={<Eye size={20} />} />
          <SidebarIcon icon={<Trash size={20} />} />
        </aside>

        {/* Chart Section */}
        <main className="flex-1 flex flex-col gap-1 bg-gray-200">
          {/* Chart */}
          <div className="flex-1 p-0 crafty-guy" style={{ height: "90%" }}>
            <IndividualCompanyMap />
          </div>

          {/* Footer options */}
          <div className="bg-white px-4 flex items-center rounded-md" style={{height: "10%"}}>
            <div className="flex gap-4">
              <button className="hover:bg-gray-100 p-2">Overview</button>
              <button className="hover:bg-gray-100 p-2">Performance</button>
              <button className="hover:bg-gray-100 p-2">Strategy Tester</button>
              <button className="hover:bg-gray-100 p-2">Trading Panel</button>
            </div>
          </div>
        </main>
        
        {/* Right Sidebar */}
        <aside className="bg-white border-r rounded-tl border-white flex">
          <div style={{ ...(isWatchlistPanelOpen ? { display: 'none' } : {}) }}>
            <WatchlistPanel />
          </div>
          <aside className={`w-12 bg-white border-l-2 flex-col ${isWatchlistPanelOpen ? 'rounded-tl':''} items-center py-2`}>
          <SidebarIcon icon={<SquareMenu size={30} onClick={()=>{setIsWatchlistPanelOpen(!isWatchlistPanelOpen)}}/>}/>
          <SidebarIcon icon={<Clock size={20} />} />
          <SidebarIcon icon={<Layers size={20} />} />
          <SidebarIcon icon={<MessageSquare size={20} />} />
          <SidebarIcon icon={<Ruler size={20} />} />
          <SidebarIcon icon={<Target size={20} />} />
          <SidebarIcon icon={<Calendar size={20} />} />
          <SidebarIcon icon={<Users2 size={20} />} />
          <SidebarIcon icon={<Bell size={20} />} />
          <SidebarIcon icon={<HelpCircle size={20} />} />
          </aside>
        </aside>
      </div>
    </div>
  );
}

export default SuperChartsInnerPage