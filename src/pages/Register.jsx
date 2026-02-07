import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loader } from "../Store/LoaderState";
import RegisterLoader from "../components/ui/RegisterLoader";

const RegisterPage = () => {
    ///!loader state
    
    const navigate = useNavigate();
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string("Last Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    const handleSubmit = (values) => {
        // domain -> http://localhost:1337
        // endpoint -> /api/auth/local/register
        let domain = "http://localhost:1337";
        let endpoint = "/api/auth/local/register";
        let url = domain + endpoint;
        const username = values.lastName ? `${values.firstName} ${values.lastName}` : values.firstName;
    

        const data = {
            username,
            email: values.email,
            password: values.password,
        };
        
        axios
            .post(url, data)
            .then((response) => {
                
                console.log("Registration successful:", response.data);
                

                // خزنه مؤقتًا
            

                setTimeout(() => {
                    toast.success("Registration successful!");
                }, 2000);
                setTimeout(() => {
                    navigate("/login");
                    
                }, 3000);
            })
            .catch((error) => {
                console.error("Registration error:", error.response ? error.response.data : error.message);
                setTimeout(() => {
                    toast.error(error.response?.data?.error?.message || "Registration failed. Please check your credentials");
                }, 2000);
            });

        console.log("Form submitted:", values);
    };

    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center font-sans antialiased text-white p-4 overflow-hidden">
            
            <div className="w-full max-w-[380px] p-6 space-y-4 bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.03)]">
                <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-3 fill-current text-white/90" viewBox="0 0 384 512">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                    <h1 className="text-xl font-semibold tracking-tight text-white/90">Create Apple ID</h1>
                </div>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                            <Field
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                className="w-full h-10 bg-white/5 border border-white/10 rounded-xl px-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-500"
                            />
                            <ErrorMessage name="firstName" component="div" className="text-xs text-red-500 mt-1" />
                            <Field
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                className="w-full h-10 bg-white/5 border border-white/10 rounded-xl px-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-500"
                            />
                        </div>

                        <Field
                            name="email"
                            type="email"
                            placeholder="Apple ID (Email)"
                            className="w-full h-10 bg-white/5 border border-white/10 rounded-xl px-4 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-500"
                        />
                        <ErrorMessage name="email" component="div" className="text-xs text-red-500 mt-1" />

                        <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="w-full h-10 bg-white/5 border border-white/10 rounded-xl px-4 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-500"
                        />
                        <ErrorMessage name="password" component="div" className="text-xs text-red-500 mt-1" />

                        <button type="submit" className="w-full h-10 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-200 transition-all active:scale-95">
                            Create Account
                        </button>
                    </Form>
                </Formik>

                <div className="space-y-3 pt-1">
                    <div className="flex items-center">
                        <div className="flex-grow border-t border-white/10"></div>
                        <span className="px-2 text-[9px] text-gray-500 uppercase tracking-widest">Or</span>
                        <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    <button className="w-full h-10 flex items-center justify-center border border-white/10 rounded-xl hover:bg-white/5 transition-colors group">
                        <svg className="w-4 h-4 mr-2 fill-current text-white/90" viewBox="0 0 384 512">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                        </svg>
                        <span className="text-xs font-medium">Continue with Apple</span>
                    </button>
                </div>

                <div className="text-center pt-2 border-t border-white/5">
                    <p className="text-[11px] text-gray-500">
                        Have an Apple ID?{" "}
                        <Link to="/login" className="text-blue-400 hover:underline ml-1">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
