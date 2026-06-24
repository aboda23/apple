import logo from "../assets/images/logo.svg";
import cart from "../assets/images/cart.svg";
import search from "../assets/images/search.svg";
import { navLinks, useCartStore } from "../Store/index";
import { Link } from "react-router-dom";
import { FiUser, FiHeart } from "react-icons/fi";

const Navbar = () => {
    const { cartItems } = useCartStore();
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header>
            <nav>
                <img src={logo} alt="Apple logo" />

                <ul>
                    {navLinks.map(({ label, href }) => (
                        <li key={label}>
                            <Link
                                to={href} // هنا هو الـ route path الصح
                                className="text-white hover:text-blue-500 transition">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex-center gap-5">
                    <button>
                        <img src={search} alt="search icon" width={16} />
                    </button>
                    <Link to="/wishlist" className="text-white opacity-80 hover:opacity-100 transition">
                        <FiHeart size={18} />
                    </Link>
                    <Link to="/login" className="text-white opacity-80 hover:opacity-100 transition">
                        <FiUser size={18} />
                    </Link>
                    <Link to="/cart" className="relative">
                        <img src={cart} alt="cart icon" width={16} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
