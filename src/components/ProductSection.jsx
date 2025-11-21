import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const ProductSection = ({ title, products = [], linkTo }) => (
  <section className="mt-12">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      {linkTo && (
        <Link to={linkTo} className="text-sm text-gray-600 hover:underline">
          GET TO SHOP
        </Link>
      )}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.slice(0, 8).map((product, index) => (
        <div key={product.id ?? index} className={index >= 4 ? "hidden lg:block" : ""}>
          <ProductCard
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.image_url || product.image}
            description={product.description}
            category={product.category}
          />
        </div>
      ))}
    </div>
  </section>
);

export default ProductSection;
