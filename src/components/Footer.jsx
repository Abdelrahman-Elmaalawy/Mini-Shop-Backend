
function Footer() {
  return (

    <footer className="mt-16 text-gray-600">
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 lg:space-x-8 pb-8 border-b border-gray-200">
            <div className="w-full lg:w-1/3">
                <h3 className="text-xl font-bold uppercase tracking-widest text-gray-800 mb-4">
                    MiniStore
                </h3>
                <p className="text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam.
                </p>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col sm:flex-row justify-around space-y-8 sm:space-y-0 sm:space-x-4">
                <div>
                    <h4 className="font-bold text-gray-800 mb-4">Quick Links</h4>
                    <ul className="text-sm space-y-2">
                        <li>
                            <a href="#" className="hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Blogs
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Shop
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 mb-4">Help & Info</h4>
                    <ul className="text-sm space-y-2">
                        <li>
                            <a href="#" className="hover:underline">
                                Track Your Order
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Returns & Refunds
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Shipping & Delivery
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full lg:w-1/3">
                <h4 className="font-bold text-gray-800 mb-4">Contact Us</h4>
                <p className="text-sm leading-relaxed">
                    123 Street Name, City, State, 12345
                    <br />
                    Email: info@ministore.com
                    <br />
                    Phone: +1 234 567 8901
                </p>
            </div>
        </div>
        <div className="flex justify-center items-center pt-8 text-sm">
            <p>&copy; 2024 MiniStore. All rights reserved.</p>
        </div>
    </footer>
  );
}

export default Footer