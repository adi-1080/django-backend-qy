import React, { useState } from 'react';
import { Search, ArrowLeft, Share2, ChevronDown, ChevronUp } from 'lucide-react';

const sectorData = [
    {
        name: 'Abrasives',
        icon: '⭕',
        industries: 1,
        stocks: 3,
        mcap: 45091,
        change: -3.5,
        subsectors: []
    },
    {
        name: 'Agriculture',
        icon: '🌱',
        industries: 7,
        stocks: 167,
        mcap: 233972,
        change: -2.0,
        subsectors: [
            {
                name: 'Agriculture',
                stocks: 52,
                mcap: 30437,
                change: -1.0
            },
            {
                name: 'Aquaculture',
                stocks: 8,
                mcap: 1412,
                change: -4.4
            },
            {
                name: 'Floriculture',
                stocks: 3,
                mcap: 229,
                change: -1.9
            },
            {
                name: 'Rubber Products',
                stocks: 18,
                mcap: 8604,
                change: -1.5
            }
        ]
    },
    {
        name: 'Alcohol',
        icon: '🍸',
        industries: 1,
        stocks: 17,
        mcap: 236857,
        change: -1.2,
        subsectors: []
    },
    {
        name: 'Automobile & Ancillaries',
        icon: '🚗',
        industries: 16,
        stocks: 233,
        mcap: 3251304,
        change: -0.7,
        subsectors: []
    },
    {
        name: 'Aviation',
        icon: '✈️',
        industries: 3,
        stocks: 20,
        mcap: 500000,
        change: -2.3,
        subsectors: []
    },
    {
        name: 'Banking',
        icon: '🏦',
        industries: 10,
        stocks: 95,
        mcap: 10000000,
        change: -0.5,
        subsectors: []
    },
    {
        name: 'Capital Goods',
        icon: '🏗️',
        industries: 5,
        stocks: 80,
        mcap: 800000,
        change: -1.1,
        subsectors: []
    },
    {
        name: 'Chemicals',
        icon: '🧪',
        industries: 12,
        stocks: 150,
        mcap: 750000,
        change: -1.8,
        subsectors: []
    },
    {
        name: 'Construction Materials',
        icon: '🚧',
        industries: 8,
        stocks: 120,
        mcap: 600000,
        change: -1.0,
        subsectors: []
    },
    {
        name: 'Consumer Durables',
        icon: '📺',
        industries: 6,
        stocks: 90,
        mcap: 650000,
        change: -0.9,
        subsectors: []
    },
    {
        name: 'Crude Oil',
        icon: '🛢️',
        industries: 4,
        stocks: 35,
        mcap: 300000,
        change: -2.5,
        subsectors: []
    },
    {
        name: 'Diamond & Jewellery',
        icon: '💎',
        industries: 5,
        stocks: 45,
        mcap: 350000,
        change: -1.3,
        subsectors: []
    },
    {
        name: 'Diversified',
        icon: '🔀',
        industries: 7,
        stocks: 60,
        mcap: 500000,
        change: -0.6,
        subsectors: []
    },
    {
        name: 'Electricals',
        icon: '⚡',
        industries: 9,
        stocks: 100,
        mcap: 700000,
        change: -1.4,
        subsectors: []
    },
    {
        name: 'Fast Moving Consumer Goods',
        icon: '🛍️',
        industries: 11,
        stocks: 130,
        mcap: 1200000,
        change: -0.8,
        subsectors: []
    },
    {
        name: 'Ferro Manganese',
        icon: '⛏️',
        industries: 3,
        stocks: 25,
        mcap: 200000,
        change: -2.0,
        subsectors: []
    },
    {
        name: 'Finance',
        icon: '💰',
        industries: 15,
        stocks: 180,
        mcap: 2000000,
        change: -0.4,
        subsectors: []
    },
    {
        name: 'Gas Transformation',
        icon: '🔥',
        industries: 4,
        stocks: 50,
        mcap: 400000,
        change: -1.7,
        subsectors: []
    },
    {
        name: 'Healthcare',
        icon: '🏥',
        industries: 13,
        stocks: 140,
        mcap: 900000,
        change: -0.5,
        subsectors: []
    },
    {
        name: 'Hospitality',
        icon: '🏨',
        industries: 7,
        stocks: 55,
        mcap: 450000,
        change: -1.2,
        subsectors: []
    },
    {
        name: 'Industrial Gases & Fuels',
        icon: '🔋',
        industries: 6,
        stocks: 75,
        mcap: 500000,
        change: -1.6,
        subsectors: []
    },
    {
        name: 'Information and Technology',
        icon: '💻',
        industries: 14,
        stocks: 160,
        mcap: 2500000,
        change: -0.3,
        subsectors: []
    },
    {
        name: 'Infrastructure',
        icon: '🏗️',
        industries: 9,
        stocks: 110,
        mcap: 750000,
        change: -1.1,
        subsectors: []
    },
    {
        name: 'Iron And Steel',
        icon: '🛠️',
        industries: 10,
        stocks: 115,
        mcap: 800000,
        change: -1.9,
        subsectors: []
    },
    {
        name: 'Logistics',
        icon: '🚛',
        industries: 8,
        stocks: 85,
        mcap: 600000,
        change: -0.7,
        subsectors: []
    },
    {
        name: 'Media & Entertainment',
        icon: '🎥',
        industries: 5,
        stocks: 70,
        mcap: 550000,
        change: -1.3,
        subsectors: []
    },
    {
        name: 'Mining',
        icon: '⛏️',
        industries: 7,
        stocks: 65,
        mcap: 480000,
        change: -2.2,
        subsectors: []
    },
    {
        name: 'Miscellaneous',
        icon: '🔄',
        industries: 4,
        stocks: 30,
        mcap: 250000,
        change: -1.0,
        subsectors: []
    },
    {
        name: 'Non-ferrous Metals',
        icon: '🔗',
        industries: 5,
        stocks: 40,
        mcap: 320000,
        change: -1.5,
        subsectors: []
    },
    {
        name: 'Power',
        icon: '⚡',
        industries: 12,
        stocks: 125,
        mcap: 950000,
        change: -0.8,
        subsectors: []
    },
    {
        name: 'Retailing',
        icon: '🛒',
        industries: 6,
        stocks: 90,
        mcap: 700000,
        change: -0.9,
        subsectors: []
    },
    {
        name: 'Telecom',
        icon: '📡',
        industries: 8,
        stocks: 95,
        mcap: 1000000,
        change: -0.6,
        subsectors: []
    },
    {
        name: 'Textile',
        icon: '👕',
        industries: 7,
        stocks: 80,
        mcap: 650000,
        change: -1.0,
        subsectors: []
    }
];


const SectorsOuter = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedSector, setExpandedSector] = useState(null);
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const filteredSectors = sectorData.filter(sector =>
        sector.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-IN').format(num);
    };

    return (
        <div className="max-w-7xl mx-auto bg-white min-h-screen">
            {/* Header */}
            <div className="border-b">
                <div className="flex items-center p-4 gap-4">
                    <button className="text-blue-600">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-medium">Sectors</h1>
                    <div className="ml-auto">
                        <Share2 size={20} className="text-blue-600" />
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for a Sector or Industry"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Date */}
            <div className="px-4 py-2 text-gray-600">
                {currentDate}
            </div>

            {/* Sectors List */}
            <div className="px-4">
                {/* Headers */}
                <div className="grid grid-cols-12 py-3 border-b text-sm font-medium">
                    <div className="col-span-6">Sector</div>
                    <div className="col-span-3 text-right">MCap (Cr.)</div>
                    <div className="col-span-3 text-right">Change%</div>
                </div>

                {/* Sectors */}
                {filteredSectors.map((sector) => (
                    <div key={sector.name}>
                        <div
                            className="grid grid-cols-12 py-4 border-b cursor-pointer hover:bg-gray-50"
                            onClick={() => setExpandedSector(expandedSector === sector.name ? null : sector.name)}
                        >
                            <div className="col-span-6 flex items-center gap-3">
                                <span className="text-xl">{sector.icon}</span>
                                <div>
                                    <div className="font-medium">{sector.name}</div>
                                    <div className="text-sm text-gray-500">
                                        Industries: {sector.industries} | Stocks: {sector.stocks}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3 text-right self-center">
                                {formatNumber(sector.mcap)}
                            </div>
                            <div className={`col-span-2 text-right self-center ${sector.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                ▼ {Math.abs(sector.change)}%
                            </div>
                            <div className="col-span-1 flex justify-end items-center">
                                {expandedSector === sector.name ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>

                        {/* Subsectors */}
                        {expandedSector === sector.name && sector.subsectors.length > 0 && (
                            <div className="bg-gray-50">
                                {sector.subsectors.map((subsector) => (
                                    <div key={subsector.name} className="grid grid-cols-12 py-3 px-4 border-b">
                                        <div className="col-span-6 pl-8">
                                            <div className="font-medium">{subsector.name}</div>
                                            <div className="text-sm text-gray-500">
                                                Stocks: {subsector.stocks}
                                            </div>
                                        </div>
                                        <div className="col-span-3 text-right self-center">
                                            {formatNumber(subsector.mcap)}
                                        </div>
                                        <div className={`col-span-3 text-right self-center ${subsector.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                            ▼ {Math.abs(subsector.change)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectorsOuter;