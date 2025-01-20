import React, { useState, useEffect } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import '../assets/font.css';
import { useSelector } from 'react-redux';
import CartModal from './cartModel'; // Import the CartModal component
import axios from 'axios';

const TopBar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false); // State to toggle cart modal
  const counter = useSelector((state) => state.counter.value); // Get the counter from Redux store
  const [itemBill, setItemBill] = useState(0); // State to store the cart length (dbLength)
  const [error, setError] = useState(null); // State for error handling

  const userId = localStorage.getItem("user_uuid"); // Get userId from localStorage

  // Toggle the cart modal visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Fetch cart items and update the item count
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:3200/getcartitembyid/${userId}`);
      const dbLength = response.data.data.length;
      setItemBill(dbLength); // Update the cart item count
      console.log("Fetched data:", response.data.data); // Debugging log
    } catch (err) {
      setError("Error fetching cart items"); // Update error state
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCartItems(); // Fetch cart items when userId is available
    }
  }, [userId, counter]); // Fetch when userId or counter (cart changes) change

  return (
    <div
      className="flex flex-row justify-between items-center p-4 shadow-lg rounded-lg"
      style={{ backgroundColor: "#f8f9fa", fontFamily: "Mona Sans, serif" }}
    >
      {/* Left Section */}
      <div className="flex flex-row gap-6 text-gray-700">
        <div>
          <p>Malaysia (MYR)</p>
        </div>
        <div>
          <p>Contact Us</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative cursor-pointer" onClick={toggleCart}>
        {/* Cart Icon */}
        <TiShoppingCart size={30} className="text-gray-800" />

        {/* Cart Count Badge */}
        {itemBill > 0 && (
          <div
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
            style={{
              transform: 'translate(50%, -50%)',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            {itemBill}
          </div>
        )}
      </div>

      {/* Cart Modal */}
      <CartModal isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </div>
  );
};

export default TopBar;
