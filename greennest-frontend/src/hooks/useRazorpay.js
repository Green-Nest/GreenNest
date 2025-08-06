import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { razorpayService } from '../services/razorpayService';
import { toast } from 'react-toastify';

export const useRazorpay = () => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeRazorpay = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        await razorpayService.waitForRazorpay();
        setIsReady(true);
        
      } catch (err) {
        setError(err.message);
        toast.error('Payment gateway failed to load. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeRazorpay();
  }, []);

  const initiatePayment = useCallback(async ({
    amount,
    orderId, // This can now be undefined
    description,
    onSuccess,
    onFailure,
    onCancel
  }) => {
    if (!isReady) {
      throw new Error('Payment gateway not ready');
    }

    if (!amount || amount <= 0) {
      throw new Error('Invalid payment amount');
    }

    try {
      const options = razorpayService.createPaymentOptions({
        amount,
        orderId, // Pass through (can be undefined)
        description: description || 'GreenNest Purchase',
        customerName: user ? `${user.firstName} ${user.lastName}`.trim() : 'Customer',
        customerEmail: user?.email || '',
        customerPhone: user?.phone || '',
        onSuccess: (response) => {
          if (onSuccess) onSuccess(response);
        },
        onFailure: (error) => {
          toast.error(`Payment failed: ${error.description || 'Unknown error'}`);
          if (onFailure) onFailure(error);
        },
        onCancel: () => {
          toast.info('Payment cancelled');
          if (onCancel) onCancel();
        }
      });

      await razorpayService.openCheckout(options);
      
    } catch (err) {
      toast.error(err.message || 'Failed to initiate payment');
      throw err;
    }
  }, [isReady, user]);

  return {
    isReady,
    isLoading,
    error,
    initiatePayment
  };
};
