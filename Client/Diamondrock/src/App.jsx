import { Route, Routes } from 'react-router-dom';
import ChartsHome from './Pages/ChartsHome';
import Home from './Pages/Home';
import MarketHome from './Pages/MarketHome';
import SuperChartsInnerPage from './Pages/SuperChartsInnerPage';
import IndicesPage from './Pages/IndicesPage';
import NewsUpdates from './Pages/NewsUpdates/NewsUpdates';
import Updates from './Pages/NewsUpdates/Updates';
import FIIDII from './Pages/NewsUpdates/FIIDII';
import FuturesOI from './Pages/NewsUpdates/FuturesOI';
import Upcoming from './Pages/NewsUpdates/Upcoming';

function App() {
  return (
    <div>
      <Routes>
        {/* Root and main routes */}
        <Route path="/" element={<div>Welcome to the App</div>} />
        <Route path="/home" element={<Home />} />
        <Route path="/innerChart" element={<SuperChartsInnerPage />} />
        <Route path="/chartHome" element={<ChartsHome />} />
        <Route path="/marketHome" element={<MarketHome />} />
        <Route path="/indices" element={<IndicesPage />} />

        {/* News and updates section */}
        <Route path="/newsupdates" element={<NewsUpdates />} />
        <Route path="/news" element={<Updates />} />
        <Route path="/news/upcoming" element={<Upcoming />} />
        <Route path="/news/fii-dii" element={<FIIDII />} />
        <Route path="/news/futures-oi" element={<FuturesOI />} />
      </Routes>
    </div>
  );
}

export default App;