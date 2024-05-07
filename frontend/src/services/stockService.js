import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getDesserts = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/desserts`, {
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
            `${API_URL}/update-stock`,
            { dessert_id: dessertId, quantity },
            { headers: { Authorization: token } }
        );
    } catch (error) {
        throw new Error('Failed to update stock');
    }
};

export { getDesserts, updateStock };