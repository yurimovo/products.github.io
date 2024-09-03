import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from './pages/main/Main';
import Products from './pages/products/Products';
import ProductDetails from './pages/products/product-details/ProductDetails';
import NewProduct from './pages/products/new-product/NewProduct';
import ProductEdit from './pages/products/product-edit/ProductEdit';

import './main-container.scss';

function App() {
  return (
    <div className="App">
      <div className='template-container'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path='/create-product' element={<NewProduct />} />
          <Route path='/products/:id/edit' element={<ProductEdit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
