import axios from 'axios';


const API_URL = 'http://localhost:5000/api/users';

const register = async (username, password, store_id, userRole) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password, store_id, userRole});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        throw error.response.data;
    }
};

const logout = () => {
    localStorage.removeItem('token');
};

// Function to verify token and get user role
const verifyToken = async () => {
    try {
        const token = localStorage.getItem('token');
        // Adjust the endpoint as necessary
        const response = await axios.get(`${API_URL}/verifyToken`, {token});
        return response.data; // Assuming the backend sends back { isValid: boolean, role: string }
    } catch (error) {
        console.error('Error verifying token:', error);
        throw error;
    }
};

export { register, login, logout, verifyToken };