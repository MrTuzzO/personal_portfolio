import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const SkillSkeleton = () => (
  <div className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 aspect-square">
    <Skeleton className="h-4 w-20 rounded-md" />
  </div>
);

const Skills = () => {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [catRes, skillRes] = await Promise.all([
          fetch(`${API_BASE_URL}/st-categories/`),
          fetch(`${API_BASE_URL}/skills-and-technologies/`)
        ]);
        if (!catRes.ok) throw new Error('Failed to fetch categories');
        if (!skillRes.ok) throw new Error('Failed to fetch skills');
        const catData = await catRes.json();
        const skillData = await skillRes.json();
        setCategories(catData);
        setSkills(skillData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredSkills = selectedCategoryId === 'All'
    ? skills
    : skills.filter(skill => skill.category === selectedCategoryId);

  const sectionAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const cardAnimation = {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -10 },
    transition: { duration: 0.2 }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={sectionAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            A showcase of the technologies I work with, categorized for clarity.
          </p>
        </motion.div>

        <motion.div
          variants={sectionAnimation}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button
            key="all"
            onClick={() => setSelectedCategoryId('All')}
            variant={selectedCategoryId === 'All' ? 'default' : 'outline'}
            className={`
              ${selectedCategoryId === 'All' 
                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white border-transparent' 
                : 'text-white/80 border-white/20 hover:bg-white/10 hover:text-white'
              } 
              transition-all duration-200 rounded-full px-6 py-3 text-base group
            `}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              variant={selectedCategoryId === category.id ? 'default' : 'outline'}
              className={`
                ${selectedCategoryId === category.id 
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white border-transparent' 
                  : 'text-white/80 border-white/20 hover:bg-white/10 hover:text-white'
                } 
                transition-all duration-200 rounded-full px-6 py-3 text-base group
              `}
            >
              {category.name}
            </Button>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
               Array.from({ length: 12 }).map((_, index) => ( 
                <motion.div key={`skeleton-${index}`} {...cardAnimation}>
                  <SkillSkeleton />
                </motion.div>
              ))
            ) : (
              filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.id || skill.name}
                  layout
                  variants={cardAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-200 aspect-square group"
                >
                  {skill.image || skill.logo ? (
                    <img
                      src={skill.image || skill.logo}
                      alt={skill.name}
                      className="h-20 w-20 md:h-24 md:w-24 mb-3 object-contain group-hover:scale-110 transition-transform duration-200"
                    />
                  ) : (
                    <span className="h-20 w-20 md:h-24 md:w-24 mb-3 flex items-center justify-center bg-gray-700 rounded-full text-white/60 text-xs">No Image</span>
                  )}
                  <span className="text-white/90 text-sm md:text-base font-medium text-center">{skill.name}</span>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        
        {!isLoading && filteredSkills.length === 0 && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/60 mt-8 text-lg"
          >
            No skills found in this category.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Skills;