import { create } from "zustand";
import p1 from "../assets/images/performance1.png";
import p2 from "../assets/images/performance2.png";
import p3 from "../assets/images/performance3.png";
import p4 from "../assets/images/performance4.png";
import p5 from "../assets/images/performance5.jpg";
import p6 from "../assets/images/performance6.png";
import p7 from "../assets/images/performance7.png";
// import { create } from "zustand";
import video1 from "../assets/videos/feature-1.mp4";
// import { href } from "react-router-dom";
const navLinks = [
    { label: "Home", href: "/" },
    { label: "Store", href: "/store" },
    { label: "Mac", href: "/mac" },
    { label: "iPhone", href: "/iphone" },
    { label: "Watch", href: "/watch" },
    { label: "Vision", href: "/vision" },
    { label: "AirPods", href: "/airpods" }
];

const useCartStore = create((set) => ({
    cartItems: [],
    addToCart: (product) => set((state) => {
        // Group by product id AND selected variants
        const existingItem = state.cartItems.find(item => 
            item.id === product.id && 
            item.selectedStorage === product.selectedStorage && 
            item.selectedSize === product.selectedSize && 
            item.selectedColor?.name === product.selectedColor?.name
        );
        if (existingItem) {
            return {
                cartItems: state.cartItems.map(item =>
                    item.cartItemId === existingItem.cartItemId 
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) } 
                        : item
                )
            };
        }
        return { cartItems: [...state.cartItems, { ...product, quantity: product.quantity || 1 }] };
    }),
    updateCartItem: (cartItemId, updates) => set((state) => ({
        cartItems: state.cartItems.map(item => 
            item.cartItemId === cartItemId ? { ...item, ...updates } : item
        )
    })),
    removeFromCart: (cartItemId) => set((state) => ({
        // Using cartItemId for precise removal
        cartItems: state.cartItems.filter(item => item.cartItemId !== cartItemId)
    })),
    clearCart: () => set({ cartItems: [] })
}));
const useMacbookStore = create((set) => ({
    color: "#2e2c2e",
    setColor: (color) => set({ color }),
    scale: 0.08,
    texture: video1,
    setTexture: (texture) => set({ texture }),
    setScale: (scale) => set({ scale }),
    reset: () => set({ color: "#2e2c2e", scale: 0.08 , texture: video1}),
}));
const noChangeParts = [
    "Object_84",
    "Object_37",
    "Object_34",
    "Object_12",
    "Object_80",
    "Object_35",
    "Object_36",
    "Object_13",
    "Object_125",
    "Object_76",
    "Object_33",
    "Object_42",
    "Object_58",
    "Object_52",
    "Object_21",
    "Object_10",
];
// const performanceImages = [
//     { id: "p1", src: "/performance1.png" },
//     { id: "p2", src: "/performance2.png" },
//     { id: "p3", src: "/performance3.png" },
//     { id: "p4", src: "/performance4.png" },
//     { id: "p5", src: "/performance5.jpg" },
//     { id: "p6", src: "/performance6.png" },
//     { id: "p7", src: "/performance7.png" },
// ];

const performanceImages = [
    { id: "p1", src: p1 },
    { id: "p2", src: p2 },
    { id: "p3", src: p3 },
    { id: "p4", src: p4 },
    { id: "p5", src: p5 },
    { id: "p6", src: p6 },
    { id: "p7", src: p7 },


];

// const performanceImages = [
//     { id: "p1", src: p1 },
//     { id: "p2", src: p2 },
//     { id: "p3", src: p3 },
//     { id: "p4", src: p4 },
//     { id: "p5", src: p5 },
//     { id: "p6", src: p6 },
//     { id: "p7", src: p7 },
// ]

const performanceImgPositions = [
    {
        id: "p1",
        left: 5,
        bottom: 65,
    },
    {
        id: "p2",
        right: 10,
        bottom: 60,
    },
    {
        id: "p3",
        right: -5,
        bottom: 45,
    },
    {
        id: "p4",
        right: -10,
        bottom: 0,
    },
    {
        id: "p5",
        left: 20,
        bottom: 50,
    },
    {
        id: "p6",
        left: 2,
        bottom: 30,
    },
    {
        id: "p7",
        left: -5,
        bottom: 0,
    },
];

const features = [
    {
        id: 1,
        icon: "/feature-icon1.svg",
        highlight: "Email AI.",
        text: "Summarize and draft replies to emails instantly, so you stay on top of your inbox.",
        styles: "left-5 md:left-20 top-[20%] opacity-0 translate-y-5",
    },
    {
        id: 2,
        icon: "/feature-icon2.svg",
        highlight: "Image AI.",
        text: "Generate or edit images with ease. Just type what you imagine, and let AI bring it to life.",
        styles: "right-5 md:right-20 top-[30%] opacity-0 translate-y-5",
    },
    {
        id: 3,
        icon: "/feature-icon3.svg",
        highlight: "Summarize AI.",
        text: "Turn long articles, reports, or notes into clear, bite-sized summaries in seconds.",
        styles: "left-5 md:left-20 top-[50%] opacity-0 translate-y-5",
    },
    {
        id: 4,
        icon: "/feature-icon4.svg",
        highlight: "AirDrop.",
        text: "Wirelessly share photos, large files, and more between your iPhone, your Mac, & other devices.",
        styles: "right-5 md:right-20 top-[70%] opacity-0 translate-y-5",
    },
    {
        id: 5,
        icon: "/feature-icon5.svg",
        highlight: "Writing Tool.",
        text: "Write smarter and faster, whether it’s blogs, essays, or captions, AI helps polish your words.",
        styles: "left-5 md:left-20 top-[90%] opacity-0 translate-y-5",
    },
];

const featureSequence = [
    { videoPath: "/videos/feature-1.mp4", boxClass: ".box1", delay: 1 },
    { videoPath: "/videos/feature-2.mp4", boxClass: ".box2", delay: 0 },
    { videoPath: "/videos/feature-3.mp4", boxClass: ".box3", delay: 0 },
    { videoPath: "/videos/feature-4.mp4", boxClass: ".box4", delay: 0 },
    { videoPath: "/videos/feature-5.mp4", boxClass: ".box5", delay: 0 },
];

const footerLinks = [
    { label: "Privacy Policy", link: "#" },
    { label: "Terms of Use", link: "#" },
    { label: "Sales Policy", link: "#" },
    { label: "Legal", link: "#" },
    { label: "Site Map", link: "#" },
];

export { features, featureSequence, footerLinks, navLinks, noChangeParts, performanceImages, performanceImgPositions , useMacbookStore, useCartStore };
