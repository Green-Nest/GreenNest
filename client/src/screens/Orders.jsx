import React from 'react';
import { orders } from '../screens';

const Orders = () => {
  return (
    <div>
      <h2>Order History</h2>
      {orders.map(order => (
        <div key={order.id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Items:</strong></p>
          <ul>
            {order.items.map(item => (
              <li key={item.name}>{item.name} (Qty: {item.qty})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
