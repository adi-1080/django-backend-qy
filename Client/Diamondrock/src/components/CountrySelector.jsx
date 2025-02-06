import React from 'react';
import { Button } from "../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog";
import { Input } from "../components/ui/Input";
import { Search } from "lucide-react";

const CountrySelector = () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedCountry, setSelectedCountry] = React.useState(null);
  
    const countries = [
      { name: "United States", flag: "🇺🇸", exchanges: ["NYSE", "NASDAQ"] },
      { name: "United Kingdom", flag: "🇬🇧", exchanges: ["LSE"] },
      { name: "Japan", flag: "🇯🇵", exchanges: ["TSE"] },
      { name: "Germany", flag: "🇩🇪", exchanges: ["FWB"] },
      { name: "China", flag: "🇨🇳", exchanges: ["SSE", "SZSE"] },
      { name: "India", flag: "🇮🇳", exchanges: ["BSE", "NSE"] },
      { name: "France", flag: "🇫🇷", exchanges: ["Euronext Paris"] },
      { name: "Canada", flag: "🇨🇦", exchanges: ["TSX"] },
      { name: "Australia", flag: "🇦🇺", exchanges: ["ASX"] },
      { name: "Brazil", flag: "🇧🇷", exchanges: ["B3"] },
      {}
    ];
  
    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-6xl font-semibold text-gray-800 h-auto p-8 hover:bg-transparent">
            Markets, everywhere
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white shadow-lg border rounded-lg w-full max-w-2xl">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl font-bold">Select Market</DialogTitle>
          </DialogHeader>
          
          <div className="relative mb-4 mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search countries..."
              className="pl-10 border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
  
          <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto p-1">
            {filteredCountries.map((country) => (
              <button
                key={country.name}
                onClick={() => setSelectedCountry(country)}
                className={`p-4 rounded-lg border transition-all ${
                  selectedCountry?.name === country.name
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div className="text-left">
                    <p className="font-semibold">{country.name}</p>
                    <p className="text-sm text-gray-500">
                      {country.exchanges.join(", ")}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default CountrySelector;