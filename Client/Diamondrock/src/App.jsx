import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
  return (
    <div>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<div>Welcome to the App</div>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
