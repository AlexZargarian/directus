import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ClassDetail.css';

const API_URL = 'http://registry1.isaa.am/items/Classes';

const ClassDetail = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(API_URL);
        setClasses(response.data.data);
      } catch (error) {
        console.error('Error fetching class details:', error.response ? error.response.data : error);
      }
    };

    fetchClasses();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/class/${id}`);
  };

  return (
    <div className="class-detail">
      <h1>Class Details</h1>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Class</th>
            <th>Description</th>
            <th>Date Created</th>
            <th>User Created</th>
          </tr>
        </thead>
        <tbody>
          {classes.length > 0 ? (
            classes.map((item) => (
              <tr key={item.id} onClick={() => handleRowClick(item.id)} style={{ cursor: 'pointer' }}>
                <td>{item.status}</td>
                <td>{item.class}</td>
                <td>{item.description}</td>
                <td>{new Date(item.date_created).toLocaleString()}</td>
                <td>{item.user_created}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No class details found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClassDetail;
