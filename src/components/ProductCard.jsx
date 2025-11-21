import { Link } from "react-router-dom";
import { mobilePlaceholder } from "../services/products";
import { watchPlaceholder } from "../services/products";
import { useCart } from "../context/CartContext";

const ProductCard = ({ id, name, price, imageUrl, description, category }) => {
    const { addToCart } = useCart();
  
  const getFallback = () => {
    if (category === "watch") {
      const index = Math.floor(Math.random() * watchPlaceholder.length);
      return watchPlaceholder[index];
    }
    if (category === "mobile") {
      const index = Math.floor(Math.random() * mobilePlaceholder.length);
      return mobilePlaceholder[index];
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
      <img
        src={imageUrl || getFallback()}
        alt={name}
        className="w-full h-48 object-contain bg-gray-100"
        onError={(e) => {
          e.target.onerror = null; // prevent infinite loop
          e.target.src = getFallback(); // fallback
        }}
      />

      {/* المحتوى */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[48px]">
            {name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">${price}</p>
          {description && (
            <p className="text-xs text-gray-400 mt-2 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* الأزرار تحت */}
        <div className="flex gap-2 mt-4">
          <button 
          onClick={() => addToCart({ id, name, price, imageUrl , category } )}
          className="flex-1 bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
            Add to Cart
          </button>
          <Link
            to={`/product/${id}`}
            className="flex-1 border border-gray-400 py-2 rounded-lg text-center font-semibold hover:bg-gray-100 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
