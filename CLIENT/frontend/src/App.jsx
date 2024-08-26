
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionsPage from './pages/dynamic/QuestionsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/questions" element={<QuestionsPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
