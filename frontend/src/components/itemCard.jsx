import { useState,useEffect } from 'react';
import '../assets/font.css'
import axios from 'axios';
import { handleAddToCart } from '../hooks/post';
import { useDispatch } from 'react-redux';
import { increment } from '../store/counterSlice'
import { v4 as uuidv4 } from 'uuid';

const getUserUUID = () => {
  let uuid = localStorage.getItem('user_uuid');
  if (!uuid) {
    uuid = uuidv4();  // Generate new UUID if it doesn't exist
    localStorage.setItem('user_uuid', uuid);  // Store in localStorage
  }
  return uuid;
};

const ItemCard = ({ image, caption, price, title,cartId }) => {
  const [userUUID, setUserUUID] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const uuid = getUserUUID(); // Get the UUID when the component mounts
    setUserUUID(uuid);  // Set the UUID to the state
  }, []);  // Empty dependency array ensures it runs once when the component moun

  const onAddToCart = () => {
    dispatch(increment()); // Dispatch increment to Redux store
    handleAddToCart(caption, price, userUUID, cartId); // Call your API logic
  };

  return (
    <section>
      <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-sm flex flex-row md:flex-col md:items-center">
      
        <div className="h-24 w-2/4 relative group" >
          <a href="#">
            <img
              className="mx-auto h-full object-cover dark:block"
              src={image}
              alt={title}
            />
          </a>
         
          <button  onClick={onAddToCart} className="absolute inset-0 m-auto hidden h-10 w-3/4 bg-blue-500 text-white rounded-lg group-hover:flex justify-center items-center hover:bg-blue-600 text-xs">
            Add to Cart
          </button>
        </div>

        {/* Caption and Price */}
        <div className="pt-2 text-xs w-full  flex flex-col justify-evenly items-center">
          <a href="#" className="text-center font-semibold leading-tight text-gray-900 dark:text-black overflow-hidden text-ellipsis" style={{fontFamily: "Mona Sans, serif", color:"gray"}}>
            {caption}
          </a>

          <p className="font-semibold text-gray-900 dark:text-black" style={{fontFamily: "Mona Sans, serif", color:"gray"}}>RM {price}</p>
        </div>
      </div>
    </section>
  );
};

export default ItemCard;
