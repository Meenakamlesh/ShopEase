import { Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import ThankYou from "./pages/ThankYou";

const App = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const cartArray = Array.isArray(prevCart) ? prevCart : [];
      const exists = cartArray.find((item) => item.id === product.id);
      return exists
        ? cartArray.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...cartArray, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-gray-600 ">
      <nav className="flex justify-between items-center p-4 bg-gray-600 shadow-md sticky top-0 z-10">
        <Link to="/" className="text-2xl font-bold text-gray-300 hover:text-blue-600 transition-colors">
          ShopEase
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-300 font-bold hover:text-blue-600 transition-colors">
            Products
          </Link>
          <Link to="/cart" className="text-gray-300 font-bold hover:text-blue-600 transition-colors flex items-center">
            Cart
            <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
              {cart.length}
            </span>
          </Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<ProductList addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;