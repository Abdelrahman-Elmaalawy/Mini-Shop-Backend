import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { mobilePlaceholder, watchPlaceholder } from "../services/products";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();
  const getFallback = (e) => {
    if (e === "watch") {
      const index = Math.floor(Math.random() * watchPlaceholder.length);
      return watchPlaceholder[index];
    }
    if (e === "mobile") {
      const index = Math.floor(Math.random() * mobilePlaceholder.length);
      return mobilePlaceholder[index];
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/shop" className="text-blue-600">Go shopping</Link>
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-between space-y-4 border-b border-neutral-400 pb-4 sm:flex-row"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl || getFallback(item.category)}
                  alt={item.name}
                  className="w-20 object-cover rounded"
                onError={(e) => {
                    e.target.onerror = null; // prevent infinite loop
                    e.target.src = getFallback(item.category); // fallback
                }}
                />
                <div>
                  <h2 className="w-60 line-clamp-2 font-bold">{item.name}</h2>
                  <p>${item.price}</p>
                </div>
              </div>

              <div className=" flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 bg-neutral-300 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 bg-neutral-300 rounded"
                >
                  +
                </button>
              </div>

              <p className=" w-30 text-center">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-white px-3 py-1 bg-red-500 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center pt-6">
            <h2 className="text-xl font-bold">Total:</h2>
            <p className="text-2xl">${getTotal().toFixed(2)}</p>
          </div>

          <button className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
