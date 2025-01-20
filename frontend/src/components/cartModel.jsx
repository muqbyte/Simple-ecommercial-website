import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "./cartItem";
import CheckoutModal from "./checkout";

const CartModal = ({ isCartOpen, toggleCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const userId = localStorage.getItem("user_uuid");

  useEffect(() => {
    if (isCartOpen && userId) {
      const fetchCartItems = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`http://localhost:3200/getcartitembyid/${userId}`);
          setCartItems(response.data.data);
        } catch (err) {
          setError("Error fetching cart items");
        } finally {
          setLoading(false);
        }
      };
      fetchCartItems();
    } else if (!userId) {
      setError("User ID not found");
      setLoading(false);
    }
  }, [isCartOpen, userId]);

  const incrementQuantity = async (id) => {
    const item = cartItems.find((item) => item.cartid === id);
    if (!item) return;
    const updatedQuantity = { Quantities: item.quantities + 1 };
    await updateItemQuantity(id, updatedQuantity);
  };

  const decrementQuantity = async (id) => {
    const item = cartItems.find((item) => item.cartid === id);
    if (!item) return;
    const updatedQuantity = { Quantities: item.quantities - 1 };
    await updateItemQuantity(id, updatedQuantity);
  };

  const updateItemQuantity = async (id, updatedQuantity) => {
    const cartId = cartItems.find((item) => item.cartid === id).cartid;
    try {
      await axios.put(`http://localhost:3200/cartitems/${cartId}`, updatedQuantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartid === id ? { ...item, quantities: updatedQuantity.Quantities } : item
        )
      );
    } catch (error) {
      alert("Failed to update quantity");
    }
  };

  const removeItem = async (id) => {
    const cartId = cartItems.find((item) => item.cartid === id).cartid;
    try {
      await axios.delete(`http://localhost:3200/deleteitembyid/${cartId}`);
      setCartItems((prevItems) => prevItems.filter(item => item.cartid !== cartId));
    } catch (error) {
      alert("Failed to delete item");
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantities, 0);
  };

  const openCheckoutModal = () => setIsCheckoutModalOpen(true);
  const closeCheckoutModal = () => setIsCheckoutModalOpen(false);

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="bg-white w-96 rounded-lg shadow-lg p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {loading ? <p>Loading...</p> : error ? <p className="text-red-500">{error}</p> : (
          cartItems.length === 0 ? <p>No items in your cart yet.</p> : (
            <ul className="overflow-y-auto max-h-60">
              {cartItems.map((item) => (
                <CartItem
                  key={item.cartid}
                  item={item}
                  onIncrement={incrementQuantity}
                  onDecrement={decrementQuantity}
                  onRemove={removeItem}
                />
              ))}
            </ul>
          )
        )}

        <div className="mt-4 flex justify-between items-center">
          <span className="font-semibold">Total: RM {calculateTotalPrice().toFixed(2)}</span>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            onClick={openCheckoutModal}
          >
            Checkout
          </button>
        </div>

        <button
          onClick={toggleCart}
          className="mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>

      {isCheckoutModalOpen && (
        <CheckoutModal
          totalAmount={calculateTotalPrice()}
          onPayByCard={() => alert("Pay by Card selected")}
          onPayAtCounter={() => alert("Pay at Counter selected")}
          onClose={closeCheckoutModal}
        />
      )}
    </div>
  );
};

export default CartModal;
