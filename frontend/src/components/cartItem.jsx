const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => (
    <li key={item.cartid} className="flex items-center justify-between border-b py-2">
      <div className="flex-1 ml-4">
        <p className="font-medium">{item.items}</p>
        <p className="text-sm text-gray-600">RM {item.price}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => onDecrement(item.cartid)}
            className="h-5 w-5 border rounded bg-gray-100 hover:bg-gray-200"
          >
            -
          </button>
          <input
            type="text"
            value={item.quantities}
            readOnly
            className="w-8 text-center border-none"
          />
          <button
            onClick={() => onIncrement(item.cartid)}
            className="h-5 w-5 border rounded bg-gray-100 hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.cartid)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </li>
  );
  
  export default CartItem;
  