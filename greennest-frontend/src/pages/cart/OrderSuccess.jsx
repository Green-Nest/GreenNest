import React, { useEffect } from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../../store/slices/cartSlice';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart()); // Refresh cart after successful order
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 6, textAlign: 'center' }}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>Order Placed Successfully! 🎉</Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Thank you for your purchase. You will receive an email confirmation shortly.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => navigate('/orders')}>View Orders</Button>
          <Button variant="outlined" onClick={() => navigate('/products')}>Continue Shopping</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSuccess;
