import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SuperChartsInnerPage from './Pages/SuperChartsInnerPage';
import ChartsHome from './Pages/ChartsHome';

function App() {
  return (
    <div>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<div>Welcome to the App</div>} />
        <Route path="/home" element={<Home />} />
        <Route path="/innerChart" element={<SuperChartsInnerPage/>} />
        <Route path="/chartHome" element={<ChartsHome/>} />
      </Routes>
    </div>
  );
}

export default App;
