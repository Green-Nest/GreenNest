import api from './api';

export const adminService = {
  // Dashboard
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // User Management
  getAllUsers: async (role = null) => {
    const url = role ? `/admin/users?role=${role}` : '/admin/users';
    const response = await api.get(url);
    return response.data;
  },

  getCustomers: async () => {
    const response = await api.get('/admin/users/customers');
    return response.data;
  },

  getAdmins: async () => {
    const response = await api.get('/admin/users/admins');
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Product Management
  getAllProducts: async () => {
    const response = await api.get('/admin/products');
    return response.data;
  },

  toggleProductFeature: async (productId) => {
    const response = await api.post(`/admin/products/${productId}/feature`);
    return response.data;
  },

  // Order Management
  getAllOrders: async () => {
    const response = await api.get('/admin/orders');
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/admin/orders/${orderId}/status?status=${status}`);
    return response.data;
  }
};
