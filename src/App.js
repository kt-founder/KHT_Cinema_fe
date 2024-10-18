// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRouter from "./Router";


const App = () => {
  return (
      <Router>
          <div className="App">
              <AppRouter/>
          </div>
      </Router>
  );
};

export default App;
