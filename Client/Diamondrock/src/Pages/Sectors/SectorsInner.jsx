"use client"

import { useState } from "react"
import { ArrowLeft, Share2 } from "lucide-react"
import SectorNews from "./SectorsNews"
import SectorsGainers from "./SectorsGainers"
import SectorsLosers from "./SectorsLosers"

export default function SectorsInner() {
    const [activeMainTab, setActiveMainTab] = useState("news")

    return (
        <div className="min-h-screen bg-white">
            <div className="sticky top-0 z-50 bg-white ">
                <div className="flex items-center px-4 py-3">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="h-5 w-5 text-blue-600" />
                    </button>
                    <h1 className="text-xl ml-2">Sector Name</h1>
                    <button className="p-2 hover:bg-gray-100 rounded-full ml-auto">
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex overflow-x-auto ">
                    {["All Stocks", "Industries", "Gainers", "Losers", "Technicals", "Results","Shareholding", "Breadth","Deliveries","VWAP","News","Events"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-3 text-sm whitespace-nowrap ${activeMainTab === tab.toLowerCase().replace(" ", "-")
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600"
                                }`}
                            onClick={() => setActiveMainTab(tab.toLowerCase().replace(" ", "-"))}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4">
                {activeMainTab === "news" && <SectorNews />}
                {activeMainTab === "gainers" && <SectorsGainers />}
                {activeMainTab === "losers" && <SectorsLosers />}
            </div>
        </div>
    )
}

