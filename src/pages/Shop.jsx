import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../services/products";
import ProductCard from "../components/ProductCard";
import { mobilePlaceholder } from "../services/products";
import { watchPlaceholder } from "../services/products";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const category = params.get("category"); // mobile OR watch

  useEffect(() => {
    setLoading(true);
    getProducts(currentPage, category).then((response) => {
      setProducts(response.data.data);
      setLastPage(response.data.last_page);
      setLoading(false);
    });
  }, [currentPage, category]);

  const getTitle = () => {
    if (category === "mobile") return "Mobile Phones";
    if (category === "watch") return "Watches";
    return "All Products";
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCurrentPage(1); // reset to first page
    if (newCategory) {
      navigate(`?category=${newCategory}`);
    } else {
      navigate(""); // show all products
    }
  };

  return (
    <div className="container mx-auto py-10">
      {/* Header with dropdown filter */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{getTitle()}</h2>

        <select
          value={category || ""}
          onChange={handleCategoryChange}
          className="border border-neutral-400 outline-none px-3 py-2  rounded"
        >
          <option value="">All Products</option>
          <option value="mobile">Mobile Phones</option>
          <option value="watch">Watches</option>
        </select>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.image_url}
              description={product.description}
              category={product.category}
              watchPlaceholder={watchPlaceholder}
              mobilePlaceholder={mobilePlaceholder}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2">
          {currentPage} / {lastPage}
        </span>

        <button
          disabled={currentPage === lastPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Shop;
