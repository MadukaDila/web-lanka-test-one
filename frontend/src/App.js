import './App.css';
import Login from './pages/Login';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
