import logo from "../assets/images/logo.svg";
import cart from "../assets/images/cart.svg";
import search from "../assets/images/search.svg";
import { navLinks } from "../Store/index";
import { Link } from "react-router-dom";
const Navbar = () => {
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
                <div className="flex-center gap-3">
                    <button>
                        <img src={search} alt="search icon" />
                    </button>
                    <button>
                        <img src={cart} alt="cart icon" />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
