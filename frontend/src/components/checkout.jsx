const CheckoutModal = ({ totalAmount, onPayByCard, onPayAtCounter, onClose }) => (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>
        <p className="mb-4">Total Bill: RM {totalAmount.toFixed(2)}</p>
        <div className="flex justify-between mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={onPayByCard}
          >
            Pay by Card
          </button>
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
            onClick={onPayAtCounter}
          >
            Pay at the Counter
          </button>
        </div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
  
  export default CheckoutModal;
  