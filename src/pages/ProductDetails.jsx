import { useParams } from "react-router-dom";
import { mobilePlaceholder, watchPlaceholder } from "../services/products";
import { useCart } from "../context/CartContext";

function ProductDetails({ products }) {
  const { id } = useParams();
  const category = products.find((p) => p.id === parseInt(id))?.category;
  const product = products.find((p) => p.id === parseInt(id));
  const productImg = product?.image_url;
  const imageUrl = product?.image_url;
  const name = product?.name;
  const price = product?.price;
  const { addToCart } = useCart();

  if (!product) {
    return <p className="text-center py-10">Product not found</p>;
  }
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
    <section className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-10 bg-white shadow-lg rounded-xl p-6">
        <div className="flex-1 flex justify-center">
          <img
            src={productImg || getFallback()}
            alt={product.name}
            className="w-full max-w-md rounded-lg shadow-md"
            onError={(e) => {
              e.target.onerror = null; // prevent infinite loop
              e.target.src = getFallback(); // fallback
            }}
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            {product.old_price && (
              <span className="text-gray-400 line-through text-lg">
                ${product.old_price}
              </span>
            )}
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
            onClick={() => addToCart({ id, name, price, imageUrl , category } )}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
