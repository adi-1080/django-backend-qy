import { Route, Routes, Navigate } from 'react-router-dom';
import ChartsHome from './Pages/ChartsHome';
import Home from './Pages/Home';
import IndicesPage from './Pages/IndicesPage';
import MarketHome from './Pages/MarketHome';
import NewsUpdates from './Pages/NewsUpdates/NewsUpdates';
import SuperChartsInnerPage from './Pages/SuperChartsInnerPage';
import Deals from './Pages/Deals/Deals';
import SectorsOuter from './Pages/Sectors/SectorsOuter';
import SectorsInner from './Pages/Sectors/SectorsInner';

function App() {
  return (
    <div>
      <Routes>
        
        <Route path="/" element={<Navigate to='/home'/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/innerChart" element={<SuperChartsInnerPage />} />
        <Route path="/chartHome" element={<ChartsHome />} />
        <Route path="/marketHome" element={<MarketHome />} />
        <Route path="/indices" element={<IndicesPage />} />
        <Route path="/news/*" element={<NewsUpdates />} />
        <Route path="/deals/*" element={<Deals />} />
        <Route path="/sector-overview" element={<SectorsOuter />} />
        <Route path="/sectors/*" element={<SectorsInner />} />
      </Routes>
    </div>
  );
}

export default App;

