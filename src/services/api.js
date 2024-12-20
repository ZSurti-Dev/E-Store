import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
    // Product APIs
    getAllProducts: () => axios.get(`${API_URL}/products`),
    getProductById: (id) => axios.get(`${API_URL}/products/${id}`),
    addProduct: (productData) => axios.post(`${API_URL}/products`, productData),
    
    // Order APIs
    createOrder: (orderData) => axios.post(`${API_URL}/orders`, orderData),
    getUserOrders: (userId) => axios.get(`${API_URL}/orders/user/${userId}`),
    
    // User APIs
    signup: (userData) => axios.post(`${API_URL}/signup`, userData),
    login: (credentials) => axios.post(`${API_URL}/login`, credentials)
};