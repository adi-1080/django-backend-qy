import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SuperChartsInnerPage from './Pages/SuperChartsInnerPage';
import ChartsHome from './Pages/ChartsHome';
import MarketHome from './Pages/MarketHome';

function App() {
  return (
    <div>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<div>Welcome to the App</div>} />
        <Route path="/home" element={<Home />} />
        <Route path="/innerChart" element={<SuperChartsInnerPage/>} />
        <Route path="/chartHome" element={<ChartsHome/>} />
        <Route path="/marketHome" element={<MarketHome/>} />

      </Routes>
    </div>
  );
}

export default App;
