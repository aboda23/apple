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

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import MainLayout from "../layout/MainLayout";

import Mac from "../pages/Mac/Mac";
import Store from "../pages/Store/Store";
import Iphone from "../pages/Iphone/Iphone";
import Watch from "../pages/Watch/Watch";
import Airpods from "../pages/AirPods/Airpods";
import Vision from "../pages/Vision/Vision";

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/mac" element={<Mac />} />
                <Route path="/iphone" element={<Iphone />} />
                <Route path="/watch" element={<Watch />} />
                <Route path="/airpods" element={<Airpods />} />
                <Route path="/vision" element={<Vision />} />
                
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
                
                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Protected Routes Group (Might have different layout) */}
            <Route element={<AdminRoute />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    );
}
