import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login'
import Listagem from './components/llist/List';
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/listagem" element={<Listagem />} />
      </Routes>
    </Router>
  );
};

export default App;