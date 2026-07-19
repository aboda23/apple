import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";

// Global styles for fixing Chrome Autofill blue background issue in Dark Mode
const autofillStyles = `
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px #2a2a2a inset !important;
      -webkit-text-fill-color: white !important;
      transition: background-color 5000s ease-in-out 0s;
      border-radius: 12px;
  }
`;

const LoginPage = () => {
    const [appleId, setAppleId] = useState("admin@apple.com");
    const [password, setPassword] = useState("apple123");
    const navigate = useNavigate();

    const handleSuccess = (providerName, userName) => {
        toast.success(`Successfully signed in with ${providerName}!`, {
            style: { background: '#222', color: '#fff', border: '1px solid #333' },
            iconTheme: { primary: '#fff', secondary: '#000' }
        });
        
        setTimeout(() => {
            // Simulate saving user auth
            localStorage.setItem("token", `dummy-jwt-token-${providerName}`);
            localStorage.setItem("user", JSON.stringify({ name: userName, email: appleId, provider: providerName }));
            navigate("/");
        }, 1000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!appleId || !password) {
            toast.error("Please enter your Apple ID and password.");
            return;
        }
        if (appleId === "admin@apple.com" && password === "apple123") {
            handleSuccess("Email", "Steve Jobs");
        } else {
            toast.error("Invalid Apple ID or password.", {
                style: { background: '#222', color: '#fff', border: '1px solid #333' }
            });
        }
    };

    const handleSocialLogin = (provider) => {
        if (provider === "Apple") {
            handleSuccess("Apple", "Tim Cook");
        } else if (provider === "Google") {
            handleSuccess("Google", "Sundar Pichai");
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#000', 
            backgroundImage: 'radial-gradient(circle at 50% -20%, #1a1a1a 0%, #000 70%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            padding: '80px 24px 24px' // Added 80px top padding to clear the fixed navbar
        }}>
            <style dangerouslySetInnerHTML={{ __html: autofillStyles }} />
            
            <div style={{ 
                width: '100%', 
                maxWidth: '400px', 
                padding: '32px 28px', // Reduced padding
                backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <svg style={{ width: '40px', height: '40px', fill: '#fff' }} viewBox="0 0 384 512">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                </div>

                <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#fff', textAlign: 'center', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                    Sign in to Apple
                </h1>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    {/* Inputs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Apple ID"
                            value={appleId}
                            onChange={(e) => setAppleId(e.target.value)}
                            style={{
                                width: '100%', height: '48px', padding: '0 16px',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                                border: '1px solid rgba(255, 255, 255, 0.1)', 
                                borderRadius: '10px',
                                color: '#fff', fontSize: '15px', outline: 'none',
                                transition: 'all 0.2s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#2997ff'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%', height: '48px', padding: '0 16px',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                                border: '1px solid rgba(255, 255, 255, 0.1)', 
                                borderRadius: '10px',
                                color: '#fff', fontSize: '15px', outline: 'none',
                                transition: 'all 0.2s ease',
                                letterSpacing: password ? '0.2em' : 'normal'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#2997ff'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={{
                            width: '100%', height: '48px', 
                            backgroundColor: '#fff', color: '#000', 
                            borderRadius: '10px', border: 'none',
                            fontSize: '15px', fontWeight: 600,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            transition: 'transform 0.1s',
                            marginBottom: '24px'
                        }}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Continue <ArrowRight size={18} strokeWidth={2.5} />
                    </button>
                </form>

                {/* Social Logins */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                        <span style={{ fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>or</span>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    </div>

                    <button 
                        type="button"
                        onClick={() => handleSocialLogin('Apple')}
                        style={{
                            width: '100%', height: '48px', 
                            backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#fff', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px',
                            fontSize: '14px', fontWeight: 500,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                    >
                        <svg style={{ width: '18px', height: '18px', fill: '#fff' }} viewBox="0 0 384 512">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                        </svg>
                        Continue with Apple
                    </button>
                    
                    <button 
                        type="button"
                        onClick={() => handleSocialLogin('Google')}
                        style={{
                            width: '100%', height: '48px', 
                            backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#fff', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px',
                            fontSize: '14px', fontWeight: 500,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                    >
                        <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Continue with Google
                    </button>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <a href="#" style={{ color: '#2997ff', fontSize: '13px', textDecoration: 'none' }}>
                        Forgot Apple ID or password?
                    </a>
                    <div style={{ marginTop: '20px', fontSize: '13px', color: '#86868b' }}>
                        Don't have an Apple ID? <Link to="/register" style={{ color: '#2997ff', textDecoration: 'none' }}>Create yours now.</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
