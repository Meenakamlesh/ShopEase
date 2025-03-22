import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
};

const ProductList = ({ addToCart }) => {
  const { data: products, error, isLoading } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const [sort, setSort] = useState("rating");
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center text-lg text-gray-600 mt-10">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Oops! Something went wrong.</p>;

  const sortedProducts = [...products].sort((a, b) =>
    sort === "price" ? a.price - b.price : b.rating.rate - a.rating.rate
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-300 mb-4 sm:mb-0">Explore Our Collection</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setSort("price")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              sort === "price"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Sort by Price
          </button>
          <button
            onClick={() => setSort("rating")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              sort === "rating"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Sort by Rating
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain p-4"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.title}</h2>
              <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Rating: {product.rating.rate} / 5</p>
              <button
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductList;