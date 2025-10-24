import React, { useEffect, useState } from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import { Local } from "sode-extend-react";
import { CarritoProvider } from "./context/CarritoContext";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Heart, Star, Home as HomeIcon, Mail, Clock, Phone, MessageSquare, Sparkles } from "lucide-react";

// Animaciones configuradas
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            when: "beforeChildren",
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
};

const checkmarkVariants = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15,
        },
    },
};

const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

const Thanks = ({ session }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        history.replaceState(null, "", "/thanks");
        localStorage.removeItem("carrito");
        
        // Trigger animations
        setIsVisible(true);
        
        // Scroll handler for parallax
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleReturnHome = () => {
        window.location.href = "/";
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 min-h-screen flex items-center overflow-hidden bg-black">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#0066ff]/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-[#0066ff]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#d4af37]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 200, 
                                damping: 15,
                                delay: 0.2 
                            }}
                            className="mb-8"
                        >
                            <div className="relative mx-auto w-32 h-32 mb-8">
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.1, 1],
                                        boxShadow: [
                                            "0 0 0 0 rgba(34, 197, 94, 0.7)",
                                            "0 0 0 30px rgba(34, 197, 94, 0)",
                                            "0 0 0 0 rgba(34, 197, 94, 0)"
                                        ]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                    className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl"
                                >
                                    <CheckCircle className="h-16 w-16 text-white" strokeWidth={2.5} />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Main Title */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-white via-[#0066ff] to-[#d4af37] bg-clip-text text-transparent">
                                    Thank You!
                                </span>
                            </h1>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="w-32 h-1.5 bg-gradient-to-r from-[#0066ff] to-[#d4af37] mx-auto rounded-full mb-8"
                            ></motion.div>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            <p className="text-xl md:text-2xl mb-4 text-white leading-relaxed font-medium">
                                Your Message Has Been Successfully Sent
                            </p>
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
                                We've received your message and our team will review it shortly. We'll get back to you as soon as possible.
                            </p>
                        </motion.div>

                        {/* Info Cards */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.8 }}
                            className="grid md:grid-cols-3 gap-6 mb-12"
                        >
                            <div className="bg-[#1a1a1a] backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-[#0066ff]/20 hover:shadow-2xl transition-all duration-300 border border-[#333333] hover:border-[#0066ff]">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#0066ff] to-[#d4af37] rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Clock className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="font-bold text-white mb-2 text-lg">Response Time</h3>
                                <p className="text-2xl font-bold bg-gradient-to-r from-[#0066ff] to-[#d4af37] bg-clip-text text-transparent">
                                    24-48 Hours
                                </p>
                            </div>

                            <div className="bg-[#1a1a1a] backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-[#0066ff]/20 hover:shadow-2xl transition-all duration-300 border border-[#333333] hover:border-[#0066ff]">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#0066ff] to-[#d4af37] rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="font-bold text-white mb-2 text-lg">Email Confirmation</h3>
                                <p className="text-sm text-gray-400">
                                    Check your inbox for a confirmation email
                                </p>
                            </div>

                            <div className="bg-[#1a1a1a] backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-[#0066ff]/20 hover:shadow-2xl transition-all duration-300 border border-[#333333] hover:border-[#0066ff]">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#0066ff] to-[#d4af37] rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="font-bold text-white mb-2 text-lg">Message Received</h3>
                                <p className="text-sm text-gray-400">
                                    Your inquiry is now in our queue
                                </p>
                            </div>
                        </motion.div>

                        {/* CTA Box */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                            className="bg-gradient-to-br from-[#0066ff] to-[#d4af37] rounded-3xl p-10 mb-12 shadow-2xl shadow-[#0066ff]/30 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                            <div className="relative z-10 text-white">
                                <Sparkles className="h-12 w-12 mx-auto mb-4 text-[#d4af37]" />
                                <h3 className="text-3xl font-bold mb-3">What Happens Next?</h3>
                                <p className="text-white/90 text-lg mb-6 max-w-xl mx-auto">
                                    Our expert team will carefully review your message and reach out to you with personalized solutions tailored to your needs.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4 text-sm">
                                    <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                        <CheckCircle className="h-4 w-4 text-[#d4af37]" />
                                        <span>Priority Response</span>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                        <CheckCircle className="h-4 w-4 text-[#d4af37]" />
                                        <span>Expert Support</span>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                        <CheckCircle className="h-4 w-4 text-[#d4af37]" />
                                        <span>Personalized Solutions</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Return Button */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.7, duration: 0.8 }}
                            className="flex justify-center"
                        >
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 20px 40px -5px rgba(0, 102, 255, 0.5)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleReturnHome}
                                className="group bg-gradient-to-r from-[#0066ff] to-[#d4af37] text-white px-12 py-5 rounded-full text-lg font-semibold hover:from-[#0052cc] hover:to-[#b8941f] transform transition-all duration-300 shadow-2xl shadow-[#0066ff]/30 flex items-center justify-center space-x-3"
                            >
                                <HomeIcon className="h-6 w-6 group-hover:-translate-x-1 transition-transform duration-300" />
                                <span>Return to Home</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </motion.button>
                        </motion.div>

                        {/* Additional Help */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 0.8 }}
                            className="mt-12 text-gray-400"
                        >
                            <p className="text-sm">
                                Need immediate assistance?{' '}
                                <a href="/contact" className="text-[#0066ff] hover:text-[#d4af37] font-semibold underline transition-colors duration-300">
                                    Contact our support team
                                </a>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Thanks {...properties} />
            </Base>
        </CarritoProvider>
    );
});
