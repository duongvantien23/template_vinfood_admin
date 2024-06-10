import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/layouts/navbar";
import "./utils/main";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.hideNavbar ? route.element : <div><Navbar />{route.element}</div>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
