import React, { useState, useEffect } from 'react';
import { getAllProductsAndServices } from '../api/directus';
import { useNavigate } from 'react-router-dom';
import './ProductsAndServices.css';

const ProductsAndServices = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProductsAndServices(currentPage, itemsPerPage);
      setItems(data);
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowClick = (id) => {
    navigate(`/product/${id}`);
  };

  const renderField = (field) => {
    if (typeof field === 'object' && field !== null) {
      return JSON.stringify(field);
    }
    return field || 'No information provided';
  };

  return (
    <div className="products-and-services">
      <h1>Products and Services</h1>
      <table>
        <thead>
          <tr>
            <th>Base Code</th>
            <th>Name (Armenian)</th>
            <th>Class</th>
            <th>User Created</th>
            <th>Date Updated</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <tr key={index} onClick={() => handleRowClick(item.id)} style={{ cursor: 'pointer' }}>
                <td>{renderField(item.base_code)}</td>
                <td>{renderField(item.name_armenian)}</td>
                <td>{renderField(item.class)}</td>
                <td>{renderField(item.user_created)}</td>
                <td>{renderField(item.date_updated)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products and services found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ProductsAndServices;
