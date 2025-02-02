import React, { useState } from "react";
import searchIcon from "../assets/icons/search.png";
import coverImg from "../assets/images/cover.png";
import upIcon from "../assets/icons/upmark.png";
import graphIcon from "../assets/icons/graph.png";
import NavMain from "../components/NavMain";

const Home = () => {
  const [position, setPosition] = useState(0); // Track slide position

  // List of sliding buttons (total 9 buttons)
  const buttons = [
    "Trending Stocks",
    "FII/DII Activity",
    "Portfolio Analytics",
    "Market Insights",
    "Sector Trends",
    "Top Gainers",
    "Top Losers",
    "Mutual Funds",
    "IPO Updates",
  ];

  const visibleCount = 3; // Number of buttons visible at a time

  // Handle Next Slide
  const nextSlide = () => {
    if (position < buttons.length - visibleCount) {
      setPosition(position + 1);
    }
  };

  // Handle Previous Slide
  const prevSlide = () => {
    if (position > 0) {
      setPosition(position - 1);
    }
  };

  const topGainers = [
    { name: "Tata Teleservices (Maharashtra) Ltd.", price: "79.35", change: "+11.7%", changeClass: "text-green-600" },
    { name: "Kotak Mahindra Bank Ltd.", price: "1915.00", change: "+8.9%", changeClass: "text-green-600" },
    { name: "Kalyan Jewellers India Ltd.", price: "544.90", change: "+8.7%", changeClass: "text-green-600" },
    { name: "Vodafone Idea Ltd.", price: "9.85", change: "+8.1%", changeClass: "text-green-600" },
    { name: "Wipro Ltd.", price: "301.10", change: "+6.8%", changeClass: "text-green-600" },
  ];

  const topLosers = [
    { name: "BLS International Services Ltd.", price: "452.70", change: "-9.8%", changeClass: "text-red-600" },
    { name: "Sterling and Wilson Renewable Energy Ltd.", price: "389.20", change: "-5.5%", changeClass: "text-red-600" },
    { name: "Swan Energy Ltd.", price: "652.40", change: "-4.8%", changeClass: "text-red-600" },
    { name: "KFin Technologies Ltd.", price: "1160.15", change: "-3.9%", changeClass: "text-red-600" },
    { name: "Netweb Technologies India Ltd.", price: "2253.30", change: "-3.6%", changeClass: "text-red-600" },
  ];

  return (
    <div className="flex flex-col bg-slate-100">
    <NavMain/>
      
      <div className="flex justify-between items-center h-[100vh] px-28">
        <div className="flex flex-col gap-8 w-[50%]">
          <div className="flex flex-col">
            <p className="font-bold text-blue-700 text-4xl">Become a Sharper</p>
            <p className="font-bold text-5xl">Investor and Trader</p>
            <p className="mt-5 w-[80%]">
              Discover investing & trading opportunities with India's trusted Stock market Research and Analytics App
            </p>
          </div>
          <div className="bg-white flex justify-between items-center w-[75%] p-1 rounded-[40px] border-2 border-solid border-gray-300">
            <input
              placeholder="Search for Stocks, MFs, Scans and more"
              type="text"
              className="w-[80%] p-4 rounded-3xl outline-none"
            />
            <button className="w-[50px] h-[50px] rounded-full bg-blue-600 flex justify-center items-center mx-2">
              <img src={searchIcon} className="w-[35px] h-[35px]" alt="Search" />
            </button>
          </div>

          <div className="p-2 font-semibold text-gray-600">Popular at StockEdge</div>

          {/* Sliding Button Carousel */}
          <div className="relative w-[80%]">
            {/* Carousel Container */}
            <div className="flex overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${position * (100 / visibleCount)}%)`,
                  width: `${(100 * buttons.length) / visibleCount}%`,
                }}
              >
                {buttons.map((button, index) => (
                  <div
                    key={index}
                    className="flex"
                    style={{
                      width: `200px`,
                      display: "flex",
                      justifyContent: "flex-start", // Align buttons to the left
                      paddingRight: "10px", // Gap between buttons
                    }}
                  >
                    <button className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg border border-blue-300">
                      {button}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-start mt-4 gap-4">
              <button
                onClick={prevSlide}
                disabled={position === 0}
                className={`text-blue-400 bg-white px-4 text-2xl py-1 border-2 boder-solid border-blue-400 rounded-2xl ${
                  position === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                &#8592;
              </button>
              <button
                onClick={nextSlide}
                disabled={position === buttons.length - visibleCount}
                className={`text-blue-500 bg-white px-4 text-2xl py-1 border-2 boder-solid border-blue-400 rounded-2xl ${
                  position === buttons.length - visibleCount ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                &#8594;
              </button>
            </div>
          </div>

        </div>
        <div className="w-[50%] rounded-3xl">
          <img src={coverImg} className="rounded-3xl"/>
        </div>
      </div>


      <div className="bg-white flex flex-col w-full py-20 gap-20 px-28">
        <div className="flex flex-col gap-2 ">
            <p className="text-center text-4xl font-bold">Explore Diamondrock Analytics</p>
            <p className="text-gray-700 text-center">Get Advanced data, analysis and tools to discover most profitable opportunities in Stocks and Mutual Funds</p>
        </div>
        <div className="flex flex-col gap-4">
            
            <p className="text-2xl font-bold">Indices</p>
            <div className="flex gap-4 mb-10">
                <div className="border shadow w-1/4 h-[160px] p-3 flex flex-col justify-between rounded-3xl relative hover:bg-slate-100">
                  <p className="text-lg font-semibold">Nifty 50</p>
                  <p className="text-sm">20 January 2025, 11:08:59am</p>

                  <div className="flex justify-between border-t-[1px] border-solid border-gray-700">
                    <p className="text-base font-semibold">29873.20</p>
                    <p className="font-semibold text-green-600">+70.00 (0.5%)</p>
                  </div>

                  <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center absolute top-3 right-4">
                      <img src={upIcon} className="w-[30px]"/>
                  </div>
                </div>

                <div className="border shadow w-1/4 h-[160px] p-3 flex flex-col justify-between rounded-3xl relative hover:bg-slate-100">
                  <p className="text-lg font-semibold">Nifty 50</p>
                  <p className="text-sm">20 January 2025, 11:08:59am</p>

                  <div className="flex justify-between border-t-[1px] border-solid border-gray-700">
                    <p className="text-base font-semibold">29873.20</p>
                    <p className="font-semibold text-green-600">+70.00 (0.5%)</p>
                  </div>

                  <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center absolute top-3 right-4">
                      <img src={upIcon} className="w-[30px]"/>
                  </div>
                </div>

                <div className="border shadow w-1/4 h-[160px] p-3 flex flex-col justify-between rounded-3xl relative hover:bg-slate-100">
                  <p className="text-lg font-semibold">Nifty 50</p>
                  <p className="text-sm">20 January 2025, 11:08:59am</p>

                  <div className="flex justify-between border-t-[1px] border-solid border-gray-700">
                    <p className="text-base font-semibold">29873.20</p>
                    <p className="font-semibold text-green-600">+70.00 (0.5%)</p>
                  </div>

                  <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center absolute top-3 right-4">
                      <img src={upIcon} className="w-[30px]"/>
                  </div>
                </div>

                <div className="border shadow w-1/4 h-[160px] p-3 flex flex-col justify-between rounded-3xl relative hover:bg-slate-100">
                  <p className="text-lg font-semibold">Nifty 50</p>
                  <p className="text-sm">20 January 2025, 11:08:59am</p>

                  <div className="flex justify-between border-t-[1px] border-solid border-gray-700">
                    <p className="text-base font-semibold">29873.20</p>
                    <p className="font-semibold text-green-600">+70.00 (0.5%)</p>
                  </div>

                  <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center absolute top-3 right-4">
                      <img src={upIcon} className="w-[30px]"/>
                  </div>
                </div>
                
              
            </div>

            <div className="p-0">
              <h2 className="text-2xl font-bold mb-4">Trending Stocks</h2>
              <div className="grid grid-cols-2 gap-8">
                {/* Top Gainers */}
                <div className="border rounded-lg shadow p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Top Gainers</h3>
                    <a href="#" className="text-blue-600 text-sm font-semibold">View all</a>
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-500 text-sm mb-2">
                      <span>Company</span>
                      <div className="flex gap-8">
                        <span>Price</span>
                        <span>% Chg</span>
                      </div>
                    </div>
                    {topGainers.map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-t py-5 hover:bg-slate-100">
                        <span className="text-md font-semibold">{item.name}</span>
                        <div className="flex gap-8 items-center">
                          <span className="text-sm font-semibold">{item.price}</span>
                          <span className={`text-sm font-semibold ${item.changeClass}`}>{item.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Losers */}
                <div className="border rounded-lg shadow p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Top Losers</h3>
                    <a href="#" className="text-blue-600 text-sm font-semibold">View all</a>
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-500 text-sm mb-2">
                      <span>Company</span>
                      <div className="flex gap-8">
                        <span>Price</span>
                        <span>% Chg</span>
                      </div>
                    </div>
                    {topLosers.map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-t py-5 hover:bg-slate-100">
                        <span className="text-md font-semibold">{item.name}</span>
                        <div className="flex gap-8 items-center">
                          <span className="text-sm font-semibold">{item.price}</span>
                          <span className={`text-sm font-semibold ${item.changeClass}`}>{item.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10">
              {/* Popular Scans Section */}
              <div className="mb-10">
                <h2 className="text-xl font-bold mb-4">Popular Scans</h2>
                <div className="flex gap-6">
                  <div className="w-1/4 p-3 flex flex-col justify-between h-[100px] border rounded-lg shadow-md bg-white relative hover:bg-slate-100">
                    <div className="font-medium text-lg mb-2">Closing Above Previous High</div>
                    <div className="text-sm text-gray-600 border-t-[1px] border-gray-400">Total Stocks: 115</div>
                    <img src={graphIcon} className="absolute top-3 right-3 h-[30px] w-[30px]"/>
                  </div>
                  <div className="w-1/4 p-3 flex flex-col justify-between h-[100px] border rounded-lg shadow-md bg-white relative hover:bg-slate-100">
                    <div className="font-medium text-lg mb-2">Higher Delivery Quantity</div>
                    <div className="text-sm text-gray-600 border-t-[1px] border-gray-400">Total Stocks: 38</div>
                    <img src={graphIcon} className="absolute top-3 right-3 h-[30px] w-[30px]"/>
                  </div>
                  <div className="w-1/4 p-3 flex flex-col justify-between h-[100px] border rounded-lg shadow-md bg-white relative hover:bg-slate-100">
                    <div className="font-medium text-lg mb-2">High Delivery Percentage</div>
                    <div className="text-sm text-gray-600 border-t-[1px] border-gray-400">Total Stocks: 7</div>
                    <img src={graphIcon} className="absolute top-3 right-3 h-[30px] w-[30px]"/>
                  </div>
                  <div className="w-1/4 p-3 flex flex-col justify-between h-[100px] border rounded-lg shadow-md bg-white relative hover:bg-slate-100">
                    <div className="font-medium text-lg mb-2">Increase in FII Shareholding</div>
                    <div className="text-sm text-gray-600 border-t-[1px] border-gray-400">Total Stocks: 260</div>
                    <img src={graphIcon} className="absolute top-3 right-3 h-[30px] w-[30px]"/>
                  </div>
                </div>
              </div>

              {/* Edge Insights Section */}
              <div className="pt-10">
                <h2 className="text-xl font-bold mb-4">Edge Insights</h2>
                <div className="flex gap-6">
                  <div className="w-1/3 p-4 border rounded-lg shadow-md bg-white hover:bg-slate-100">
                    <div className="flex justify-between border-b-[1px] border-gray-400 pb-3 mb-4">
                      <div className="flex flex-col">
                        <div className="text-lg font-semibold">HDFC Bank Ltd.</div>
                        <div className="text-sm text-gray-600">M-Cap: 1251799.81 Cr.</div>  
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold">29873.20</p>
                        <p className="text-sm font-semibold text-green-600">0.5%</p> 
                      </div>
                    </div>
                    <div className="text-base font-semibold mb-2">RSI entering Oversold zone</div>
                    <div className="text-sm text-gray-500">
                      Stock's Relative Strength Index (RSI) crossed below 30, entering the oversold zone.
                    </div>
                    <div className="border-t-[1px] border-blue-400 flex mt-10">
                      <button className="text-blue-400 hover:font-semibold w-1/2 border-r-[1px] border-blue-400">All Scans in Stock</button>
                      <button className="text-blue-400 hover:font-semibold w-1/2">RSI Scans</button>
                    </div>
                  </div>
                  <div className="w-1/3 p-4 border rounded-lg shadow-md bg-white hover:bg-slate-100">
                  <div className="flex justify-between border-b-[1px] border-gray-400 pb-3 mb-4">
                      <div className="flex flex-col">
                        <div className="text-lg font-semibold">Axis Bank Ltd.</div>
                        <div className="text-sm text-gray-600">M-Cap: 1251799.81 Cr.</div>  
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold">29873.20</p>
                        <p className="text-sm font-semibold text-green-600">0.5%</p> 
                      </div>
                    </div>
                    <div className="text-base font-semibold mb-2">RSI entering Oversold zone</div>
                    <div className="text-sm text-gray-500">
                      Stock's Relative Strength Index (RSI) crossed below 30, entering the oversold zone.
                    </div>
                    <div className="border-t-[1px] border-blue-400 flex mt-10">
                      <button className="text-blue-400 hover:font-semibold w-1/2 border-r-[1px] border-blue-400">All Scans in Stock</button>
                      <button className="text-blue-400 hover:font-semibold w-1/2">RSI Scans</button>
                    </div>
                  </div>
                  <div className="w-1/3 p-4 border rounded-lg shadow-md bg-white hover:bg-slate-100">
                    
                  <div className="flex justify-between border-b-[1px] border-gray-400 pb-3 mb-4">
                      <div className="flex flex-col">
                        <div className="text-lg font-semibold">Infosys Ltd.</div>
                        <div className="text-sm text-gray-600">M-Cap: 1251799.81 Cr.</div>  
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold">29873.20</p>
                        <p className="text-sm font-semibold text-green-600">0.5%</p> 
                      </div>
                    </div>
                    <div className="text-base font-semibold mb-2">Crossing Last Week Low</div>
                    <div className="text-sm text-gray-500">
                      Stock closed at Rs. 1815.45 crossing its previous Week Low of Rs. 1888.75 by -3.88%
                    </div>
                    <div className="border-t-[1px] border-blue-400 flex mt-10">
                      <button className="text-blue-400 hover:font-semibold w-1/2 border-r-[1px] border-blue-400">All Scans in Stock</button>
                      <button className="text-blue-400 hover:font-semibold w-1/2">RSI Scans</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
