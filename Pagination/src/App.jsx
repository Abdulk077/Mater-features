import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginationApp from './components/PaginationApp';
import Serching from './pages/Searching';
import Payment from './pages/Payment';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pagination" element={<PaginationApp />} />
        <Route path="/search" element={<Serching />} />
        <Route path="/payment" element={<Payment />} />
        {/* Additional routes can be added here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
