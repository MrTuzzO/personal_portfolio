import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Server, Wrench as Tool, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'; 

const skillsData = [
  { name: 'React', category: 'Frontend', logoUrl: '/tech-logos/react.svg' },
  { name: 'Next.js', category: 'Frontend', logoUrl: '/tech-logos/nextjs.svg' },
  { name: 'Vue.js', category: 'Frontend', logoUrl: '/tech-logos/vue.svg' },
  { name: 'Angular', category: 'Frontend', logoUrl: '/tech-logos/angular.svg' },
  { name: 'JavaScript', category: 'Frontend', logoUrl: '/tech-logos/javascript.svg' },
  { name: 'TypeScript', category: 'Frontend', logoUrl: '/tech-logos/typescript.svg' },
  { name: 'HTML5', category: 'Frontend', logoUrl: '/tech-logos/html5.svg' },
  { name: 'CSS3', category: 'Frontend', logoUrl: '/tech-logos/css3.svg' },
  { name: 'Tailwind CSS', category: 'Frontend', logoUrl: '/tech-logos/tailwindcss.svg' },
  { name: 'Sass', category: 'Frontend', logoUrl: '/tech-logos/sass.svg' },
  { name: 'Node.js', category: 'Backend', logoUrl: '/tech-logos/nodejs.svg' },
  { name: 'Python', category: 'Backend', logoUrl: '/tech-logos/python.svg' },
  { name: 'Java', category: 'Backend', logoUrl: '/tech-logos/java.svg' },
  { name: 'Ruby on Rails', category: 'Backend', logoUrl: '/tech-logos/rails.svg' },
  { name: 'PHP', category: 'Backend', logoUrl: '/tech-logos/php.svg' },
  { name: 'Express.js', category: 'Backend', logoUrl: '/tech-logos/express.svg' },
  { name: 'PostgreSQL', category: 'Database', logoUrl: '/tech-logos/postgresql.svg' },
  { name: 'MongoDB', category: 'Database', logoUrl: '/tech-logos/mongodb.svg' },
  { name: 'MySQL', category: 'Database', logoUrl: '/tech-logos/mysql.svg' },
  { name: 'Firebase', category: 'Database', logoUrl: '/tech-logos/firebase.svg' },
  { name: 'Docker', category: 'Tools', logoUrl: '/tech-logos/docker.svg' },
  { name: 'Kubernetes', category: 'Tools', logoUrl: '/tech-logos/kubernetes.svg' },
  { name: 'Git', category: 'Tools', logoUrl: '/tech-logos/git.svg' },
  { name: 'Jenkins', category: 'Tools', logoUrl: '/tech-logos/jenkins.svg' },
  { name: 'AWS', category: 'Tools', logoUrl: '/tech-logos/aws.svg' },
  { name: 'Figma', category: 'Tools', logoUrl: '/tech-logos/figma.svg' },
  { name: 'Webpack', category: 'Tools', logoUrl: '/tech-logos/webpack.svg' },
  { name: 'Jest', category: 'Tools', logoUrl: '/tech-logos/jest.svg' },
];

const categories = [
  { name: 'All', icon: Layers },
  { name: 'Frontend', icon: Code },
  { name: 'Backend', icon: Server },
  { name: 'Database', icon: Database },
  { name: 'Tools', icon: Tool },
];

const SkillSkeleton = () => (
  <div className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 aspect-square">
    <Skeleton className="h-12 w-12 md:h-16 md:w-16 mb-3 rounded-full" />
    <Skeleton className="h-4 w-20 rounded-md" />
  </div>
);

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300); // Simulate loading
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredSkills = selectedCategory === 'All'
    ? skillsData
    : skillsData.filter(skill => skill.category === selectedCategory);
  
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
          {categories.map(category => (
            <Button
              key={category.name}
              onClick={() => {
                setSelectedCategory(category.name);
                setIsLoading(true);
              }}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              className={`
                ${selectedCategory === category.name 
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white border-transparent' 
                  : 'text-white/80 border-white/20 hover:bg-white/10 hover:text-white'
                } 
                transition-all duration-200 rounded-full px-6 py-3 text-base group
              `}
            >
              <category.icon size={20} className={`mr-2 ${selectedCategory === category.name ? 'text-white' : 'text-blue-400 group-hover:text-green-400'}`} />
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
                  key={skill.name}
                  layout
                  variants={cardAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-200 aspect-square group"
                >
                  <img  
                    className="h-12 w-12 md:h-16 md:w-16 mb-3 group-hover:scale-110 transition-transform duration-200" 
                    alt={`${skill.name} logo`}
                   src="https://images.unsplash.com/photo-1644311529675-8da508c62285" />
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