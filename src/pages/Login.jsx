import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loader } from "../Store/LoaderState";
import RegisterLoader from "../components/ui/RegisterLoader";

const LoginPage = () => {
const openLoader = loader((state) => state.openLoader);
    const closeLoader = loader((state) => state.closeLoader);
    const isLoading = loader((state) => state.isLoading);

    
    const navigate = useNavigate();
    ///! handle submit function
    //http://localhost:1337/api/auth/local
    const handleSubmit = (values) => {
        // console.log(values);
        let domain = "http://localhost:1337";
        let endpoint = "/api/auth/local";
        let url = domain + endpoint;
        const data = {
            identifier: values.appleId,
            password: values.password,
        };
        axios.post(url, data).then((response) => {
            console.log("Login successful:", response.data);
            const userName = response.data.user.username;
            openLoader(userName);
            setTimeout(() => {
                toast.success("Login successful!");
            } , 2000);
            setTimeout(() => {
                closeLoader();
                navigate("/");
            }, 4000);
            let jwtToken = response.data.jwt;
            localStorage.setItem("token", jwtToken);
            
            
        }).catch((error) => {
            console.error("Login error:", error.response ? error.response.data : error.message);
            setTimeout(() => {
                toast.error("Login failed. Please check your credentials.");
            }, 2000);
            
        });
    };
    ///! validation schema
    const validationSchema = Yup.object({
        appleId: Yup.string().required("Apple ID is required"),
        password: Yup.string().required("Password is required"),
    });

    return (
        // Background: Dark Gray instead of pure black
        <div className="min-h-screen bg-[#121212] flex items-center justify-center font-sans antialiased text-white p-4">
            {isLoading && <RegisterLoader />}
            {/* Card: Glassmorphism effect + White Shadow */}
            <div className="w-full max-w-[400px] p-8 space-y-6 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                {/* Header Section */}
                <div className="text-center">
                    <svg className="w-10 h-10 mx-auto mb-4 fill-current text-white/90" viewBox="0 0 384 512">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                    <h1 className="text-2xl font-semibold tracking-tight text-white/90">Sign In to Apple</h1>
                </div>

                {/* Inputs Section */}
                <Formik initialValues={{ appleId: "", password: "" }} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    <Form className="space-y-3">
                        <Field
                            name="appleId"
                            type="text"
                            placeholder="Apple ID"
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                        />
                        <ErrorMessage name="appleId" component="div" className="text-xs text-red-500 mt-1" />

                        <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                        />
                        <ErrorMessage name="password" component="div" className="text-xs text-red-500 mt-1" />
                        <button type="submit" className="w-full h-11 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition-all active:scale-95">
                            Continue
                        </button>
                    </Form>
                </Formik>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <div className="flex items-center py-2">
                        <div className="flex-grow border-t border-white/10"></div>
                        <span className="px-3 text-xs text-gray-500 uppercase tracking-widest">or</span>
                        <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    {/* Apple Button */}
                    <button className="w-full h-11 flex items-center justify-center border border-white/10 rounded-xl hover:bg-white/5 transition-colors group">
                        <svg className="w-4 h-4 mr-2 fill-current text-white/80 group-hover:text-white" viewBox="0 0 384 512">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                        </svg>
                        <span className="text-sm font-medium text-white/80 group-hover:text-white">Continue with Apple</span>
                    </button>
                </div>

                {/* Footer Links */}
                <div className="text-center pt-2 space-y-3">
                    <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                        Forgot Apple ID or Password?
                    </a>
                    <div className="border-t border-white/5 pt-4">
                        <p className="text-xs text-gray-500">
                            Don't have an Apple ID?{" "}
                            <Link to="/register" className="text-blue-400 hover:underline ml-1">
                                Create yours now.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
