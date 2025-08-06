import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../../store/slices/orderSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentOrder, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <LoadingSpinner message="Loading order details..." />;
  }

  if (!currentOrder) {
    return (
      <Container>
        <Box textAlign="center" py={8}>
          <Typography variant="h5" gutterBottom>
            Order not found
          </Typography>
          <Button variant="contained" onClick={() => navigate('/orders')}>
            Back to Orders
          </Button>
        </Box>
      </Container>
    );
  }

  console.log('Current Order Data:', currentOrder); // Debug log to see structure

  // Handle different possible data structures from your backend
  const orderItems = currentOrder.orderItems || 
                    currentOrder.items || 
                    currentOrder.products || 
                    [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'CONFIRMED': return 'info';
      case 'SHIPPED': return 'primary';
      case 'DELIVERED': return 'success';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/orders')}
        sx={{ mb: 3 }}
      >
        Back to Orders
      </Button>

      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>

      {/* Order Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Order #{currentOrder.orderNumber || currentOrder.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Placed on {new Date(currentOrder.createdAt).toLocaleDateString()}
              </Typography>
              {currentOrder.shippingAddress && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Shipping Address:</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {currentOrder.shippingAddress}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6} textAlign="right">
              <Chip
                label={currentOrder.status}
                color={getStatusColor(currentOrder.status)}
                sx={{ mb: 1 }}
              />
              <Typography variant="h6">
                Total: ₹{currentOrder.totalAmount}
              </Typography>
              {currentOrder.paymentStatus && (
                <Typography variant="body2" color="textSecondary">
                  Payment: {currentOrder.paymentStatus}
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Items ({orderItems.length})
          </Typography>
          
          {console.log('Order Items:', orderItems)} {/* Debug log */}
          
          {orderItems && orderItems.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems.map((item, index) => (
                    <TableRow key={item.id || index}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {item.productImage && (
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 16, borderRadius: 4 }}
                            />
                          )}
                          <Box>
                            <Typography variant="body1">
                              {item.productName || item.product?.name || 'Unknown Product'}
                            </Typography>
                            {item.product?.description && (
                              <Typography variant="body2" color="textSecondary">
                                {item.product.description.substring(0, 50)}...
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        {item.quantity}
                      </TableCell>
                      <TableCell align="right">
                        ₹{item.price || item.product?.price || 0}
                      </TableCell>
                      <TableCell align="right">
                        ₹{(item.price * item.quantity) || item.subtotal || 0}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="textSecondary">
                No items found for this order.
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                This might be a data structure issue. Check browser console for order data.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderDetail;
