import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:projectId" element={<ProjectDetail />} />
    </Routes>
  );
};

export default App;
