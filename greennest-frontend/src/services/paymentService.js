import api from './api';

export const paymentService = {
  // Create payment order (if your backend supports it)
  createPaymentOrder: async (orderId) => {
    const response = await api.post(`/payments/create-order/${orderId}`);
    return response.data;
  },

  // Verify payment after successful Razorpay transaction
  verifyPayment: async (paymentData) => {
    const response = await api.post('/payments/verify', paymentData);
    return response.data;
  },

  // Get payment details
  getPaymentDetails: async (orderId) => {
    const response = await api.get(`/payments/order/${orderId}`);
    return response.data;
  },

  // Update order payment status (new method)
  updateOrderPaymentStatus: async (orderId, paymentData) => {
    const response = await api.put(`/orders/${orderId}/payment-status`, paymentData);
    return response.data;
  }
};
