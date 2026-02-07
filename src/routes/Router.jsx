
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Models from "../pages/Models";
import ModelDetails from "../pages/ModelDetails";
import Wishlist from "../pages/WishList";
import Cart from "../pages/Cart";
import Dashboard from "../pages/Admin/Dashboard";
import NotFound from "../pages/NotFound"; 
// import Iphone from "../pages/Iphone";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

export default function AppRouter() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/models" element={<Models />} />
            <Route path="/models/:id" element={<ModelDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User Protected Routes Group */}
            <Route element={<ProtectedRoute />}>
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
            </Route>

            {/* Admin Protected Routes Group */}
            <Route element={<AdminRoute />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
