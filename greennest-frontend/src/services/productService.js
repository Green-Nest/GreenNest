import api from './api';

export const productService = {
  // Public product endpoints
  getAllProducts: async (page = 0, size = 12) => {
    const response = await api.get(`/products?page=${page}&size=${size}`);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getFeaturedProducts: async () => {
    const response = await api.get('/products/featured');
    return response.data;
  },

  searchProducts: async (keyword, page = 0, size = 12) => {
    const response = await api.get(`/products/search?keyword=${keyword}&page=${page}&size=${size}`);
    return response.data;
  },

  // Admin product endpoints
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
  updateOrderPaymentStatus: async (orderId, paymentData) => {
    const response = await api.put(`/orders/${orderId}/payment-status`, paymentData);
    return response.data;
  }
};
