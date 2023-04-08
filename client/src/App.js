import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home/Home';
import Practice from './pages/Practice/Practice';
import Kombat from './pages/Kombat/Kombat';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path='/'
              element={<Home />}
            />
            <Route 
              path='/practice'
              element={<Practice />}
            />
            <Route 
              path='/kombat'
              element={<Kombat />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
