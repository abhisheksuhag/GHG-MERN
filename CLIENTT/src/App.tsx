// CLIENT/src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StationaryCombustion from './pages/dynamic/StationaryCombustion';
import  HomePage from "./pages/HomePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stationary-combustion" element={<StationaryCombustion />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
