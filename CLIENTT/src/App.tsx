// // CLIENT/src/App.tsx

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import StationaryCombustion from './pages/dynamic/StationaryCombustion';
// import  HomePage from "./pages/HomePage"

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/stationary-combustion" element={<StationaryCombustion />} />
//         {/* Add other routes here */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;






import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DynamicCategoryPage from './pages/dynamic/DynamicCategoryPage';
import HomePage from "./pages/HomePage"; // Assuming this is your homepage component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page Route */}
        {/* Dynamic Category Route */}
        <Route path="/category/:category" element={<DynamicCategoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
