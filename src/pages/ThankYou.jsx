import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Redirect to home page after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center px-4 min-w-screen">
      <h1 className="text-3xl font-bold text-green-600">Thank You for Your Purchase! 🎉</h1>
      <p className="text-lg text-gray-700 mt-2">Your order has been placed successfully.</p>
      <p className="text-sm text-gray-500">Redirecting you to the home page...</p>
    </div>
  );
}

export default ThankYou;
