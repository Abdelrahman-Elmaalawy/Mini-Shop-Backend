import { Link } from "react-router-dom";
import ProductSection from "../components/ProductSection";
import { 
  TruckIcon, 
  ShieldCheckIcon, 
  TagIcon, 
  LockClosedIcon 
} from "@heroicons/react/24/solid";
import { watchPlaceholder, mobilePlaceholder } from "../services/products";

function Home({ mobileProducts, watchProducts , loading }) {
  return (
    <>
      <section className="bg-white rounded-xl shadow-lg mt-8 overflow-hidden">
        <div className="relative flex flex-col lg:flex-row items-center justify-between p-8 sm:p-16">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-gray-800 mb-6">
              YOUR PRODUCTS
              <br />
              ARE GREAT
            </h1>
            <Link 
              to="/shop"
              className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              SHOP PRODUCTS
            </Link>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0 relative">
            <img
              src={watchPlaceholder[0]}
              alt="Smart Watch"
              className="w-4/5 h-auto rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-col sm:flex-row justify-around items-center bg-white p-8 rounded-xl shadow-lg mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="text-center">
          <TruckIcon className="w-8 h-8 text-gray-700 mx-auto mb-2" />
          <p className="text-sm font-medium">FREE DELIVERY</p>
        </div>
        <div className="text-center">
          <ShieldCheckIcon className="w-8 h-8 text-gray-700 mx-auto mb-2" />
          <p className="text-sm font-medium">QUALITY GUARANTEE</p>
        </div>
        <div className="text-center">
          <TagIcon className="w-8 h-8 text-gray-700 mx-auto mb-2" />
          <p className="text-sm font-medium">DAILY OFFERS</p>
        </div>
        <div className="text-center">
          <LockClosedIcon className="w-8 h-8 text-gray-700 mx-auto mb-2" />
          <p className="text-sm font-medium">100% SECURE PAYMENT</p>
        </div>
      </section>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <ProductSection 
            title="MOBILE PRODUCTS" 
            products={mobileProducts} 
            linkTo="/shop?category=mobile" 
          />
          <ProductSection 
            title="SMART WATCHES" 
            products={watchProducts} 
            linkTo="/shop?category=watch"   
          />
        </>
      )}

      {/* Sale Section */}
      <section className="bg-black text-white rounded-xl shadow-lg mt-12 overflow-hidden">
        <div className="relative flex flex-col md:flex-row items-center justify-between p-8 sm:p-16">
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <p className="text-sm uppercase tracking-widest text-gray-400">
              -10% OFF
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              NEW YEAR SALE
            </h2>
            <Link to="/shop" className="text-sm underline">
              Shop Now
            </Link>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={mobileProducts[4]?.image_url || mobilePlaceholder[0]}
              alt="Phone on sale"
              className="w-4/5 h-auto rounded-xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
