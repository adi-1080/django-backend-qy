import { Navbar2 } from '../components/trading/Navbar2';
import { ChevronRight, ChevronLeft, LineChart, LayoutGrid, Code } from "lucide-react";
import { useRef } from 'react';
import CountrySelector from '../components/CountrySelector';

const ChartsHome = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Adjust scroll step
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const indices = [
    { id: "500", name: "S&P 500", value: "6,101.25", change: "-0.29%", color: "bg-red-500" },
    { id: "100", name: "Nasdaq 100", value: "21,774.01", change: "-0.58%", color: "bg-blue-500" },
    { id: "30", name: "Dow 30", value: "44,424.26", change: "-0.32%", color: "bg-blue-600" },
    { id: "2000", name: "US 2000 Small Cap", value: "2,286.854", change: "-1.02%", color: "bg-purple-800" },
    { id: "600", name: "Russell 600", value: "1,500.654", change: "+0.75%", color: "bg-green-500" },
    { id: "50", name: "Nifty 50", value: "19,800.125", change: "-0.15%", color: "bg-yellow-500" },
  ];

  const worldIndices = [
    { id: "225", name: "NI225", desc: "Japan 225 Index", value: "39,565.58", currency: "JPY", change: "-0.92%", color: "bg-blue-600" },
    { id: "100", name: "UKX", desc: "FTSE 100 Index", value: "8,476.98", currency: "GBP", change: "-0.30%", color: "bg-red-500" },
    { id: "DAX", name: "DAX", desc: "DAX Index", value: "21,143.10", currency: "EUR", change: "-1.18%", color: "bg-blue-500" },
    { id: "40", name: "PX1", desc: "CAC 40 Index", value: "7,864.10", currency: "EUR", change: "-0.80%", color: "bg-green-500" },
    { id: "FTMIB", name: "FTMIB", desc: "Milano Italia Borsa Index", value: "36,162.32", currency: "EUR", change: "-0.11%", color: "bg-purple-700" },
    { id: "40", name: "PX1", desc: "CAC 40 Index", value: "7,864.10", currency: "EUR", change: "-0.80%", color: "bg-green-500" },
    { id: "40", name: "PX1", desc: "CAC 40 Index", value: "7,864.10", currency: "EUR", change: "-0.80%", color: "bg-green-500" },
  ];

  const highVol = [
    { name: "NVIDIA Corporation", ticker: "NVDA", price: "127.11", change: "-10.88%", color: "text-red-500" },
    { name: "Meta Platforms, Inc.", ticker: "META", price: "638.08", change: "-1.45%", color: "text-red-500" },
    { name: "MicroStrategy Inc.", ticker: "MSTR", price: "344.51", change: "-2.59%", color: "text-red-500" },
    { name: "Microsoft Corporation", ticker: "MSFT", price: "425.44", change: "-4.19%", color: "text-red-500" },
    { name: "Apple Inc.", ticker: "AAPL", price: "226.80", change: "+1.80%", color: "text-green-500" },
  ];

  const mostVol = [
    { name: "Neuphoria Therapeutics", ticker: "NEUP", price: "3.95", change: "-10.02%", color: "text-red-500" },
    { name: "Next Technology Holdings", ticker: "NXTT", price: "1.45", change: "+3.57%", color: "text-green-500" },
    { name: "Canoo Inc.", ticker: "GOEV", price: "0.4250", change: "-10.53%", color: "text-red-500" },
    { name: "Nvni Group Limited", ticker: "NVNI", price: "3.43", change: "-22.05%", color: "text-red-500" },
    { name: "Allurion Technologies", ticker: "ALUR", price: "7.35", change: "-15.42%", color: "text-red-500" },
    { name: "Carbon Revolution", ticker: "CREV", price: "3.62", change: "-19.20%", color: "text-red-500" },
  ];
  const gainers = [
    { name: "Planet Image International Limited", ticker: "YIBO", price: 5.14, change: "+66.88%" },
    { name: "Diginex Limited", ticker: "DGNX", price: 14.99, change: "+59.13%" },
    { name: "Haoxi Health Technology Limited", ticker: "HAO", price: 3.70, change: "+47.41%" },
    { name: "TransCode Therapeutics, Inc.", ticker: "T", price: 9.94, change: "+45.53%" },
  ];

  const losers = [
    { name: "MiNK Therapeutics, Inc.", ticker: "INKT", price: 5.51, change: "-93.77%" },
    { name: "Revelation Biosciences, Inc.", ticker: "REVB", price: 4.24, change: "-93.05%" },
    { name: "SAB Biotherapeutics, Inc.", ticker: "SABS", price: 2.07, change: "-52.52%" },
    { name: "JetBlue Airways Corporation", ticker: "JBLU", price: 6.01, change: "-25.71%" },
  ];

  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <Navbar2 />
      <div className='flex justify-center items-center h-[65vh] pb-20'>
        <CountrySelector/>
      </div>
      <div className="p-6 bg-white">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-3xl font-bold">Indices</h1>
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </div>

        {/* Index Cards with Scrollable Feature */}
        <div className="relative">
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
          >
            <ChevronLeft className="text-gray-700" />
          </button>

          <div 
            ref={scrollRef} 
            className="flex gap-20 overflow-x-auto scroll-smooth no-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {indices.map((index) => (
              <div key={index.id} className="min-w-[300px] flex items-center hover:bg-gray-100 rounded-[100px] py-3 text-sm px-2 mb-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${index.color}`}>
                  {index.id}
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 font-medium">{index.name}</p>
                  <p className="text-black text-lg font-bold">
                    {index.value} <span className="text-xs text-gray-400">USD</span>
                  </p>
                </div>
                <p className={`ml-4 text-sm ${index.change.includes('-') ? 'text-red-500' : 'text-green-500'}`}>
                  {index.change}
                </p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
          >
            <ChevronRight className="text-gray-700" />
          </button>
        </div>

        {/* Placeholder for the Graph */}
        <div className="mt-8 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Graph will go here</p>
        </div>

        <div className='flex justify-between'>
          {/* Timeframe Selection */}
          <div className="mt-6 flex gap-4">
            {["1D", "1M", "3M", "1Y", "5Y", "All"].map((time) => (
              <button
                key={time}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  time === "1D"
                    ? "bg-gray-200 text-black font-bold"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          {/* Bottom Action Buttons */}
          <div className="mt-4 flex gap-4">
            <button className="p-2 bg-gray-100 rounded-lg">
              <Code className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg">
              <LineChart className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg">
              <LayoutGrid className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className='p-6 bg-white'>
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-2xl font-semibold">World Indices</h1>
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </div>

        <div className="relative">
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10">
            <ChevronLeft className="text-gray-700" />
          </button>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar">
            {worldIndices.map((index) => (
              <div key={index.id} className="min-w-[280px] flex flex-col bg-white shadow-lg rounded-lg p-5 border mb-5 hover:bg-slate-100">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-lg font-bold ${index.color}`}>
                    {index.id}
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">{index.name}</p>
                    <p className="text-gray-400 text-sm">{index.desc}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-black text-xl font-bold">
                    {index.value} <span className="text-sm text-gray-400">{index.currency}</span>
                  </p>
                  <p className={`text-md font-medium ${index.change.includes('-') ? 'text-red-500' : 'text-green-500'}`}>
                    {index.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10">
            <ChevronRight className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* High Volume Stocks Section */}
      <div className='p-6 bg-white'>
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-2xl font-semibold">High Volume Stocks</h1>
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highVol.map((stock, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
              <div>
                <h3 className="text-lg font-bold">{stock.name}</h3>
                <p className="text-gray-500">{stock.ticker}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{stock.price} USD</p>
                <p className={`${stock.color} text-sm font-semibold`}>{stock.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most Volatile Stocks Section */}
      <div className='p-6 bg-white'>
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-2xl font-semibold">Most Volatile Stocks</h1>
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostVol.map((stock, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
              <div>
                <h3 className="text-lg font-bold">{stock.name}</h3>
                <p className="text-gray-500">{stock.ticker}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{stock.price} USD</p>
                <p className={`${stock.color} text-sm font-semibold`}>{stock.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Stock gainers and loosers section*/ }
      <div className="flex justify-center p-6 bg-gray-100">
      <div className="grid grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Stock Gainers */}
        <div>
          <h2 className="text-xl font-bold text-blue-600">Stock Gainers</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {gainers.map((stock, index) => (
              <div key={index} className="flex justify-between p-2 border-b last:border-none">
                <div>
                  <h3 className="font-semibold">{stock.name}</h3>
                  <span className="text-gray-500 text-sm">{stock.ticker}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">{stock.price} USD</p>
                  <p className="text-green-500 font-semibold">{stock.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Losers */}
        <div>
          <h2 className="text-xl font-bold text-red-600">Stock Losers</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {losers.map((stock, index) => (
              <div key={index} className="flex justify-between p-2 border-b last:border-none">
                <div>
                  <h3 className="font-semibold">{stock.name}</h3>
                  <span className="text-gray-500 text-sm">{stock.ticker}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">{stock.price} USD</p>
                  <p className="text-red-500 font-semibold">{stock.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChartsHome;