import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DynamicCategoryPage from './pages/dynamic/DynamicCategoryPage';
import DynamicCalculationPage from './pages/dynamic/DynamicCalculationPage';
import HomePage from "./pages/HomePage"; // Assuming this is your homepage component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page Route */}
        {/* Dynamic Category Route */}
        <Route path="/category/:category" element={<DynamicCategoryPage />} />
        {/* Dynamic Calculation Route */}
        <Route path="/category/:category/calculations" element={<DynamicCalculationPage />} />

      </Routes>
    </Router>
  );
};

export default App;
