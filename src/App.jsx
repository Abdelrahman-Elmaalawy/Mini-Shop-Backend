import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import api from '../axios';
import Shop from './pages/Shop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import mobile1 from "./assets/mobile-.png";
import mobile2 from "./assets/mobile2-.png";
import mobile3 from "./assets/mobile3-.png";
import watch1 from "./assets/watch-.png";
import watch2 from "./assets/watch2-.png";
import watch3 from "./assets/watch3-.png";
import Cart from './pages/Cart';


function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const mobilePlaceholder = [mobile1, mobile2, mobile3];
    const watchPlaceholder = [watch1, watch2, watch3];


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data.data || response.data); 
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const mobileProducts = products.filter((p) => p.category === 'mobile');
    const watchProducts = products.filter((p) => p.category === 'watch'); 

    return (
        <Router>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <Header products={products} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                loading={loading}
                                mobileProducts={mobileProducts}
                                watchProducts={watchProducts}
                            />
                        }
                    />
                    <Route path="/shop" element={<Shop products={products} loading={loading} watchPlaceholder={watchPlaceholder} mobilePlaceholder={mobilePlaceholder}/>} />
                    <Route path="/product/:id" element={<ProductDetails products={products} />} />
                    <Route path='/cart' element={<Cart />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
