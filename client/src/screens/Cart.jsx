import React from 'react';
import { cartItems } from '../screens/mockData';

const Cart = () => {
  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.name}>
              {item.name} - Qty: {item.qty}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
