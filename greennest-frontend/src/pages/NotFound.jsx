import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Home, ArrowBack, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 6, textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found 🌱
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
          Sorry, we couldn't find the page you're looking for. The page might have been moved, 
          deleted, or you might have entered the wrong URL.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate('/')}
            size="large"
          >
            Go Home
          </Button>
          <Button
            variant="outlined"
            startIcon={<Search />}
            onClick={() => navigate('/products')}
            size="large"
          >
            Browse Products
          </Button>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            size="large"
          >
            Go Back
          </Button>
        </Box>

        {/* Popular Links */}
        <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom>
            Popular Pages
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button color="inherit" onClick={() => navigate('/')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate('/products')}>
              All Products
            </Button>
            <Button color="inherit" onClick={() => navigate('/cart')}>
              Shopping Cart
            </Button>
            <Button color="inherit" onClick={() => navigate('/orders')}>
              My Orders
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound;
