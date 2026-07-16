import { useState } from "react";
import logo from "../assets/images/logo.svg";
import cart from "../assets/images/cart.svg";
import search from "../assets/images/search.svg";
import { navLinks, useCartStore } from "../Store/index";
import { Link } from "react-router-dom";
import { FiUser, FiHeart, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const { cartItems } = useCartStore();
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header>
            <nav>
                <img src={logo} alt="Apple logo" />

                {/* Desktop nav links */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ label, href }) => (
                        <li key={label}>
                            <Link
                                to={href}
                                className="text-white opacity-80 hover:opacity-100 transition duration-300">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex-center gap-5">
                    <button>
                        <img src={search} alt="search icon" width={16} />
                    </button>
                    <Link to="/wishlist" className="text-white opacity-80 hover:opacity-100 transition hidden md:block">
                        <FiHeart size={18} />
                    </Link>
                    <Link to="/login" className="text-white opacity-80 hover:opacity-100 transition hidden md:block">
                        <FiUser size={18} />
                    </Link>
                    <Link to="/cart" className="relative hidden md:block">
                        <img src={cart} alt="cart icon" width={16} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Hamburger button - mobile only */}
                    <button
                        className="md:hidden text-white cursor-pointer z-[60]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-[55] flex flex-col items-center justify-center gap-6 transition-all duration-300 md:hidden ${
                    isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                }`}
            >
                {navLinks.map(({ label, href }) => (
                    <Link
                        key={label}
                        to={href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white text-2xl font-semibold opacity-80 hover:opacity-100 hover:text-[#0071e3] transition-all duration-300"
                    >
                        {label}
                    </Link>
                ))}

                <div className="h-px w-40 bg-gray-700 my-4"></div>

                <div className="flex items-center gap-8">
                    <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="text-white opacity-80 hover:opacity-100 transition">
                        <FiHeart size={22} />
                    </Link>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-white opacity-80 hover:opacity-100 transition">
                        <FiUser size={22} />
                    </Link>
                    <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="relative text-white opacity-80 hover:opacity-100 transition">
                        <img src={cart} alt="cart icon" width={20} className="invert" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
