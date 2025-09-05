import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  MapPin, 
  Users, 
  TrendingUp, 
  Star,
  ChevronUp,
  ExternalLink,
  Mail,
  Phone,
  MapPin as MapPinIcon
} from 'lucide-react';
import Lenis from 'lenis';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';

// Custom Hook for Lenis Smooth Scrolling
const useSmoothScrolling = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
};

// Header Component
const Header = ({ isScrolled, onGetStartedClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">AC</span>
            </div>
            <span className="heading-sm gradient-text">Addis Core</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200 focus-ring rounded-lg px-3 py-2"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={onGetStartedClick}
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-2xl hover:bg-gray-100 transition-colors focus-ring"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-soft-lg"
            >
              <div className="py-6 space-y-4">
                {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-xl transition-colors font-medium focus-ring"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <div className="px-4 pt-4 border-t border-gray-100">
                  <button 
                    className="btn-primary w-full justify-center"
                    onClick={() => {
                      onGetStartedClick();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

Header.propTypes = {
  isScrolled: PropTypes.bool.isRequired,
  onGetStartedClick: PropTypes.func.isRequired
};

// Hero Section Component
const HeroSection = ({ onGetStartedClick, onDemoClick }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background Elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-accent-200/20 rounded-full blur-3xl"></div>
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Hero Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeInUp}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
                <Star className="w-4 h-4 mr-2" />
                95% Accuracy Rate
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="heading-xl mb-6"
            >
              <span className="ethiopic-display block text-primary-900 mb-8">
                በኢትዮጵያ ምርጥ የቢዝነስ መረጃ
              </span>
              <span className="gradient-text mt-4 block">
                Empowering Connections with Ethiopian Business Intelligence
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-body mb-8 max-w-2xl"
            >
              Transform your business reach with Ethiopia's most comprehensive and verified B2B contact database. 
              We systematically map, verify, and enrich business intelligence across all 10 sub-cities of Addis Ababa, 
              creating meaningful connections that drive growth.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <motion.button
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStartedClick}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="btn-secondary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDemoClick}
              >
                Request Demo
                <ExternalLink className="ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                100,000+ Verified Businesses
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-500 mr-2" />
                PDPP Compliant
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Card */}
              <motion.div
                className="bg-white rounded-3xl shadow-soft-xl p-8"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Census</h3>
                    <p className="text-gray-500 text-sm">10 Sub-cities Mapped</p>
              </div>
            </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Accuracy Rate</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-green-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "95%" }}
                      transition={{ duration: 2, delay: 1 }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-secondary-400 rounded-2xl p-4 shadow-soft-lg"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-accent-400 rounded-2xl p-4 shadow-soft-lg"
                animate={{ rotate: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Users className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

HeroSection.propTypes = {
  onGetStartedClick: PropTypes.func.isRequired,
  onDemoClick: PropTypes.func.isRequired
};

// About Section Component
const AboutSection = ({ onGetStartedClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* About Content */}
          <motion.div variants={fadeInUp}>
            <motion.span
              variants={fadeInUp}
              className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4"
            >
              About Addis Core
            </motion.span>
            
            <motion.h2
              variants={fadeInUp}
              className="heading-lg mb-6"
            >
              We Help Create Possibility & Success in Ethiopian Business!
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-body mb-8"
            >
                  We believe in unlocking the potential of Ethiopian businesses and helping them achieve global success. 
                  Whether you're a local enterprise or international company, we're here to empower you with accurate, 
                  verified business intelligence. Let's create possibility and success together!
            </motion.p>

            <motion.blockquote
              variants={fadeInUp}
              className="border-l-4 border-primary-500 pl-6 mb-8"
            >
              <p className="ethiopic-quote text-primary-900 text-xl italic mb-4">
                "We don't just collect contacts – we map economic DNA."
              </p>
              <footer className="text-gray-600">
                — Addis Core Mission Statement
              </footer>
            </motion.blockquote>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-6 mb-8"
            >
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-600 mb-2">100K+</div>
                <div className="text-gray-600">Verified Businesses</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
            </motion.div>

            <motion.button
              variants={fadeInUp}
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStartedClick}
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* About Visual */}
          <motion.div
            variants={scaleIn}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl shadow-soft-xl p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="heading-sm mb-2">Data-Driven Intelligence</h3>
                <p className="text-gray-600">Systematic verification process</p>
                </div>

              <div className="space-y-4">
                {[
                  { label: "Ethiopian-speaking team", value: "100%" },
                  { label: "Direct verification", value: "95%" },
                  { label: "Quarterly updates", value: "4x/year" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    <span className="text-gray-700">{stat.label}</span>
                    <span className="font-semibold text-primary-600">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
            </div>
          </section>
  );
};

AboutSection.propTypes = {
  onGetStartedClick: PropTypes.func.isRequired
};

// Services Section Component
const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: MapPin,
      title: "Phase 1: Business Census",
      description: "Location mapping across 10 sub-cities, sector cataloging by industry, and comprehensive infrastructure logging for complete coverage.",
      features: ["10 Sub-cities Coverage", "Industry Classification", "Infrastructure Mapping"]
    },
    {
      icon: CheckCircle,
      title: "Phase 2: Contact Validation",
      description: "Direct verification through Ethiopian-speaking team members, source triangulation, and comprehensive data enrichment.",
      features: ["Ethiopian Team Verification", "Multi-source Validation", "Data Enrichment"]
    },
    {
      icon: Shield,
      title: "Phase 3: Quality Assurance",
      description: "Ethical compliance adherence, 95%+ verification rate before inclusion, and continuous quarterly updates for data accuracy.",
      features: ["95%+ Accuracy", "PDPP Compliance", "Quarterly Updates"]
    }
  ];

  return (
    <section ref={ref} id="services" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Our Process
          </span>
          <h2 className="heading-lg mb-6">Our Three-Phase Intelligence Process</h2>
          <p className="text-body max-w-3xl mx-auto">
            We've developed a systematic approach to ensure the highest quality business intelligence, 
            combining local expertise with modern verification techniques.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="card-interactive group"
                whileHover={{ y: -8 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="heading-sm mb-3">{service.title}</h3>
                  <p className="text-body">{service.description}</p>
                        </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={feature} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                  </div>
                  ))}
                        </div>

                <motion.button
                  className="btn-ghost w-full group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
            </div>
          </section>
  );
};

// Comparison Section Component
const ComparisonSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const comparisons = [
    {
      title: "Addis Core",
      subtitle: "Premium Service",
      color: "primary",
      icon: Star,
      stats: ["95% Accuracy", "10 Sub-cities", "Ethiopian Team", "Quarterly Updates"]
    },
    {
      title: "Others",
      subtitle: "Standard Service",
      color: "gray",
      icon: TrendingUp,
      stats: ["60% Accuracy", "Limited Coverage", "Generic Data", "Annual Updates"]
    }
  ];

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2 className="heading-lg mb-6">Why Choose Addis Core?</h2>
          <p className="text-body max-w-3xl mx-auto">
            See how our comprehensive approach and local expertise delivers superior results 
            compared to generic business intelligence providers.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {comparisons.map((item, index) => {
            const Icon = item.icon;
            const isAddisCore = item.title === "Addis Core";
            
            return (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className={`card text-center ${isAddisCore ? 'ring-2 ring-primary-200 bg-primary-50' : ''}`}
                whileHover={{ y: -8 }}
              >
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${
                  isAddisCore ? 'gradient-primary' : 'bg-gray-200'
                }`}>
                  <Icon className={`w-10 h-10 ${isAddisCore ? 'text-white' : 'text-gray-600'}`} />
              </div>

                <h3 className="heading-sm mb-2">{item.title}</h3>
                <p className="text-muted mb-6">{item.subtitle}</p>
                
                <div className="space-y-3">
                  {item.stats.map((stat, statIndex) => (
                    <div
                      key={stat}
                      className={`p-3 rounded-xl text-sm font-medium ${
                        isAddisCore 
                          ? 'bg-primary-100 text-primary-800' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {stat}
                  </div>
                  ))}
                      </div>
              </motion.div>
            );
          })}

          {/* Impact Card */}
          <motion.div
            variants={fadeInUp}
            className="card text-center bg-gradient-to-br from-secondary-50 to-accent-50 ring-2 ring-secondary-200"
            whileHover={{ y: -8 }}
          >
            <div className="w-20 h-20 gradient-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-10 h-10 text-white" />
                  </div>
            
            <h3 className="heading-sm mb-2">Our Impact</h3>
            <p className="text-muted mb-6">Results Delivered</p>
            
            <div className="space-y-3">
              {["100K+ Businesses", "Global Connections", "Verified Data", "Trusted Partner"].map((stat) => (
                <div
                  key={stat}
                  className="p-3 bg-secondary-100 text-secondary-800 rounded-xl text-sm font-medium"
                >
                  {stat}
                  </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
            </div>
          </section>
  );
};

// CTA Section Component
const CTASection = ({ onGetStartedClick, onDemoClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding gradient-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="text-center text-white"
        >
          <motion.h2
            variants={fadeInUp}
            className="heading-lg mb-6"
          >
            Ready to Connect with Ethiopian Business Intelligence?
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl mb-8 max-w-3xl mx-auto text-white/90"
          >
            Join thousands of businesses already leveraging our comprehensive database of 100,000+ verified companies to expand 
            their reach in Ethiopia's growing market. Start your journey today.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold text-lg shadow-soft-lg transition-all duration-200 hover:shadow-soft-xl hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStartedClick}
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDemoClick}
            >
              Schedule Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

CTASection.propTypes = {
  onGetStartedClick: PropTypes.func.isRequired,
  onDemoClick: PropTypes.func.isRequired
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom">
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AC</span>
                </div>
                <span className="text-2xl font-bold text-white">Addis Core</span>
              </div>

              <p className="text-gray-400 mb-6 max-w-md">
                Empowering Ethiopian business connections! Discover your market potential 
                and achieve your business goals with verified intelligence from 100,000+ businesses.
              </p>

              <div className="flex space-x-4">
                {[
                  { name: 'twitter', url: 'https://twitter.com/addiscore' },
                  { name: 'linkedin', url: 'https://linkedin.com/company/addiscore' },
                  { name: 'facebook', url: 'https://facebook.com/addiscore' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-colors focus-ring"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Business Intelligence', url: '/services/business-intelligence' },
                  { name: 'Contact Database', url: '/services/contact-database' },
                  { name: 'Market Research', url: '/services/market-research' },
                  { name: 'Data Verification', url: '/services/data-verification' }
                ].map((service) => (
                  <li key={service.name}>
                    <a href={service.url} className="hover:text-white transition-colors focus-ring rounded px-1">
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary-400" />
                  <a href="tel:+251910681698" className="hover:text-white transition-colors">
                    +251 910 681 698
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary-400" />
                  <a href="mailto:info@addiscore.com" className="hover:text-white transition-colors">
                    info@addiscore.com
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 mr-3 text-primary-400 mt-1" />
                  <address className="not-italic">
                    Addis Ababa, Ethiopia
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 <span className="text-white">Addis Core</span>. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {[
                { name: 'Privacy Policy', url: '/privacy' },
                { name: 'Terms of Service', url: '/terms' },
                { name: 'Cookie Policy', url: '/cookies' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="text-gray-400 hover:text-white text-sm transition-colors focus-ring rounded px-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          </div>
        </div>
      </footer>
  );
};

// Scroll to Top Button Component
const ScrollToTop = ({ isVisible }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl shadow-soft-lg hover:shadow-soft-xl transition-all duration-200 focus-ring"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 mx-auto" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

ScrollToTop.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

// Main App Component
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [contactFormTitle, setContactFormTitle] = useState('');

  // Initialize smooth scrolling
  useSmoothScrolling();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      setShowScrollToTop(scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Contact form handlers
  const handleGetStartedClick = () => {
    setContactFormTitle('Get Started with Ethiopian Business Intelligence');
    setIsContactFormOpen(true);
  };

  const handleDemoClick = () => {
    setContactFormTitle('Request a Demo - Ethiopian Business Intelligence');
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  return (
    <div className="App">
      <Header isScrolled={isScrolled} onGetStartedClick={handleGetStartedClick} />
      
      <main>
        <HeroSection onGetStartedClick={handleGetStartedClick} onDemoClick={handleDemoClick} />
        <AboutSection onGetStartedClick={handleGetStartedClick} />
        <ServicesSection />
        <ComparisonSection />
        <CTASection onGetStartedClick={handleGetStartedClick} onDemoClick={handleDemoClick} />
      </main>
      
      <Footer />
      <ScrollToTop isVisible={showScrollToTop} />
      
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={closeContactForm}
        title={contactFormTitle}
      />
    </div>
  );
}

export default App;