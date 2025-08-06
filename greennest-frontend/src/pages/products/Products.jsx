import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Pagination,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart,
  Visibility,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchProducts, searchProducts } from '../../store/slices/productSlice';
import { addToCart, fetchCart } from '../../store/slices/cartSlice';
import { toast } from 'react-toastify';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(0);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { items, searchResults, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const displayProducts = searchQuery ? searchResults : items;

  useEffect(() => {
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      setSearchQuery(searchTerm);
      dispatch(searchProducts({ keyword: searchTerm, page: currentPage }));
    } else {
      dispatch(fetchProducts({ page: currentPage, size: 12 }));
    }
  }, [dispatch, searchParams, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
    setCurrentPage(0);
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
      dispatch(fetchCart()); // Refresh cart
      toast.success('Item added to cart successfully!');
    } catch (error) {
      toast.error(error || 'Failed to add item to cart');
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        Our Plants Collection 🌱
      </Typography>

      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for plants..."
          sx={{ maxWidth: 400, width: '100%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" sx={{ ml: 1, px: 3 }}>
          Search
        </Button>
      </Box>

      {displayProducts && displayProducts.length > 0 ? (
        <Grid container spacing={3}>
          {displayProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl || '/placeholder-plant.jpg'}
                  alt={product.name}
                />
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="div" noWrap>
                      {product.name}
                    </Typography>
                    {product.isFeatured && <Chip label="Featured" color="primary" size="small" />}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.description?.substring(0, 80)}...
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary" fontWeight={600}>
                      ₹{product.price}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color={product.stockQuantity > 0 ? 'success.main' : 'error.main'}
                    >
                      {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                  </Box>
                </CardContent>
                
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stockQuantity === 0}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={8}>
          <Typography variant="h5" gutterBottom>No products found</Typography>
          <Button variant="contained" onClick={() => navigate('/products')}>
            View All Products
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Products;
