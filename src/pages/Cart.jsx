import { useEffect } from "react";
import { motion } from "framer-motion";

const Cart = ({ cart, setCart }) => {
  const updateQuantity = (id, amount) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, parseInt(amount)) } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-4 md:py-8 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-6 md:mb-8 text-center">
        Your Shopping Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-center text-base sm:text-lg text-gray-300">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 object-contain"
                  />
                  <div className="text-center sm:text-left">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className="w-16 p-2 border rounded-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-red-600 transition-colors text-sm sm:text-base"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
              Total: ${total}
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-full shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 text-sm sm:text-base font-semibold flex items-center justify-center"
            >
              <span>Proceed to Checkout</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;