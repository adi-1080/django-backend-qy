import { Route, Routes, Navigate } from 'react-router-dom';
import ChartsHome from './Pages/ChartsHome';
import Home from './Pages/Home';
import IndicesPage from './Pages/IndicesPage';
import MarketHome from './Pages/MarketHome';
import NewsUpdates from './Pages/NewsUpdates/NewsUpdates';
import SuperChartsInnerPage from './Pages/SuperChartsInnerPage';
import Deals from './Pages/Deals/Deals';
import SectorsOuter from './Pages/Sectors/SectorsOuter';
import SectorsInner from "./Pages/Sectors/SectorsInner"
import StockDetails from './Pages/searchIndustries/StockDetails';
import Delivery from './Pages/searchIndustries/delivery';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to='/home'/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/innerChart/:ticker" element={<SuperChartsInnerPage />} />
        <Route path="/chartHome" element={<ChartsHome />} />
        <Route path="/marketHome" element={<MarketHome />} />
        <Route path="/indices" element={<IndicesPage />} />
        <Route path="/news/*" element={<NewsUpdates />} />
        <Route path="/deals/*" element={<Deals />} />
        <Route path="/sector-overview" element={<SectorsOuter />} />
        <Route path="/sector/*" element={<SectorsInner />} />
        <Route path="/stock" element={<StockDetails />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="*" element={<div>Error 404</div>} />
      </Routes>
    </div>
  );
}

export default App;

