import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductsAndServices from './components/ProductsAndServices';
import ProductDetail from './components/ProductDetail';
import ClassDetail from './components/ClassDetail';
import ClassDetailEdit from './components/ClassDetailEdit';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products-and-services" element={<ProductsAndServices />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/classes" element={<ClassDetail />} />
          <Route path="/class/:id" element={<ClassDetailEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
