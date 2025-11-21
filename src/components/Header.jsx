import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useCart } from "../context/CartContext";

const Header = ({ products = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cart } = useCart();
  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setSearchTerm("");
    setFilteredProducts([]);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(results);
  };

  return (
    <header className="flex flex-row justify-between items-center py-6 sm:py-8 border-b border-gray-200 px-4 relative">
      <Link to="/" className="text-2xl font-bold uppercase tracking-widest">
        MiniStore
      </Link>

      {/* Mobile icons */}
      <div className="sm:hidden flex items-center space-x-4 relative">
        <button
          onClick={toggleSearch}
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>

        <Link
          to="/cart"
          className="relative text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ShoppingCartIcon className="h-6 w-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
        <button
          onClick={toggleMenu}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <Bars3Icon className="h-7 w-7" />
        </button>

        {/* Search input + dropdown (Mobile) */}
        {searchOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-2 z-20">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
              autoFocus
              className="w-full border px-3 py-2 rounded"
            />
            {filteredProducts.length > 0 && (
              <div className="mt-2 max-h-64 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop navigation */}
      <nav className="hidden sm:flex flex-nowrap justify-end items-center space-x-0 relative">
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 px-2 py-1"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 px-2 py-1"
        >
          Shop
        </Link>
        <Link
          to="/about"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 px-2 py-1"
        >
          About
        </Link>
        <Link
          to="/blogs"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 px-2 py-1"
        >
          Blogs
        </Link>
        <Link
          to="/contact"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 px-2 py-1"
        >
          Contact
        </Link>

        <button
          onClick={toggleSearch}
          className="text-gray-600 hover:text-gray-900 px-2 py-1"
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
        <Link
          to="/cart"
          className="relative text-gray-600 hover:text-gray-900 transition-colors duration-200 px-2 py-1"
        >
          <ShoppingCartIcon className="h-6 w-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 left-5 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        {/* Search input + dropdown (Desktop) */}
        {searchOpen && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-neutral-400 rounded-lg shadow-lg p-2 z-20">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
              autoFocus
              className="w-full border border-neutral-400 px-3 py-2 rounded outline-none"
            />
            {filteredProducts.length > 0 && (
              <div className="mt-2 max-h-64 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`absolute top-full right-0 mt-2 w-full bg-white rounded-md shadow-lg py-2 z-10 ${
          isOpen ? "block" : "hidden"
        } sm:hidden`}
      >
        <Link
          to="/"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Shop
        </Link>
        <Link
          to="/about"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          About
        </Link>
        <Link
          to="/blogs"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Blogs
        </Link>
        <Link
          to="/contact"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Contact
        </Link>
      </div>
    </header>
  );
};

export default Header;
