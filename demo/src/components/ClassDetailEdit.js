import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ClassDetailEdit.css';

const API_URL = 'http://registry1.isaa.am/items/Classes';

const ClassDetailEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classDetail, setClassDetail] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    status: '',
    class: '',
    description: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        const foundClass = response.data.data;
        setClassDetail(foundClass);
        setFormData({
          status: foundClass.status || '',
          class: foundClass.class || '',
          description: foundClass.description || '',
        });
      } catch (error) {
        console.error('Error fetching class detail:', error.response ? error.response.data : error);
      }
    };

    fetchClassDetail();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(API_URL);
      const classes = response.data.data;
      const isUnique = !classes.some(cls => cls.class === formData.class && cls.id !== id);

      if (isUnique) {
        await axios.patch(`${API_URL}/${id}`, formData);
        setEditMode(false);
        const updatedClass = { ...classDetail, ...formData };
        setClassDetail(updatedClass);
        setError('');
      } else {
        setError('Class code should be unique');
      }
    } catch (error) {
      console.error('Error updating class detail:', error.response ? error.response.data : error);
    }
  };

  const handleBackClick = () => {
    navigate('/classes');
  };

  return (
    <div className="class-detail-edit">
      {classDetail ? (
        <div>
          <h1>Class Detail</h1>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
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
                {error && <p className="error">{error}</p>}
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="10" // Make the textarea larger by specifying rows
                  cols="50" // Make the textarea wider by specifying cols
                />
              </div>
              <button type="submit">Save</button>
            </form>
          ) : (
            <div>
              <p><strong>Status:</strong> {classDetail.status}</p>
              <p><strong>Class:</strong> {classDetail.class}</p>
              <p><strong>Description:</strong> {classDetail.description}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
            </div>
          )}
          <button className="back-button" onClick={handleBackClick}>Back</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClassDetailEdit;
