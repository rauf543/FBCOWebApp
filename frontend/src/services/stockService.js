import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getDesserts = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/stock/desserts`, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch desserts');
    }
};

const updateStock = async (dessertId, quantity) => {
    try {
        const token = localStorage.getItem('token');
        await axios.post(
            `${API_URL}/stock/update-stock`,
            { dessert_id: dessertId, quantity },
            { headers: { Authorization: token } }
        );
    } catch (error) {
        throw new Error('Failed to update stock');
    }
};

const getAvailableDesserts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/stock/available-desserts`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch available desserts');
  }
};

const addDessertToStock = async (dessertId, quantity) => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(
      `${API_URL}/stock/add-dessert`,
      { dessert_id: dessertId, quantity },
      { headers: { Authorization: token } }
    );
  } catch (error) {
    throw new Error('Failed to add dessert to stock');
  }
};

export { getDesserts, updateStock, getAvailableDesserts, addDessertToStock };