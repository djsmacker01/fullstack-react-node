import logo from './logo.svg';
// routes
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Users from './pages/Users';
import Login from './pages/Login';
import EditUser from './pages/EditUser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<Users />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users/:id" element={<EditUser />} />
    </Routes>
  );
}

export default App;
