import React, { useState } from 'react';
import { useCartStore } from '../../Store/index';
import toast from 'react-hot-toast';

const products = [
    {
        id: 1,
        name: "MacBook Pro 14\"",
        price: 1599,
        image: "https://www.apple.com/v/macbook-pro/aj/images/overview/closer-look/space_black__b13x154uux0i_large.jpg",
        description: "M3 Pro or M3 Max chip. The most advanced Mac ever."
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        price: 999,
        image: "https://www.apple.com/v/iphone-15-pro/c/images/overview/closer-look/all_colors__eppfcocn9mky_large.jpg",
        description: "Titanium. So strong. So light. So Pro."
    },
    {
        id: 3,
        name: "Apple Watch Series 9",
        price: 399,
        image: "https://www.apple.com/v/apple-watch-series-9/b/images/overview/closer-look/aluminum_pink__ckm1y90e1c2q_large.jpg",
        description: "Smarter. Brighter. Mightier."
    },
    {
        id: 4,
        name: "AirPods Pro",
        price: 249,
        image: "https://www.apple.com/v/airpods-pro/h/images/overview/magic/magic_hero__dzkxsc4fokau_large.jpg",
        description: "Adaptive Audio. Now playing."
    }
];

export default function Store() {
    const { addToCart } = useCartStore();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
        setSelectedProduct(null);
    };

    return (
        <div className="min-h-screen text-white pt-20 pb-20 px-8 max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-10 text-center mt-10">Store. <span className="text-gray-400">The best way to buy the products you love.</span></h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <div key={product.id} className="bg-[#1d1d1f] rounded-2xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                        <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-400 mb-6 text-center">{product.description}</p>
                        <div className="h-40 w-full mb-6 flex justify-center items-center">
                            <img src={product.image} alt={product.name} className="max-h-full object-contain" />
                        </div>
                        <p className="text-lg font-medium mt-auto">From ${product.price}</p>
                    </div>
                ))}
            </div>

            {/* Product Popup Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
                    <div className="bg-[#1d1d1f] rounded-3xl p-8 max-w-2xl w-full relative flex flex-col md:flex-row gap-8 items-center border border-gray-800">
                        <button 
                            className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/20 rounded-full w-8 h-8 flex items-center justify-center"
                            onClick={() => setSelectedProduct(null)}
                        >
                            ✕
                        </button>
                        
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full object-contain rounded-xl" />
                        </div>
                        
                        <div className="w-full md:w-1/2 flex flex-col items-start">
                            <h2 className="text-3xl font-bold mb-4">{selectedProduct.name}</h2>
                            <p className="text-gray-400 mb-6 text-lg">{selectedProduct.description}</p>
                            <p className="text-2xl font-semibold mb-8">${selectedProduct.price}</p>
                            
                            <button 
                                className="w-full bg-primary text-white py-3 px-6 rounded-full font-semibold text-lg hover:bg-blue-600 transition-colors"
                                onClick={() => handleAddToCart(selectedProduct)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
