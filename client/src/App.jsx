import './App.css';
import {Routes , Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Nice from './pages/Nice';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nice" element={<Nice />} />
      </Routes>
    </>
  );
}

export default App;
