import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Success from './components/success';
import Failed from './components/failed';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failed" element={<Failed />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;