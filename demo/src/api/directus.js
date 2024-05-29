import axios from 'axios';

const API_URL = 'http://registry1.isaa.am';

const instance = axios.create({
  baseURL: API_URL,
});

export const getAllProductsAndServices = async (page, limit) => {
  try {
    const response = await instance.get('/items/Products_and_services', {
      params: {
        limit,
        offset: (page - 1) * limit,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error);
    return [];
  }
};

export const updateProductAndService = async (id, data) => {
  try {
    const response = await instance.patch(`/items/Products_and_services/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error('Error updating data:', error.response ? error.response.data : error);
  }
};
