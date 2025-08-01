import React from 'react';
import Orders from './Orders';
import Profile from './Profile';
import Cart from './Cart';
import OrderTracking from './OrderTracking';

const Dashboard = () => {
  return (
    <div>
      <Profile />
      <Cart />
      <OrderTracking />
      <Orders />
    </div>
  );
};

export default Dashboard;
