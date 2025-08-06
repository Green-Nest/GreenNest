import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  IconButton
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { adminService } from '../../services/adminService';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [tabValue]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let response;
      
      switch (tabValue) {
        case 0: // All Users
          response = await adminService.getAllUsers();
          break;
        case 1: // Customers
          response = await adminService.getCustomers();
          break;
        case 2: // Admins
          response = await adminService.getAdmins();
          break;
        default:
          response = await adminService.getAllUsers();
      }
      
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      try {
        const response = await adminService.deleteUser(userId);
        if (response.success) {
          toast.success('User deactivated successfully');
          fetchUsers();
        }
      } catch (error) {
        toast.error('Failed to deactivate user');
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
      <Typography variant="h4" gutterBottom>
        User Management 👥
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Users" />
          <Tab label="Customers" />
          <Tab label="Admins" />
        </Tabs>
      </Box>

      {users && users.length > 0 ? (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {user.email}
                      </Typography>
                      <Chip
                        label={user.role}
                        color={user.role === 'ADMIN' ? 'secondary' : 'primary'}
                        size="small"
                      />
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(user.id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Box>

                  <Typography variant="body2" color="textSecondary">
                    Phone: {user.phone || 'Not provided'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Location: {user.city}, {user.state}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="textSecondary">
            No users found
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default AdminUsers;
