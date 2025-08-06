import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, updatePaymentStatus } from '../../store/slices/orderSlice'; // ⬅ Added updatePaymentStatus
import { clearCart, fetchCart } from '../../store/slices/cartSlice';
import { useRazorpay } from '../../hooks/useRazorpay';
import { toast } from 'react-toastify';

const steps = ['Review Order', 'Shipping Details', 'Payment'];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [processing, setProcessing] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { items, total } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { currentOrder } = useSelector((state) => state.orders);
  
  const { isReady: razorpayReady, isLoading: razorpayLoading, error: razorpayError, initiatePayment } = useRazorpay();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info('Please login to continue checkout');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleCreateOrder = async () => {
    if (!shippingAddress.trim()) {
      toast.error('Please enter your shipping address');
      return;
    }

    setProcessing(true);
    try {
      const orderData = { shippingAddress: shippingAddress.trim() };
      await dispatch(createOrder(orderData)).unwrap();
      handleNext();
    } catch (error) {
      toast.error(error || 'Failed to create order');
    } finally {
      setProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (!currentOrder) {
      toast.error('No order found. Please try again.');
      return;
    }

    if (!razorpayReady) {
      toast.error('Payment gateway not ready. Please wait.');
      return;
    }

    const finalAmount = total * 1.18; // tax included
    setProcessing(true);

    try {
      await initiatePayment({
        amount: finalAmount,
        orderId: undefined, // Let Razorpay handle ID
        description: `GreenNest Order #${currentOrder.orderNumber || currentOrder.id}`,
        
        onSuccess: async (paymentResponse) => {
          try {
            // 1️⃣ Update payment status in backend
            await dispatch(updatePaymentStatus({
              orderId: currentOrder.id,
              paymentData: {
                razorpayPaymentId: paymentResponse.razorpayPaymentId,
                razorpayOrderId: paymentResponse.razorpayOrderId,
                razorpaySignature: paymentResponse.razorpaySignature,
                status: 'COMPLETED'
              }
            })).unwrap();

            // 2️⃣ Clear cart
            await dispatch(clearCart());
            await dispatch(fetchCart());

            // 3️⃣ Redirect to success
            toast.success('Payment successful! Order placed successfully 🎉');
            navigate('/order-success', { 
              state: { 
                orderNumber: currentOrder.orderNumber,
                paymentId: paymentResponse.razorpayPaymentId 
              }
            });
          } catch (error) {
            toast.error('Payment successful but failed to update status in backend.');
          }
        },

        onFailure: (error) => {
          toast.error(`Payment failed: ${error.description || 'Please try again'}`);

          // Optional: Update payment status as FAILED
          if (currentOrder) {
            dispatch(updatePaymentStatus({
              orderId: currentOrder.id,
              paymentData: { status: 'FAILED', errorDescription: error.description }
            }));
          }
        },

        onCancel: () => {
          toast.info('Payment was cancelled.');
        }
      });
    } catch (error) {
      toast.error('Failed to start payment. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Review Your Order</Typography>
            {items && items.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6">{item.productName}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Quantity: {item.quantity} × ₹{item.productPrice}
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary">
                      ₹{item.subtotal}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="body1">₹{total}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1">Tax (18%):</Typography>
              <Typography variant="body1">₹{(total * 0.18).toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                ₹{(total * 1.18).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Shipping Details</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Complete Shipping Address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter your complete shipping address with pincode"
              required
            />
          </Box>
        );

      case 2:
        return (
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>Complete Your Payment</Typography>
            {razorpayLoading && (
              <Alert severity="info" sx={{ mb: 3 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CircularProgress size={20} /> Loading payment gateway...
                </Box>
              </Alert>
            )}
            {razorpayError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Payment gateway error. Please refresh the page.
              </Alert>
            )}
            {razorpayReady && (
              <Alert severity="success" sx={{ mb: 3 }}>
                ✅ Payment gateway ready
              </Alert>
            )}
            <Typography variant="body1" sx={{ mb: 2 }}>
              Amount to pay: <strong>₹{(total * 1.18).toFixed(2)}</strong>
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handlePayment}
              disabled={processing || !razorpayReady}
              startIcon={processing && <CircularProgress size={20} />}
              sx={{ minWidth: 250, py: 1.5, fontSize: '1.1rem' }}
            >
              {processing ? 'Processing Payment...' : `Pay ₹${(total * 1.18).toFixed(2)}`}
            </Button>
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
      </Paper>

      <Paper sx={{ p: 3 }}>
        {renderStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={handleBack} size="large">
            Back
          </Button>
          {activeStep < steps.length - 1 && (
            <Button
              variant="contained"
              size="large"
              onClick={activeStep === 1 ? handleCreateOrder : handleNext}
              disabled={processing}
            >
              {activeStep === 1 ? (processing ? 'Creating Order...' : 'Create Order') : 'Next'}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout;
