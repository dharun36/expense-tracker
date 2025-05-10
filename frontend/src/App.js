import React from 'react';
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Landing';
import Transaction from './Pages/Tran/Transaction';
import RecentTra from './Pages/Tran/RecentTra';
import TableData from './Pages/Tran/TableData';
import Analytics from './Pages/Tran/Analytics';


const App = () => {
  return (
    
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Transaction />} />
          <Route path="/recent" element={<RecentTra/>} />
          <Route path="/add" element={<TableData />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App