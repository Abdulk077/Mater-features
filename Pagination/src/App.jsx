import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginationApp from './components/PaginationApp';
import Serching from './pages/Searching';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pagination" element={<PaginationApp />} />
        <Route path="/search" element={<Serching />} />
        {/* Additional routes can be added here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
