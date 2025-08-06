import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Chip
} from '@mui/material';
import {
  Inventory,
  ShoppingCart,
  People,
  TrendingUp,
  Assignment,
  Payment as PaymentIcon,
  CheckCircle,
  Cancel,
  Pending
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    fetchRecentOrders();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminService.getDashboard();
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const response = await adminService.getAllOrders();
      if (response.success) {
        // Get last 5 orders
        setRecentOrders(response.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to fetch recent orders');
    } finally {
      setLoading(false);
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

  // Enhanced dashboard cards with payment stats
  const dashboardCards = [
    {
      title: 'Total Products',
      value: dashboardData?.totalProducts || 0,
      icon: <Inventory sx={{ fontSize: 40 }} />,
      color: 'primary.main',
      action: () => navigate('/admin/products')
    },
    {
      title: 'Total Orders',
      value: dashboardData?.totalOrders || 0,
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      color: 'success.main',
      action: () => navigate('/admin/orders')
    },
    {
      title: 'Total Users',
      value: dashboardData?.totalUsers || 0,
      icon: <People sx={{ fontSize: 40 }} />,
      color: 'info.main',
      action: () => navigate('/admin/users')
    },
    {
      title: 'Total Revenue',
      value: `₹${dashboardData?.totalRevenue || 0}`,
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: 'warning.main'
    }
  ];

  // NEW: Payment status cards
  const paymentCards = [
    {
      title: 'Completed Payments',
      value: dashboardData?.completedPayments || 0,
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: 'success.main'
    },
    {
      title: 'Pending Payments',
      value: dashboardData?.pendingPayments || 0,
      icon: <Pending sx={{ fontSize: 40 }} />,
      color: 'warning.main'
    },
    {
      title: 'Failed Payments',
      value: dashboardData?.failedPayments || 0,
      icon: <Cancel sx={{ fontSize: 40 }} />,
      color: 'error.main'
    }
  ];

  const quickActions = [
    { text: 'Manage Products', icon: <Inventory />, action: () => navigate('/admin/products') },
    { text: 'View Orders', icon: <ShoppingCart />, action: () => navigate('/admin/orders') },
    { text: 'Manage Users', icon: <People />, action: () => navigate('/admin/users') },
    { text: 'Payment Reports', icon: <PaymentIcon />, action: () => navigate('/admin/payments') }
  ];

  const getPaymentStatusColor = (paymentStatus) => {
    switch (paymentStatus) {
      case 'COMPLETED': return 'success';
      case 'PENDING': return 'warning';
      case 'FAILED': return 'error';
      default: return 'default';
    }
  };

  const getOrderStatusColor = (status) => {
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
      <Typography variant="h4" gutterBottom>
        Admin Dashboard 👑
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Welcome back! Here's what's happening with your GreenNest platform.
      </Typography>

      {/* Main Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {dashboardCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                cursor: card.action ? 'pointer' : 'default',
                '&:hover': card.action ? { boxShadow: 4, transform: 'translateY(-2px)' } : {},
                transition: 'all 0.2s ease'
              }}
              onClick={card.action}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box sx={{ color: card.color, mr: 2 }}>
                    {card.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={600}>
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {card.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* NEW: Payment Status Cards */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Payment Overview 💳
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {paymentCards.map((card, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box sx={{ color: card.color, mr: 2 }}>
                    {card.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={600}>
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {card.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              {quickActions.map((action, index) => (
                <React.Fragment key={index}>
                  <ListItem button onClick={action.action}>
                    <ListItemIcon>{action.icon}</ListItemIcon>
                    <ListItemText primary={action.text} />
                  </ListItem>
                  {index < quickActions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* NEW: Recent Orders with Payment Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders & Payments
            </Typography>
            <List>
              {recentOrders.map((order, index) => (
                <React.Fragment key={order.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Order #${order.orderNumber}`}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            ₹{order.totalAmount} - {new Date(order.createdAt).toLocaleDateString()}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Chip
                              label={order.status}
                              color={getOrderStatusColor(order.status)}
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Chip
                              label={order.paymentStatus || 'PENDING'}
                              color={getPaymentStatusColor(order.paymentStatus)}
                              size="small"
                            />
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentOrders.length - 1 && <Divider />}
                </React.Fragment>
              ))}
              {recentOrders.length === 0 && (
                <ListItem>
                  <ListItemText primary="No recent orders" />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
