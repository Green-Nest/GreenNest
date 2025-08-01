import React from 'react';

const OrderTracking = () => {
  const trackingInfo = {
    orderId: 'ORD123',
    status: 'Out for Delivery',
    expectedDelivery: '2025-07-28',
  };

  return (
    <div>
      <h2>Order Tracking</h2>
      <p><strong>Order ID:</strong> {trackingInfo.orderId}</p>
      <p><strong>Status:</strong> {trackingInfo.status}</p>
      <p><strong>Expected Delivery:</strong> {trackingInfo.expectedDelivery}</p>
    </div>
  );
};

export default OrderTracking;
