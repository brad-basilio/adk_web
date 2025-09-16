
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';
import MessagesRest from './actions/MessagesRest';
import { CarritoProvider } from './context/CarritoContext.jsx';

import { useState, useEffect, useRef, useContext } from "react"
import {
    ChevronLeft,
    ChevronRight,
    Phone,
    Mail,
    MapPin,
    Truck,
    Package,
    Globe,
    Shield,
    Menu,
    X,
    Star,
    Users,
    Clock,
    Award,
    TrendingUp,
    CheckCircle,
    Heart,
    FileText,
    Home as HomeIcon,
    UserX,
    Split,
    Send,
    Quote,
    Scale,
    Facebook,
    Instagram,
} from "lucide-react"
import { translations } from '../Data/translations.js';
import GeneralRest from './actions/GeneralRest';
import { LanguageContext } from './context/LanguageContext.jsx';
import Swal from 'sweetalert2';
import { sub } from 'framer-motion/client';
import ReactModal from 'react-modal';
import HtmlContent from './Utils/HtmlContent';
import TrackingPixels from './Components/TrackingPixels';

// Importar Swiper y sus módulos
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Importar estilos personalizados
import '../css/swiper-custom.css';

// Configurar ReactModal
ReactModal.setAppElement('#app');

// Hook para detectar cuando un elemento entra en el viewport
const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsIntersecting(true)
                    setHasAnimated(true)
                }
            },
            {
                threshold: 0.1,
                ...options,
            },
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [hasAnimated])

    return [ref, isIntersecting]
}

// Componente para números animados
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0)
    const [ref, isVisible] = useIntersectionObserver()

    useEffect(() => {
        if (!isVisible) return

        let startTime = null
        const startCount = 0

        const animate = (currentTime) => {
            if (startTime === null) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * (end - startCount) + startCount))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [isVisible, end, duration])

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    )
}

const Home = ({ services = [], testimonies = [], faqs = [], generals = [], socials = [], staff_boss = null, benefits = [], indicators = [], landing = [], sliders = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isFormSubmitting, setIsFormSubmitting] = useState(false)
    const [activeTestimonial, setActiveTestimonial] = useState(0)
    const [openFAQ, setOpenFAQ] = useState(null)
    const [scrollY, setScrollY] = useState(0)
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [currentIndicatorSlide, setCurrentIndicatorSlide] = useState(0)
    const [modalOpen, setModalOpen] = useState(false) // Mover estado aquí
    const [contactFormData, setContactFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    const [isContactSubmitted, setIsContactSubmitted] = useState(false)
    const [isContactSubmitting, setIsContactSubmitting] = useState(false)
    const mobileMenuRef = useRef(null)
    const swiperRef = useRef(null)

    // Función para smooth scroll a secciones
    const smoothScrollTo = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            })
        }
        // Cerrar menú móvil si está abierto
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false)
        }
    }

    // Estados para idiomas (desde HomeDokux)
    const [socialsState, setSocialsState] = useState(socials || []);
    const [languagesSystem, setLanguagesSystem] = useState([]);
    const { currentLanguage, changeLanguage } = useContext(LanguageContext);
    const [selectLanguage, setSelectLanguage] = useState(currentLanguage || languagesSystem[0]);

    // Form states
    const [formData, setFormData] = useState({
        phone: "",
        selectedService: null
    });
    const [sending, setSending] = useState(false);
    const [showServiceDropdown, setShowServiceDropdown] = useState(false);
    const nameRef = useRef();

    // Contact form handlers
    const handleContactChange = (e) => {
        setContactFormData({
            ...contactFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsContactSubmitting(true);

        try {
            const messagesRest = new MessagesRest();

            // Mapear los campos correctamente para el backend
            const dataToSend = {
                name: contactFormData.name,
                email: contactFormData.email,
                subject: contactFormData.phone, // El phone se envía como subject
                description: contactFormData.message
            };

            await messagesRest.save(dataToSend);

            // Redirigir a la página de agradecimiento
            window.location.href = '/thanks';

        } catch (error) {
            console.error('Error submitting contact form:', error);
        } finally {
            setIsContactSubmitting(false);
        }
    };

    // Testimonials handlers
    const nextTestimonial = () => {
        const testimonialsToShow = testimonies && testimonies.length > 0 ? testimonies : [
            { id: 1, name: "María González", case: "Propietaria", description: "Excelente servicio." },
            { id: 2, name: "Carlos Rodríguez", case: "Inversionista", description: "Gracias a su asesoría." },
            { id: 3, name: "Ana Martínez", case: "Compradora", description: "Me acompañaron en todo el proceso." },
            { id: 4, name: "Roberto Silva", case: "Empresario", description: "Profesionales de primer nivel." },
            { id: 5, name: "Laura Fernández", case: "Arrendadora", description: "Su asesoría en contratos." },
            { id: 6, name: "Diego Morales", case: "Constructor", description: "Excelente trabajo en la regularización." }
        ];
        setCurrentTestimonial((prev) => (prev + 1) % Math.ceil(testimonialsToShow.length / 2));
    };

    const prevTestimonial = () => {
        const testimonialsToShow = testimonies && testimonies.length > 0 ? testimonies : [
            { id: 1, name: "María González", case: "Propietaria", description: "Excelente servicio." },
            { id: 2, name: "Carlos Rodríguez", case: "Inversionista", description: "Gracias a su asesoría." },
            { id: 3, name: "Ana Martínez", case: "Compradora", description: "Me acompañaron en todo el proceso." },
            { id: 4, name: "Roberto Silva", case: "Empresario", description: "Profesionales de primer nivel." },
            { id: 5, name: "Laura Fernández", case: "Arrendadora", description: "Su asesoría en contratos." },
            { id: 6, name: "Diego Morales", case: "Constructor", description: "Excelente trabajo en la regularización." }
        ];
        setCurrentTestimonial((prev) => (prev - 1 + Math.ceil(testimonialsToShow.length / 2)) % Math.ceil(testimonialsToShow.length / 2));
    };

    const goToTestimonial = (index) => {
        setCurrentTestimonial(index);
    };
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const descriptionRef = useRef();
    const serviceDropdownRef = useRef();
    const messagesRest = new MessagesRest();

    // Translation system compatibility
    console.log("Current Language:", currentLanguage);
    const [languageContext, setLanguageContext] = useState(currentLanguage?.description || 'es');

    const language = languageContext || 'es';
    const t = translations[language];

    // Crear array de sliders dinámico (filtrar solo los visibles y activos)
    const activeSliders = sliders?.filter(slider => slider.visible && slider.status) || [];
    // Fallback a imágenes estáticas si no hay sliders dinámicos
    const slidersToShow = activeSliders;

    // Cargar idiomas del sistema (desde HomeDokux)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const generalRest = new GeneralRest();
                const data = await generalRest.getSocials();
                const languages = await generalRest.getLanguages();
                setSocialsState(data);
                setLanguagesSystem(languages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Sincronizar con el contexto de idioma (desde HomeDokux)
    useEffect(() => {
        if (currentLanguage) {
            setSelectLanguage(currentLanguage);
        } else if (languagesSystem.length > 0) {
            setSelectLanguage(languagesSystem[0]);
        }
    }, [currentLanguage, languagesSystem]);

    // Auto-cambio de testimonios
    useEffect(() => {
        if (testimonies.length > 0) {
            const timer = setInterval(() => {
                setActiveTestimonial((prev) => (prev + 1) % testimonies.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [testimonies]);

    // Auto-cambio de slides del hero (similar al Hero.tsx)
    useEffect(() => {
        if (slidersToShow.length > 0) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slidersToShow.length);
            }, 6000);
            return () => clearInterval(timer);
        }
    }, [slidersToShow]);

    // Parallax effect
    /*useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY)
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])*/

    // Swiper manejará el autoplay automáticamente

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false)
            }
        }

        if (isMobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isMobileMenuOpen])

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                setIsMobileMenuOpen(false)
            }
        }

        if (isMobileMenuOpen) {
            document.addEventListener("keydown", handleEscapeKey)
        }

        return () => {
            document.removeEventListener("keydown", handleEscapeKey)
        }
    }, [isMobileMenuOpen])

    // Cerrar dropdown de servicios al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target)) {
                setShowServiceDropdown(false);
            }
        };

        if (showServiceDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showServiceDropdown]);

    // Manejar scroll para el header con throttle para suavizar
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Auto-advance testimonials
    useEffect(() => {
        const testimonialsToShow = testimonies && testimonies.length > 0 ? testimonies : [
            { id: 1, name: "María González", case: "Propietaria", description: "Excelente servicio." },
            { id: 2, name: "Carlos Rodríguez", case: "Inversionista", description: "Gracias a su asesoría." },
            { id: 3, name: "Ana Martínez", case: "Compradora", description: "Me acompañaron en todo el proceso." },
            { id: 4, name: "Roberto Silva", case: "Empresario", description: "Profesionales de primer nivel." },
            { id: 5, name: "Laura Fernández", case: "Arrendadora", description: "Su asesoría en contratos." },
            { id: 6, name: "Diego Morales", case: "Constructor", description: "Excelente trabajo en la regularización." }
        ];

        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % Math.ceil(testimonialsToShow.length / 2));
        }, 5000);

        return () => clearInterval(timer);
    }, [testimonies]);

    // Auto-advance indicator slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndicatorSlide((prev) => (prev + 1) % 3); // 3 slides en total
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    // Funciones de navegación para indicadores
    const nextIndicatorSlide = () => {
        setCurrentIndicatorSlide((prev) => (prev + 1) % 3);
    };

    // Funciones para manejar modales
    const openModal = (index) => setModalOpen(index);
    const closeModal = () => setModalOpen(false);

    // Definir las políticas disponibles
    const policyItems = {
        privacy_policy: "Política de Privacidad",
        terms_conditions: "Términos y Condiciones"
    };

    const prevIndicatorSlide = () => {
        setCurrentIndicatorSlide((prev) => (prev - 1 + 3) % 3);
    };

    // Funciones de navegación manejadas por Swiper
    const handleSlideChange = (swiper) => {
        setCurrentSlide(swiper.realIndex);
    };

    const goToSlide = (index) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsFormSubmitting(true)

        try {
            const formDataToSend = {
                name: nameRef.current?.value || '',
                last_name: lastNameRef.current?.value || '',
                email: emailRef.current?.value || '',
                subject: phoneRef.current?.value || '',
                phone: phoneRef.current?.value || '',
                description: descriptionRef.current?.value || '',
                service_id: formData.selectedService?.id || null
            };

            const result = await messagesRest.save(formDataToSend);

            if (result) {
                // Redirigir a página de agradecimiento
                window.location.href = "/thanks";
            }


            // Limpiar formulario
            if (nameRef.current) nameRef.current.value = '';
            if (lastNameRef.current) lastNameRef.current.value = '';
            if (emailRef.current) emailRef.current.value = '';
            if (phoneRef.current) phoneRef.current.value = '';
            if (descriptionRef.current) descriptionRef.current.value = '';
            setFormData({ ...formData, selectedService: null });

        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar el mensaje. Inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }

        setIsFormSubmitting(false)
    }

    // Función para cambiar idioma (desde HomeDokux)
    const onUseLanguage = async (langData) => {
        try {
            // Función para extraer el token de la cookie
            const getCsrfTokenFromCookie = () => {
                const cookie = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
                return cookie ? decodeURIComponent(cookie[1]) : null;
            };

            // Obtén el token CSRF de las cookies automáticamente
            const response = await fetch("/set-current-lang", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": getCsrfTokenFromCookie(), // Función para obtenerlo
                },
                body: JSON.stringify({ lang_id: langData.id }),
                credentials: "include", // Permite enviar cookies
            });

            if (response.ok) {
                await changeLanguage(langData); // ✅ Agrega await aquí
                setSelectLanguage(langData);
                window.location.reload(); // ⚠️ Opcional temporal para forzar actualización
            } else {
                console.log("Error de extracion:", await response.text());
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    // Función para obtener el icono según el nombre de la red social
    const getSocialIcon = (name) => {
        const socialName = name.toLowerCase();
        // Devuelve directamente el JSX del SVG para cada red social
        switch (socialName) {
            case 'instagram':
                return () => (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                );
            case 'facebook':
                return () => (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                );
            case 'whatsapp':
            case 'watsapp':
                return () => (
                    <svg fill='currentColor' width="16px" height="16px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp icon</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                );
            case 'twitter':
            case 'x':
                return () => (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                );
            case 'linkedin':
                return () => (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                );
            case 'youtube':
                return () => (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                );
            case 'tiktok':
                return () => (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                    </svg>
                );
            default:
                return () => (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                );
        }
    };

    const [headerRef, headerVisible] = useIntersectionObserver()
    const [heroRef, heroVisible] = useIntersectionObserver()
    const [servicesRef, servicesVisible] = useIntersectionObserver()
    const [statsRef, statsVisible] = useIntersectionObserver()
    const [aboutRef, aboutVisible] = useIntersectionObserver()
    const [parallaxRef, parallaxVisible] = useIntersectionObserver()

    return (
        <div className="min-h-screen bg-white">
            {/* Tracking Pixels */}
            <TrackingPixels generals={generals} />
            
            {/* Header */}
            <header className="bg-white shadow-lg fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <img src="/logo.png" alt="Estudio SERGIO QUIROZ" className="h-12 w-auto" />
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <button onClick={() => smoothScrollTo('inicio')} className="text-gray-700 hover:text-secondary transition-colors duration-300">Inicio</button>
                            <button onClick={() => smoothScrollTo('servicios')} className="text-gray-700 hover:text-secondary transition-colors duration-300">Servicios</button>
                            <button onClick={() => smoothScrollTo('testimonios')} className="text-gray-700 hover:text-secondary transition-colors duration-300">Testimonios</button>
                            <button onClick={() => smoothScrollTo('contacto')} className="text-gray-700 hover:text-secondary transition-colors duration-300">Contacto</button>
                        </nav>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-700 hover:text-secondary transition-colors duration-300"
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                                <button onClick={() => smoothScrollTo('inicio')} className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors duration-300 w-full text-left">Inicio</button>
                                <button onClick={() => smoothScrollTo('servicios')} className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors duration-300 w-full text-left">Servicios</button>
                                <button onClick={() => smoothScrollTo('testimonios')} className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors duration-300 w-full text-left">Testimonios</button>
                                <button onClick={() => smoothScrollTo('contacto')} className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors duration-300 w-full text-left">Contacto</button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section - Only show if there are sliders */}
            {slidersToShow && slidersToShow.length > 0 && (
                <section
                    ref={heroRef}
                    id="inicio"
                    className="relative pt-20 min-h-screen overflow-hidden"
                >
                    {slidersToShow.map((slide, index) => (
                    <div
                        key={slide.id || index}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                            }`}
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${slide.image && typeof slide.image === 'string' && !slide.image.startsWith('http')
                                        ? `/api/sliders/media/${slide.image}`
                                        : slide.image || "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
                                    })`
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex items-center min-h-screen">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                                <div className="grid lg:grid-cols-3 gap-12 items-center">
                                    {/* Text Content */}
                                    <div className="space-y-8 lg:col-span-2">
                                        <div className="space-y-4">
                                            <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight transform transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                                }`}>
                                                {slide.name ? (
                                                    slide.name.split(/(\*[^*]+\*)/g).map((part, partIndex) => {
                                                        if (/^\*[^*]+\*$/.test(part)) {
                                                            return <span key={partIndex} className="text-tertiary font-bold" style={{ textShadow: '1px 0px 10px rgba(011, 013, 064)' }}>{part.replace(/\*/g, '')}</span>;
                                                        }
                                                        return <span key={partIndex}>{part}</span>;
                                                    })
                                                ) : (
                                                    <>
                                                        Protege tu Propiedad con un{' '}
                                                        <span className="text-tertiary" style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)' }}>Abogado Inmobiliario Experto</span>
                                                    </>
                                                )}
                                            </h1>

                                            <h2 className={`text-lg md:text-2xl text-light font-medium transform transition-all duration-1000 delay-500  ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                                }`}>
                                                {slide.button_text || "¿Problemas con terrenos, casas o contratos de compraventa?"}
                                            </h2>

                                            <p className={`text-base text-gray-200 transform transition-all duration-1000 delay-700 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                                }`}>
                                                {slide.description || "Evita juicios largos, estafas y pérdida de tu inversión."}
                                            </p>
                                        </div>

                                        {/* Benefits */}
                                        <div className={`hidden lg:block space-y-3 transform transition-all duration-1000 delay-900 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}>
                                            <div className="flex items-center space-x-3">
                                                <CheckCircle className="h-5 w-5 text-green-400" />
                                                <span className="text-gray-200">Más de 15 años de experiencia</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <CheckCircle className="h-5 w-5 text-green-400" />
                                                <span className="text-gray-200">Especialistas en derecho inmobiliario</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <CheckCircle className="h-5 w-5 text-green-400" />
                                                <span className="text-gray-200">Agenda tu consulta</span>
                                            </div>
                                        </div>

                                        {/* CTA Buttons */}
                                        <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-1100 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}>
                                            <button
                                                onClick={() => smoothScrollTo('contacto')}
                                                className="bg-primary z-[9999] hover:bg-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                                            >
                                                <Phone className="h-5 w-5" />
                                                <span>Agenda tu consulta</span>
                                            </button>
                                            <button
                                                onClick={() => smoothScrollTo('servicios')}
                                                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                                            >
                                                Ver Servicios
                                            </button>
                                        </div>
                                    </div>

                                    {/* Visual Element */}
                                    {/*<div className={`relative transform transition-all duration-1000 delay-1300 ${index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                                        }`}>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                                            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-white">
                                                <Shield className="h-16 w-16 mb-4" />
                                                <h3 className="text-2xl font-bold mb-2">Protección Legal Total</h3>
                                                <p className="text-light">
                                                    Defendemos tus derechos de propiedad con la máxima dedicación y profesionalismo.
                                                </p>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation Arrows */}
                <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + slidersToShow.length) % slidersToShow.length)}
                    className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slidersToShow.length)}
                    className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                    {slidersToShow.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                                }`}
                        />
                    ))}
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 right-8 animate-bounce z-20">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>
            )}

          


            {/* Services Section - Only show if there are services */}
            {services && services.length > 0 && (
                <section
                    ref={servicesRef}
                    id="servicios"
                    className={`py-20 bg-white transition-all duration-1000 ${servicesVisible ? "animate-fadeInUp" : "opacity-0 translate-y-10"
                        }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Nuestros Servicios Especializados
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Ofrecemos soluciones legales completas adaptadas a las necesidades de tu negocio, con la experiencia y profesionalismo que mereces.
                            </p>
                        </div>

                        {(() => {
                            // Función para renderizar un servicio
                            const renderService = (service, index, isStatic = false) => {
                                let IconComponent;
                                
                                if (isStatic) {
                                    IconComponent = service.icon;
                                } else {
                                    // Mapear iconos dinámicos o usar icono por defecto
                                    const getServiceIcon = (serviceName) => {
                                        const name = serviceName?.toLowerCase() || '';
                                        if (name.includes('contrato') || name.includes('document')) return FileText;
                                        if (name.includes('inmueble') || name.includes('propiedad') || name.includes('casa')) return HomeIcon;
                                        if (name.includes('desalojo') || name.includes('inquilino')) return UserX;
                                        if (name.includes('prescripción') || name.includes('tiempo')) return Clock;
                                        if (name.includes('división') || name.includes('partición')) return Split;
                                        if (name.includes('terreno') || name.includes('regularización')) return MapPin;
                                        if (name.includes('defensa') || name.includes('juicio')) return Shield;
                                        return FileText; // Icono por defecto
                                    };
                                    IconComponent = getServiceIcon(service.title || service.name);
                                }

                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-secondary transform hover:-translate-y-2 group h-full"
                                    >
                                        <div className="flex items-center justify-center w-16 h-16 bg-light p-2 rounded-lg mb-4 group-hover:bg-secondary transition-colors duration-300">
                                            {isStatic ? (
                                                <IconComponent className="h-8 w-8 text-secondary group-hover:text-white transition-colors duration-300" />
                                            ) : (
                                                <img src={`/api/service/media/${service.icon}`} alt={service.title || service.name} className='group-hover:invert'/>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-secondary transition-colors duration-300">
                                            {service.title || service.name}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                );
                            };

                            // Determinar qué servicios mostrar
                            const servicesToShow = services.map((service, index) => renderService(service, index, false));

                            return (
                                <>
                                    {/* Desktop & Tablet: Grid Layout */}
                                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {servicesToShow}
                                    </div>

                                    {/* Mobile: Swiper Carousel */}
                                    <div className="block md:hidden">
                                        <Swiper
                                            spaceBetween={20}
                                            slidesPerView={1}
                                            pagination={{
                                                clickable: true,
                                                bulletActiveClass: 'swiper-pagination-bullet-active !bg-secondary',
                                                bulletClass: 'swiper-pagination-bullet !bg-gray-300',
                                            }}
                                            modules={[Pagination]}
                                            className="services-swiper"
                                            style={{
                                                '--swiper-pagination-color': '#30348C',
                                                '--swiper-pagination-bullet-inactive-color': '#d1d5db',
                                                '--swiper-pagination-bullet-size': '12px',
                                                '--swiper-pagination-bullet-horizontal-gap': '6px'
                                            }}
                                        >
                                            {servicesToShow.map((serviceComponent, index) => (
                                                <SwiperSlide key={index} className="pb-12">
                                                    {serviceComponent}
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </section>
            )}
  {/*INDICADORES SECTION - Only show if there are indicators */}
            {indicators && indicators.length > 0 && (
                <section className="relative h-96 md:h-[500px] overflow-hidden bg-primary">
                    {(() => {
                        // Usar indicadores dinámicos de la base de datos
                        const indicatorsToShow = indicators;

                        return (
                            <>
                                {indicatorsToShow.map((indicator, index) => (
                                    <div
                                        key={indicator.id}
                                        className={`absolute inset-0 transition-opacity duration-1000 ${
                                            index === currentIndicatorSlide ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ 
                                                backgroundImage: `url(${
                                                    // Para indicadores dinámicos, usar siempre la ruta de la API
                                                    indicator.symbol && !indicator.symbol.startsWith('/assets')
                                                        ? `/api/indicator/media/${indicator.symbol}`
                                                        : indicator.symbol || "/assets/img/home/slide1.webp"
                                                })` 
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                                        </div>

                                        <div className="relative z-10 flex items-center justify-center h-full">
                                            <div className="text-center text-white px-4 max-w-4xl">
                                                <h2 className="text-3xl md:text-5xl font-bold mb-4 transform transition-transform duration-1000 translate-y-0">
                                                    {indicator.name || indicator.title}
                                                </h2>
                                                <p className="text-lg md:text-xl opacity-90 transform transition-transform duration-1000 delay-300 translate-y-0">
                                                    {indicator.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevIndicatorSlide}
                                    className="absolute left-4 top-1/2 z-[9999] transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-all duration-300"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>

                                <button
                                    onClick={nextIndicatorSlide}
                                    className="absolute right-4 top-1/2 z-[9999]  transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-all duration-300"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>

                                {/* Dots Indicator */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {indicatorsToShow.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndicatorSlide(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                index === currentIndicatorSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        );
                    })()}
                </section>
            )}
            {/*Section testimonials - Only show if there are testimonials */}
            {testimonies && testimonies.length > 0 && (
                <section id="testimonios" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Lo que Dicen Nuestros Clientes
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
                            Conoce las experiencias de quienes han confiado en nosotros.
                        </p>
                    </div>

                    {(() => {
                        // Usar testimonios dinámicos de la base de datos
                        const testimonialsToShow = testimonies;

                        return (
                            <>
                                {/* Carousel Container */}
                                <div className="relative">
                                    {/* Testimonials Grid */}
                                    <div className="overflow-hidden">
                                        <div
                                            className="flex transition-transform duration-500 ease-in-out"
                                            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                                        >
                                            {Array.from({ length: Math.ceil(testimonialsToShow.length / 2) }).map((_, slideIndex) => (
                                                <div key={slideIndex} className="w-full flex-shrink-0">
                                                    <div className="grid md:grid-cols-2 gap-8 px-4">
                                                        {testimonialsToShow.slice(slideIndex * 2, slideIndex * 2 + 2).map((testimonial) => (
                                                            <div
                                                                key={testimonial.id}
                                                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 relative transform hover:-translate-y-1"
                                                            >
                                                                {/* Quote Icon */}
                                                                <div className="absolute top-4 right-4">
                                                                    <Quote className="h-8 w-8 text-secondary opacity-30" />
                                                                </div>

                                                                {/* Rating */}
                                                                <div className="flex items-center space-x-1 mb-4">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                                                    ))}
                                                                </div>

                                                                {/* Testimonial Text */}
                                                                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                                                                    "{testimonial.description}"
                                                                </p>

                                                                {/* Client Info */}
                                                                <div className="flex items-center space-x-4">
                                                                    <img
                                                                        src={`/api/testimony/media/${testimonial.image}`}
                                                                        alt={testimonial.name}
                                                                        className="w-12 h-12 rounded-full object-cover"
                                                                    />
                                                                    <div>
                                                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                                                        <p className="text-gray-600 text-sm">{testimonial.case || "Cliente"}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={prevTestimonial}
                                        className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-gray-600 hover:text-secondary p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                                        aria-label="Testimonio anterior"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>

                                    <button
                                        onClick={nextTestimonial}
                                        className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-gray-600 hover:text-secondary p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                                        aria-label="Siguiente testimonio"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>

                                    {/* Dots Indicator */}
                                    <div className="flex justify-center space-x-2 mt-8">
                                        {Array.from({ length: Math.ceil(testimonialsToShow.length / 2) }).map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => goToTestimonial(index)}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                                                        ? 'bg-secondary scale-125'
                                                        : 'bg-gray-300 hover:bg-gray-400'
                                                    }`}
                                                aria-label={`Ir al grupo de testimonios ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Call to Action */}
                                <div className="text-center mt-12">
                                    <p className="text-lg text-gray-600 mb-6">
                                        ¿Listo para ser nuestro próximo cliente satisfecho?
                                    </p>
                                    <button
                                        onClick={() => smoothScrollTo('contacto')}
                                        className="bg-secondary hover:bg-primary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                                    >
                                        Agenda tu consulta
                                    </button>
                                </div>
                            </>
                        );
                    })()}
                </div>
            </section>
            )}

            {/*Section Contacto */}
            <section id="contacto" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Contáctanos Hoy Mismo
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            ¿Tienes un problema legal inmobiliario? No esperes más.
                            Contáctanos para agendar tu consulta y protege tu patrimonio.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    Información de Contacto
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-gray-100 p-3 rounded-lg">
                                            <Phone className="h-6 w-6 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Teléfono</h4>
                                            <p className="text-gray-600">
                                                {generals?.find(g => g.correlative === 'phone_contact')?.description || '+51 982 292 914'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-gray-100 p-3 rounded-lg">
                                            <Mail className="h-6 w-6 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Email</h4>
                                            <p className="text-gray-600">
                                                {generals?.find(g => g.correlative === 'email_contact')?.description || 'contacto@lexinmobiliaria.com'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-gray-100 p-3 rounded-lg">
                                            <MapPin className="h-6 w-6 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Dirección</h4>
                                            <p className="text-gray-600">
                                                {generals?.find(g => g.correlative === 'address')?.description || 'Lima, Perú'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-4">Horarios de Atención</h4>
                                <div className="space-y-2 text-gray-600">
                                    {(() => {
                                        const openingHours = generals?.find(g => g.correlative === 'opening_hours')?.description;
                                        
                                        if (openingHours) {
                                            // Dividir por saltos de línea y renderizar cada línea
                                            return openingHours.split('\n').map((line, index) => (
                                                <p key={index}>{line.trim()}</p>
                                            ));
                                        } else {
                                            // Horarios por defecto si no hay información en la BD
                                            return (
                                                <>
                                                    <p>Lunes - Viernes: 9:00 AM - 7:00 PM</p>
                                                    <p>Sábados: 9:00 AM - 2:00 PM</p>
                                                    <p>Domingos: Cerrado</p>
                                                </>
                                            );
                                        }
                                    })()}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gray-50 p-8 rounded-xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Agenda tu consulta
                            </h3>

                            {(() => {
                                return (
                                    <>
                                        {isContactSubmitted ? (
                                            <div className="text-center py-8">
                                                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                                    ¡Mensaje Enviado!
                                                </h4>
                                                <p className="text-gray-600">
                                                    Nos pondremos en contacto contigo muy pronto.
                                                </p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleContactSubmit} className="space-y-6">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Nombre Completo *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={contactFormData.name}
                                                        onChange={handleContactChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300"
                                                        placeholder="Tu nombre completo"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={contactFormData.email}
                                                        onChange={handleContactChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300"
                                                        placeholder="tu@email.com"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Teléfono *
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        value={contactFormData.phone}
                                                        onChange={handleContactChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300"
                                                        placeholder="+52 (55) 1234-5678"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Mensaje *
                                                    </label>
                                                    <textarea
                                                        id="message"
                                                        name="message"
                                                        value={contactFormData.message}
                                                        onChange={handleContactChange}
                                                        required
                                                        rows={4}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 resize-none"
                                                        placeholder="Describe tu situación legal..."
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isContactSubmitting}
                                                    className="w-full bg-secondary hover:bg-primary text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Send className="h-5 w-5" />
                                                    <span>{isContactSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
                                                </button>
                                            </form>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/assets/img/logo-white.png"
                                    alt="Abogado Inmobiliario Perú"
                                    className="h-16 invert"
                                />
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                {generals?.find(g => g.correlative === 'company_description')?.description ||
                                    'Especialistas en derecho inmobiliario con más de 15 años de experiencia protegiendo el patrimonio de nuestros clientes.'}
                            </p>
                            <div className="flex space-x-4">
                                {/* Dynamic Social Media Links */}
                                {socials?.filter(social =>
                                    social.visible &&
                                    social.status &&
                                    !social.description?.toLowerCase().includes('whatsapp') &&
                                    !social.name?.toLowerCase().includes('whatsapp')
                                ).map((social, index) => {
                                    return (
                                        <a
                                            key={social.id || index}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-light transition-colors duration-300"
                                        >
                                            <i className={`${social.icon} text-lg`}></i>
                                        </a>
                                    );
                                })}

                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button onClick={() => smoothScrollTo('inicio')} className="text-gray-300 hover:text-light transition-colors duration-300 text-left">
                                        Inicio
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => smoothScrollTo('servicios')} className="text-gray-300 hover:text-light transition-colors duration-300 text-left">
                                        Servicios
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => smoothScrollTo('testimonios')} className="text-gray-300 hover:text-light transition-colors duration-300 text-left">
                                        Testimonios
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => smoothScrollTo('contacto')} className="text-gray-300 hover:text-light transition-colors duration-300 text-left">
                                        Contacto
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
                            <ul className="space-y-2 text-sm">
                                {/* Dynamic services if available */}
                                {services && services.length > 0 && (
                                    services.slice(0, 5).map((service, index) => (
                                        <li key={service.id || index}>
                                            <button onClick={() => smoothScrollTo('servicios')} className="text-gray-300 hover:text-light transition-colors duration-300 text-left">
                                                {service.title || service.name}
                                            </button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-4 w-4 text-tertiary" />
                                    <span className="text-gray-300 text-sm">
                                        {generals?.find(g => g.correlative === 'phone_contact')?.description || '+51 982 292 914'}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-4 w-4 text-tertiary" />
                                    <span className="text-gray-300 text-sm">
                                        {generals?.find(g => g.correlative === 'email_contact')?.description || 'contacto@lexinmobiliaria.com'}
                                    </span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MapPin className="h-4 w-4 text-tertiary mt-1" />
                                    <span className="text-gray-300 text-sm">
                                        {generals?.find(g => g.correlative === 'address')?.description || 'Lima, Perú'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 mt-8 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} {generals?.find(g => g.correlative === 'company_name')?.description || 'Estudio SERGIO QUIROZ Abogados'}. Todos los derechos reservados.
                            </p>
                            <p className="text-gray-400 text-sm">
                                Powered by{' '}
                                <a
                                    href="http://mundoweb.pe/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-tertiary hover:text-light transition-colors duration-300 font-medium"
                                >
                                    Mundo Web
                                </a>
                            </p>
                            <div className="flex space-x-6 text-sm">
                                <button 
                                    onClick={() => openModal(0)}
                                    className="text-gray-400 hover:text-light transition-colors duration-300 cursor-pointer"
                                >
                                    Política de Privacidad
                                </button>
                                <button 
                                    onClick={() => openModal(1)}
                                    className="text-gray-400 hover:text-light transition-colors duration-300 cursor-pointer"
                                >
                                    Términos y Condiciones
                                </button>
                               
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modales para Políticas y Términos */}
                {Object.keys(policyItems).map((key, index) => {
                    const title = policyItems[key];
                    const content = generals?.find((x) => x.correlative == key)?.description ?? "";
                    return (
                        <ReactModal
                            key={index}
                            isOpen={modalOpen === index}
                            onRequestClose={closeModal}
                            contentLabel={title}
                            className="fixed top-[5%] left-1/2 -translate-x-1/2 bg-white p-6 rounded-3xl shadow-lg w-[95%] max-w-4xl max-h-[90vh] mb-10 overflow-y-auto scrollbar-hide"
                            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-auto scrollbar-hide"
                        >
                            <button
                                onClick={closeModal}
                                className="float-right text-red-500 hover:text-red-700 transition-all duration-300"
                            >
                                <X width="2rem" strokeWidth="4px" />
                            </button>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">{title}</h2>
                            <HtmlContent className="prose max-w-none text-gray-700" html={content} />
                        </ReactModal>
                    );
                })}

                {/* WhatsApp Floating Button */}
                {(() => {
                    const whatsappPhone = generals?.find(g => g.correlative === 'whatsapp_phone')?.description;
                    const whatsappMessage = generals?.find(g => g.correlative === 'whatsapp_message')?.description || 'Hola, me interesa obtener más información sobre sus servicios legales.';

                    if (!whatsappPhone) return null;

                    // Limpiar el número de teléfono (remover espacios, guiones, etc.)
                    const cleanPhone = whatsappPhone.replace(/[^\d+]/g, '');
                    
                    // Crear el enlace de WhatsApp con mensaje predefinido
                    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

                    return (
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 hover:scale-110 transition-all duration-300 z-50 animate-bounce"
                            style={{ animationDuration: '2s' }}
                            title={`Contactar por WhatsApp: ${whatsappPhone}`}
                        >
                            <svg width="36px" height="36px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <title>WhatsApp icon</title>
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </a>
                    );
                })()}
            </footer>
        </div>
    )
}

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Home {...properties} />
            </Base>
        </CarritoProvider>
    );
});
