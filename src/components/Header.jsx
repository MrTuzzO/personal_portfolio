
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', type: 'route' },
    { name: 'About', path: '/#about', type: 'anchor' },
    { name: 'Skills', path: '/#skills', type: 'anchor' },
    { name: 'Experience', path: '/#experience', type: 'anchor' },
    { name: 'Projects', path: '/projects', type: 'route' },
    { name: 'Blog', path: '/blog', type: 'route' },
    { name: 'Contact', path: '/#contact', type: 'anchor' },
  ];

  const handleNavClick = (path, type) => {
    setIsOpen(false);
    if (type === 'anchor') {
      if (location.pathname !== '/') {
        // Navigate to home and then scroll
        window.location.href = path; 
      } else {
        const element = document.querySelector(path.substring(path.indexOf('#')));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/20 backdrop-blur-lg border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Portfolio
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              item.type === 'route' ? (
                <Link key={item.name} to={item.path} onClick={() => handleNavClick(item.path, item.type)}>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-white/80 hover:text-white transition-colors duration-200 relative group ${location.pathname === item.path ? 'text-purple-400' : ''}`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300 ${location.pathname === item.path ? 'w-full' : ''}`}></span>
                  </motion.span>
                </Link>
              ) : (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.path, item.type)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white/80 hover:text-white transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 bg-black/40 backdrop-blur-lg rounded-lg p-4"
          >
            {navItems.map((item) => (
              item.type === 'route' ? (
                <Link key={item.name} to={item.path} onClick={() => handleNavClick(item.path, item.type)} className={`block w-full text-left py-2 text-white/80 hover:text-white transition-colors duration-200 ${location.pathname === item.path ? 'text-purple-400' : ''}`}>
                    {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path, item.type)}
                  className="block w-full text-left py-2 text-white/80 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </button>
              )
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
