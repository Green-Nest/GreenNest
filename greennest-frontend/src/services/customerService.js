import api from './api';

export const customerService = {
  getProfile: async () => {
    const response = await api.get('/customer/profile');
    return response.data;
  },

  getProducts: async (page = 0, size = 10) => {
    const response = await api.get(`/customer/products?page=${page}&size=${size}`);
    return response.data;
  },

  getFeaturedProducts: async () => {
    const response = await api.get('/customer/products/featured');
    return response.data;
  },

  getProduct: async (id) => {
    const response = await api.get(`/customer/products/${id}`);
    return response.data;
  },

  searchProducts: async (keyword, page = 0, size = 10) => {
    const response = await api.get(`/customer/products/search?keyword=${keyword}&page=${page}&size=${size}`);
    return response.data;
  }
};
