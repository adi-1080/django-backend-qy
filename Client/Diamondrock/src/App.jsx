import { Route, Routes } from 'react-router-dom';
import ChartsHome from './Pages/ChartsHome';
import Home from './Pages/Home';
import IndicesPage from './Pages/IndicesPage';
import MarketHome from './Pages/MarketHome';
import NewsUpdates from './Pages/NewsUpdates/NewsUpdates';
import SuperChartsInnerPage from './Pages/SuperChartsInnerPage';

function App() {
  return (
    <div>
      <Routes>
        
        <Route path="/" element={<div>Welcome to the App</div>} />
        <Route path="/home" element={<Home />} />
        <Route path="/innerChart" element={<SuperChartsInnerPage />} />
        <Route path="/chartHome" element={<ChartsHome />} />
        <Route path="/marketHome" element={<MarketHome />} />
        <Route path="/indices" element={<IndicesPage />} />
        <Route path="/news/*" element={<NewsUpdates />} />
      </Routes>
    </div>
  );
}

export default App;

