import * as yup from 'yup';
import { REGEX_PATTERNS } from './constants';

// Common validation rules
export const validationRules = {
  required: (field) => `${field} is required`,
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  password: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  pincode: 'Please enter a valid 6-digit pincode',
  positiveNumber: 'Must be a positive number',
  minLength: (min) => `Must be at least ${min} characters`,
  maxLength: (max) => `Must be no more than ${max} characters`,
};

// Auth Validation Schemas
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(validationRules.email)
    .required(validationRules.required('Email')),
  password: yup
    .string()
    .min(8, validationRules.minLength(8))
    .required(validationRules.required('Password')),
});

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(2, validationRules.minLength(2))
    .max(50, validationRules.maxLength(50))
    .required(validationRules.required('First name')),
  lastName: yup
    .string()
    .trim()
    .min(2, validationRules.minLength(2))
    .max(50, validationRules.maxLength(50))
    .required(validationRules.required('Last name')),
  email: yup
    .string()
    .email(validationRules.email)
    .required(validationRules.required('Email')),
  password: yup
    .string()
    .min(8, validationRules.minLength(8))
    .matches(REGEX_PATTERNS.PASSWORD, validationRules.password)
    .required(validationRules.required('Password')),
  phone: yup
    .string()
    .matches(REGEX_PATTERNS.PHONE, validationRules.phone)
    .required(validationRules.required('Phone number')),
  address: yup
    .string()
    .trim()
    .min(10, validationRules.minLength(10))
    .max(200, validationRules.maxLength(200))
    .required(validationRules.required('Address')),
  city: yup
    .string()
    .trim()
    .min(2, validationRules.minLength(2))
    .max(50, validationRules.maxLength(50))
    .required(validationRules.required('City')),
  state: yup
    .string()
    .trim()
    .min(2, validationRules.minLength(2))
    .max(50, validationRules.maxLength(50))
    .required(validationRules.required('State')),
  pincode: yup
    .string()
    .matches(REGEX_PATTERNS.PINCODE, validationRules.pincode)
    .required(validationRules.required('Pincode')),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required(validationRules.required('Current password')),
  newPassword: yup
    .string()
    .min(8, validationRules.minLength(8))
    .matches(REGEX_PATTERNS.PASSWORD, validationRules.password)
    .required(validationRules.required('New password')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required(validationRules.required('Confirm password')),
});

// Product Validation Schemas
export const productSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, validationRules.minLength(3))
    .max(100, validationRules.maxLength(100))
    .required(validationRules.required('Product name')),
  description: yup
    .string()
    .trim()
    .min(10, validationRules.minLength(10))
    .max(1000, validationRules.maxLength(1000))
    .required(validationRules.required('Description')),
  price: yup
    .number()
    .positive(validationRules.positiveNumber)
    .max(999999, 'Price cannot exceed ₹9,99,999')
    .required(validationRules.required('Price')),
  stockQuantity: yup
    .number()
    .min(0, 'Stock cannot be negative')
    .max(9999, 'Stock cannot exceed 9999')
    .integer('Stock must be a whole number')
    .required(validationRules.required('Stock quantity')),
  imageUrl: yup
    .string()
    .url('Please enter a valid URL')
    .required(validationRules.required('Image URL')),
  categoryId: yup
    .number()
    .positive(validationRules.positiveNumber)
    .integer('Category ID must be a whole number')
    .required(validationRules.required('Category')),
  careInstructions: yup
    .string()
    .trim()
    .min(10, validationRules.minLength(10))
    .max(500, validationRules.maxLength(500))
    .required(validationRules.required('Care instructions')),
});

// Contact Form Validation Schema
export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, validationRules.minLength(2))
    .max(100, validationRules.maxLength(100))
    .required(validationRules.required('Name')),
  email: yup
    .string()
    .email(validationRules.email)
    .required(validationRules.required('Email')),
  subject: yup
    .string()
    .trim()
    .min(5, validationRules.minLength(5))
    .max(100, validationRules.maxLength(100))
    .required(validationRules.required('Subject')),
  message: yup
    .string()
    .trim()
    .min(10, validationRules.minLength(10))
    .max(1000, validationRules.maxLength(1000))
    .required(validationRules.required('Message')),
});

// Checkout Validation Schema
export const checkoutSchema = yup.object().shape({
  shippingAddress: yup
    .string()
    .trim()
    .min(10, validationRules.minLength(10))
    .max(300, validationRules.maxLength(300))
    .required(validationRules.required('Shipping address')),
});

// Search Validation
export const searchSchema = yup.object().shape({
  query: yup
    .string()
    .trim()
    .min(2, 'Search query must be at least 2 characters')
    .max(100, validationRules.maxLength(100)),
});

// Custom validation functions
export const validateFile = (file, maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/gif']) => {
  const errors = [];
  
  if (!file) {
    errors.push('File is required');
    return errors;
  }
  
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }
  
  return errors;
};

export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return errors;
};

export const validatePasswordStrength = (password) => {
  let strength = 0;
  const feedback = [];
  
  if (password.length >= 8) strength += 1;
  else feedback.push('Use at least 8 characters');
  
  if (/[a-z]/.test(password)) strength += 1;
  else feedback.push('Add lowercase letters');
  
  if (/[A-Z]/.test(password)) strength += 1;
  else feedback.push('Add uppercase letters');
  
  if (/\d/.test(password)) strength += 1;
  else feedback.push('Add numbers');
  
  if (/[^a-zA-Z\d]/.test(password)) strength += 1;
  else feedback.push('Add special characters');
  
  const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  
  return {
    strength,
    level: levels[Math.min(strength, 4)],
    feedback,
    isStrong: strength >= 4,
  };
};
