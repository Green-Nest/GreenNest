import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Save,
  Cancel,
  Star,
  StarBorder
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { adminService } from '../../services/adminService';
import { productService } from '../../services/productService';
import { toast } from 'react-toastify';

const productSchema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  stockQuantity: yup.number().min(0, 'Stock cannot be negative').required('Stock quantity is required'),
  imageUrl: yup.string().url('Invalid URL format').optional(),
  categoryId: yup.number().required('Category is required'),
  careInstructions: yup.string().required('Care instructions are required'),
});

const AdminProducts = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(productSchema)
  });

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      toast.error('You need admin privileges to access this page');
      navigate('/');
      return;
    }
    fetchProducts();
  }, [user]);

  // In the fetchProducts function, update to use the correct endpoint:
const fetchProducts = async () => {
  try {
    setLoading(true);
    // Try the admin endpoint first
    let response;
    try {
      response = await adminService.getAllProducts();
    } catch (adminError) {
      console.log('Admin endpoint failed, trying regular products endpoint');
      // If admin endpoint fails, try regular products endpoint
      response = await productService.getAllProducts(0, 50);
    }
    
    if (response.success) {
      setProducts(response.data);
    }
  } catch (error) {
    console.error('Fetch products error:', error);
    toast.error('Failed to fetch products');
  } finally {
    setLoading(false);
  }
};


  const handleAddProduct = () => {
    setEditingProduct(null);
    reset({
      name: '',
      description: '',
      price: '',
      stockQuantity: '',
      imageUrl: '',
      categoryId: 1, // Default category
      careInstructions: '',
      isFeatured: false
    });
    setDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId,
      careInstructions: product.careInstructions,
      isFeatured: product.isFeatured || false
    });
    setDialogOpen(true);
  };

  const handleSaveProduct = async (data) => {
    try {
      if (editingProduct) {
        const response = await productService.updateProduct(editingProduct.id, data);
        if (response.success) {
          toast.success('Product updated successfully!');
        }
      } else {
        const response = await productService.createProduct(data);
        if (response.success) {
          toast.success('Product created successfully!');
        }
      }
      
      setDialogOpen(false);
      fetchProducts(); // Refresh products list
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await productService.deleteProduct(productToDelete.id);
      if (response.success) {
        toast.success('Product deleted successfully!');
        setDeleteDialogOpen(false);
        setProductToDelete(null);
        fetchProducts();
      }
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleToggleFeature = async (productId) => {
    try {
      const response = await adminService.toggleProductFeature(productId);
      if (response.success) {
        toast.success('Product feature status updated!');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Failed to toggle product feature');
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          Product Management 🌱
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>

      {products && products.length > 0 ? (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={product.imageUrl || '/placeholder-plant.jpg'}
                    alt={product.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  {product.isFeatured && (
                    <Chip
                      label="Featured"
                      color="primary"
                      size="small"
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    />
                  )}
                </Box>
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {product.description?.substring(0, 100)}...
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="primary">
                      ₹{product.price}
                    </Typography>
                    <Chip
                      label={`Stock: ${product.stockQuantity}`}
                      color={product.stockQuantity > 0 ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => handleEditProduct(product)}
                      fullWidth
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<Delete />}
                      onClick={() => handleDeleteProduct(product)}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </Box>

                  <Button
                    variant={product.isFeatured ? "contained" : "outlined"}
                    startIcon={product.isFeatured ? <Star /> : <StarBorder />}
                    onClick={() => handleToggleFeature(product.id)}
                    fullWidth
                    size="small"
                  >
                    {product.isFeatured ? 'Featured' : 'Make Featured'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No products found
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddProduct}>
            Add Your First Product
          </Button>
        </Box>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price (₹)"
                  type="number"
                  {...register('price')}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  type="number"
                  {...register('stockQuantity')}
                  error={!!errors.stockQuantity}
                  helperText={errors.stockQuantity?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Category ID"
                  type="number"
                  {...register('categoryId')}
                  error={!!errors.categoryId}
                  helperText={errors.categoryId?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  {...register('imageUrl')}
                  error={!!errors.imageUrl}
                  helperText={errors.imageUrl?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Care Instructions"
                  {...register('careInstructions')}
                  error={!!errors.careInstructions}
                  helperText={errors.careInstructions?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      {...register('isFeatured')}
                      onChange={(e) => setValue('isFeatured', e.target.checked)}
                    />
                  }
                  label="Featured Product"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(handleSaveProduct)}
            variant="contained"
            startIcon={<Save />}
          >
            {editingProduct ? 'Update' : 'Create'} Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This action cannot be undone!
          </Alert>
          <Typography>
            Are you sure you want to delete "{productToDelete?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminProducts;
