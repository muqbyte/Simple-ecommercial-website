import axios from 'axios';
import { useState } from 'react';

export const handleAddToCart = async (caption, price, userUUID,cartId) => {
  const postData = {
    userId:userUUID,
    cartId,
    Items: caption,
    Quantities: 1,
    Price: parseFloat(price),
  };

  console.log(postData)

  try {
    // Send a POST request to the backend
    const response = await axios.post('http://localhost:3200/cartitems', postData);
    console.log('Item added to cart:', response.data);
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};
