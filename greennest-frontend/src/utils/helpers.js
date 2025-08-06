import { CURRENCY, ORDER_STATUS_COLORS, TOAST_MESSAGES } from './constants';

// Format Currency
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') {
    return `${CURRENCY.SYMBOL}0`;
  }
  return `${CURRENCY.SYMBOL}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

// Format Date
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return new Date(date).toLocaleDateString('en-IN', { ...defaultOptions, ...options });
};

// Format Date with Time
export const formatDateTime = (date) => {
  if (!date) return '';
  
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Truncate Text
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Capitalize First Letter
export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Get Order Status Color
export const getOrderStatusColor = (status) => {
  return ORDER_STATUS_COLORS[status] || 'default';
};

// Calculate Cart Total
export const calculateCartTotal = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => total + (item.subtotal || 0), 0);
};

// Calculate Cart Item Count
export const calculateCartItemCount = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((count, item) => count + (item.quantity || 0), 0);
};

// Generate Random ID
export const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Debounce Function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Check if Email is Valid
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Check if Phone is Valid
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[1-9][\d]{9,15}$/;
  return phoneRegex.test(phone);
};

// Get Error Message
export const getErrorMessage = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return TOAST_MESSAGES.ERROR_GENERIC;
};

// Format File Size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Check if User is Admin
export const isAdmin = (user) => {
  return user?.role === 'ADMIN';
};

// Check if User is Customer
export const isCustomer = (user) => {
  return user?.role === 'CUSTOMER';
};

// Get User Full Name
export const getUserFullName = (user) => {
  if (!user) return '';
  return `${user.firstName || ''} ${user.lastName || ''}`.trim();
};

// Parse URL Search Params
export const parseSearchParams = (searchString) => {
  const params = new URLSearchParams(searchString);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

// Build URL with Params
export const buildUrlWithParams = (baseUrl, params) => {
  const url = new URL(baseUrl, window.location.origin);
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
};

// Calculate Tax
export const calculateTax = (amount, taxRate = 0.18) => {
  return amount * taxRate;
};

// Calculate Total with Tax
export const calculateTotalWithTax = (amount, taxRate = 0.18) => {
  return amount + calculateTax(amount, taxRate);
};

// Format Address
export const formatAddress = (address) => {
  if (!address) return '';
  const parts = [
    address.street,
    address.city,
    address.state,
    address.pincode
  ].filter(Boolean);
  return parts.join(', ');
};

// Get Initials from Name
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Sort Array by Key
export const sortByKey = (array, key, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// Group Array by Key
export const groupByKey = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

// Check if Object is Empty
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

// Deep Clone Object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Convert to Slug
export const toSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};
