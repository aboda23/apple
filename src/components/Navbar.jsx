import { useState, useEffect } from "react";
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
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {}
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        window.location.reload();
    };

    return (
        <header>
            <nav className="w-full container mx-auto flex items-center justify-between px-5 2xl:px-0 relative h-full">
                {/* Logo (Left) */}
                <div className="flex flex-1 justify-start">
                    <img src={logo} alt="Apple logo" className="cursor-pointer hover:opacity-80 transition-opacity w-[18px]" />
                </div>

                {/* Desktop nav links (Center) */}
                <ul className="hidden md:flex items-center justify-center gap-10 flex-1">
                    {navLinks.map(({ label, href }) => (
                        <li key={label}>
                            <Link
                                to={href}
                                className="text-white text-[13px] opacity-80 hover:opacity-100 transition duration-300">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Icons (Right) */}
                <div className="flex flex-1 justify-end items-center gap-7 z-[100]">
                    <button className="text-white opacity-80 hover:opacity-100 transition">
                        <img src={search} alt="search icon" width={20} />
                    </button>
                    <Link to="/wishlist" className="text-white opacity-80 hover:opacity-100 transition hidden md:block">
                        <FiHeart size={22} />
                    </Link>
                    {user ? (
                        <div className="relative group cursor-pointer hidden md:block">
                            <div className="w-[22px] h-[22px] rounded-full bg-white/20 flex items-center justify-center text-white text-[11px] font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <div className="absolute top-full right-[-10px] mt-2 w-36 bg-[#1a1a1a] rounded-xl shadow-2xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all overflow-hidden">
                                <div className="p-3 text-[11px] text-white/50 border-b border-white/10 truncate">{user.name}</div>
                                <button onClick={handleLogout} className="w-full text-left p-3 text-[13px] text-[#ff3b30] hover:bg-white/5 transition-colors cursor-pointer">Sign Out</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="text-white opacity-80 hover:opacity-100 transition hidden md:block">
                            <FiUser size={22} />
                        </Link>
                    )}
                    <Link to="/cart" className="relative hidden md:block opacity-80 hover:opacity-100 transition">
                        <img src={cart} alt="cart icon" width={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#0071e3] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Hamburger button - mobile only */}
                    <button
                        className="md:hidden text-white cursor-pointer z-[60] opacity-80 hover:opacity-100 transition"
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
