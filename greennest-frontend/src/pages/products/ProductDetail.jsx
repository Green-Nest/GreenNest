import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Button,
  Chip,
  Divider,
  TextField,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Add, Remove, ShoppingCart, ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../store/slices/productSlice';
import { addToCart, fetchCart } from '../../store/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  
  const { selectedProduct, loading } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await dispatch(addToCart({ productId: selectedProduct.id, quantity })).unwrap();
      dispatch(fetchCart());
      toast.success(`${quantity} item(s) added to cart successfully!`);
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (!selectedProduct) {
    return (
      <Container>
        <Box textAlign="center" py={8}>
          <Typography variant="h5" gutterBottom>Product not found</Typography>
          <Button variant="contained" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/products')} sx={{ mb: 3 }}>
        Back to Products
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={selectedProduct.imageUrl || '/placeholder-plant.jpg'}
              alt={selectedProduct.name}
              sx={{ height: 400, objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
                {selectedProduct.name}
              </Typography>
              {selectedProduct.isFeatured && <Chip label="Featured" color="primary" />}
            </Box>

            <Typography variant="h5" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
              ₹{selectedProduct.price}
            </Typography>

            <Typography
              variant="body1"
              color={selectedProduct.stockQuantity > 0 ? 'success.main' : 'error.main'}
              sx={{ mb: 3, fontWeight: 500 }}
            >
              {selectedProduct.stockQuantity > 0 ? `${selectedProduct.stockQuantity} in stock` : 'Out of stock'}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>Description</Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              {selectedProduct.description || 'No description available.'}
            </Typography>

            {selectedProduct.stockQuantity > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Quantity</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Remove />
                  </IconButton>
                  <TextField
                    value={quantity}
                    size="small"
                    sx={{ width: '80px' }}
                    inputProps={{ style: { textAlign: 'center' } }}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                  <IconButton onClick={() => setQuantity(quantity + 1)}>
                    <Add />
                  </IconButton>
                </Box>
              </Box>
            )}

            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={selectedProduct.stockQuantity === 0}
              fullWidth
              sx={{ py: 1.5 }}
            >
              {selectedProduct.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
