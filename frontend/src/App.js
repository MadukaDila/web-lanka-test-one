import './App.css';
import Login from './pages/Login';
import Registation from "./pages/Register";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />} />
          <Route element={<Register/>} to="/Register" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
