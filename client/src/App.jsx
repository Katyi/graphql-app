import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Authors from './pages/authors/Authors';
import Books from './pages/books/Books';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/authors" element={<Authors />} />
        <Route exact path="/books" element={<Books />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
