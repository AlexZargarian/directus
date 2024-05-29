import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProductsAndServices, updateProductAndService } from '../api/directus';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    status: '',
    class: '',
    base_code: '',
    name_armenian: '',
    name_russian: '',
    name_english: '',
    name_french: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProductsAndServices(1, 100); // Fetching a larger batch for demonstration
      const foundProduct = data.find(item => item.id === id);
      setProduct(foundProduct);
      setFormData({
        status: foundProduct?.status || '',
        class: foundProduct?.class || '',
        base_code: foundProduct?.base_code || '',
        name_armenian: foundProduct?.name_armenian || '',
        name_russian: foundProduct?.name_russian || '',
        name_english: foundProduct?.name_english || '',
        name_french: foundProduct?.name_french || '',
      });
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProductAndService(id, formData);
    setEditMode(false);
    const updatedProduct = { ...product, ...formData };
    setProduct(updatedProduct);
  };

  const renderField = (field) => {
    if (typeof field === 'object' && field !== null) {
      return JSON.stringify(field);
    }
    return field || 'No information provided';
  };

  return (
    <div className="product-detail">
      {product ? (
        <div>
          <h1>Product Detail</h1>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              <div>
                <label>Class:</label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Base Code:</label>
                <input
                  type="text"
                  name="base_code"
                  value={formData.base_code}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Name (Armenian):</label>
                <input
                  type="text"
                  name="name_armenian"
                  value={formData.name_armenian}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Name (Russian):</label>
                <input
                  type="text"
                  name="name_russian"
                  value={formData.name_russian}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Name (English):</label>
                <input
                  type="text"
                  name="name_english"
                  value={formData.name_english}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Name (French):</label>
                <input
                  type="text"
                  name="name_french"
                  value={formData.name_french}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Save</button>
            </form>
          ) : (
            <div>
              <p><strong>Status:</strong> {renderField(product.status)}</p>
              <p><strong>Class:</strong> {renderField(product.class)}</p>
              <p><strong>Base Code:</strong> {renderField(product.base_code)}</p>
              <p><strong>Name (Armenian):</strong> {renderField(product.name_armenian)}</p>
              <p><strong>Name (Russian):</strong> {renderField(product.name_russian)}</p>
              <p><strong>Name (English):</strong> {renderField(product.name_english)}</p>
              <p><strong>Name (French):</strong> {renderField(product.name_french)}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
