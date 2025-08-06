// API Constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  PRODUCTS: {
    ALL: '/products',
    BY_ID: (id) => `/products/${id}`,
    FEATURED: '/products/featured',
    SEARCH: '/products/search',
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: (productId) => `/cart/update/${productId}`,
    REMOVE: (productId) => `/cart/remove/${productId}`,
    CLEAR: '/cart/clear',
    TOTAL: '/cart/total',
  },
  ORDERS: {
    CREATE: '/orders/create',
    USER_ORDERS: '/orders',
    BY_ID: (id) => `/orders/${id}`,
  },
  PAYMENTS: {
    CREATE_ORDER: (orderId) => `/payments/create-order/${orderId}`,
    VERIFY: '/payments/verify',
    ORDER_DETAILS: (orderId) => `/payments/order/${orderId}`,
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    CUSTOMERS: '/admin/users/customers',
    ADMINS: '/admin/users/admins',
    DELETE_USER: (id) => `/admin/users/${id}`,
    PRODUCTS: '/admin/products',
    FEATURE_PRODUCT: (id) => `/admin/products/${id}/feature`,
    ORDERS: '/admin/orders',
    UPDATE_ORDER_STATUS: (id) => `/admin/orders/${id}/status`,
  },
  CUSTOMER: {
    PROFILE: '/customer/profile',
    PRODUCTS: '/customer/products',
    FEATURED_PRODUCTS: '/customer/products/featured',
    PRODUCT_BY_ID: (id) => `/customer/products/${id}`,
    SEARCH_PRODUCTS: '/customer/products/search',
  }
};

// UI Constants
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// Order Status Constants
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'warning',
  [ORDER_STATUS.CONFIRMED]: 'info',
  [ORDER_STATUS.SHIPPED]: 'primary',
  [ORDER_STATUS.DELIVERED]: 'success',
  [ORDER_STATUS.CANCELLED]: 'error',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
};

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE: 0,
  DEFAULT_SIZE: 12,
  ADMIN_SIZE: 20,
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_INFO: 'userInfo',
  CART_ITEMS: 'cartItems',
  SEARCH_HISTORY: 'searchHistory',
};

// Toast Messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  REGISTER_SUCCESS: 'Registration successful!',
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully!',
  PRODUCT_ADDED_TO_CART: 'Product added to cart!',
  PRODUCT_REMOVED_FROM_CART: 'Product removed from cart!',
  CART_CLEARED: 'Cart cleared successfully!',
  ORDER_CREATED: 'Order placed successfully!',
  PAYMENT_SUCCESS: 'Payment completed successfully!',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  ERROR_GENERIC: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SESSION_EXPIRED: 'Session expired. Please login again.',
};

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[1-9][\d]{0,15}$/,
  PINCODE: /^[1-9][0-9]{5}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
};

// Product Categories (if you decide to add later)
export const PRODUCT_CATEGORIES = {
  INDOOR_PLANTS: 'indoor-plants',
  OUTDOOR_PLANTS: 'outdoor-plants',
  SUCCULENTS: 'succulents',
  FLOWERING_PLANTS: 'flowering-plants',
  HERBS: 'herbs-vegetables',
  ACCESSORIES: 'accessories',
};

// Currency
export const CURRENCY = {
  SYMBOL: '₹',
  CODE: 'INR',
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'GreenNest',
  DESCRIPTION: 'Your one-stop destination for beautiful plants and gardening supplies',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@greennest.com',
  SUPPORT_PHONE: '+91 9876543210',
};
