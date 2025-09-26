
import React from 'react';
import { useSiteContent } from '@/lib/siteContentContext';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const location = useLocation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const { siteContent } = useSiteContent();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'About', path: '/#about', type: 'anchor' },
        { name: 'Skills', path: '/#skills', type: 'anchor' },
        { name: 'Experience', path: '/#experience', type: 'anchor' },
        { name: 'Education', path: '/#education', type: 'anchor' }
      ]
    },
    {
      title: 'Content',
      links: [
        { name: 'Projects', path: '/projects', type: 'route' },
        { name: 'Blog', path: '/blog', type: 'route' },
        { name: 'Contact', path: '/#contact', type: 'anchor' }
      ]
    }
  ];

  const handleFooterLinkClick = (path, type) => {
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
    <footer className="relative bg-black/20 backdrop-blur-lg border-t border-white/10 mt-auto">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Link to="/">
              <div className="mb-6">
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {siteContent?.name || 'Portfolio'}
                </span>
              </div>
            </Link>
            <p className="text-white/70 mb-6 max-w-md leading-relaxed">
              {siteContent?.footer_description }
            </p>
            
            {/* Social Links */}
            {siteContent?.social_links && (
              <div className="flex gap-4 mt-6">
                {siteContent.social_links.map(link => (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-lg">
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.type === 'route' ? (
                      <Link to={link.path} className="text-white/60 hover:text-white transition-colors duration-200">
                        {link.name}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleFooterLinkClick(link.path, link.type)}
                        className="text-white/60 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            {siteContent?.footer_copyright || `© ${currentYear} Portfolio. All rights reserved.`}
          </p>
          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <ArrowUp size={16} className="mr-2" />
            Back to Top
          </Button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
