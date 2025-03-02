import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginationApp from './components/PaginationApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginationApp />} />
        {/* Additional routes can be added here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
