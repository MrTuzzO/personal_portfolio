import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import BlogPreview from '@/components/BlogPreview';
import Contact from '@/components/Contact';
import SectionSkeleton from '@/components/SectionSkeleton';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };
  
  const sectionTransition = { duration: 0.3 };

  if (isLoading) {
    return (
      <div className="pt-20"> 
        <SectionSkeleton className="min-h-[calc(100vh-5rem)]" hasTitle={false} hasParagraph={false} cardCount={0} customCard={<div className="w-full h-full bg-white/5 rounded-lg"><div className="h-48 md:h-64 w-full animate-pulse bg-white/10 rounded-lg mb-4"></div><div className="h-8 w-3/4 mx-auto animate-pulse bg-white/10 rounded-md mb-2"></div><div className="h-6 w-1/2 mx-auto animate-pulse bg-white/10 rounded-md"></div></div>} />
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
      </div>
    );
  }

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={sectionTransition}
    >
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <BlogPreview />
      <Contact />
    </motion.main>
  );
};

export default HomePage;