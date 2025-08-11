import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, Briefcase, ArrowRight, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SkeletonCard from '@/components/SkeletonCard';


const allProjects = [
  {
    id: 1,
    title: 'E-commerce Platform "ShopSphere"',
    category: 'Web Development',
    excerpt: 'A full-featured e-commerce platform with React frontend, Node.js backend, and Stripe integration for payments. Includes product listings, user accounts, and an admin dashboard.',
    imageAlt: 'Screenshot of ShopSphere e-commerce platform homepage',
    tags: ['React', 'Node.js', 'Stripe', 'MongoDB', 'E-commerce'],
    year: 2024,
    liveLink: '#',
    repoLink: '#',
    details: 'Extensive details about ShopSphere...'
  },
  {
    id: 2,
    title: 'AI-Powered Content Generator "TextCraft"',
    category: 'AI/ML',
    excerpt: 'A web application that uses GPT-3 to generate various types of text content, including articles, ad copy, and social media posts.',
    imageAlt: 'Screenshot of TextCraft AI content generator interface',
    tags: ['Python', 'Flask', 'GPT-3', 'AI', 'NLP'],
    year: 2023,
    liveLink: '#',
    repoLink: '#',
    details: 'Extensive details about TextCraft...'
  },
  {
    id: 3,
    title: 'Mobile Fitness App "FitTrack"',
    category: 'Mobile Development',
    excerpt: 'A cross-platform mobile app built with React Native for tracking workouts, setting fitness goals, and monitoring progress.',
    imageAlt: 'Screenshots of FitTrack mobile fitness app on a smartphone',
    tags: ['React Native', 'Firebase', 'Mobile', 'Fitness'],
    year: 2023,
    liveLink: '#',
    repoLink: '#',
    details: 'Extensive details about FitTrack...'
  },
  {
    id: 4,
    title: 'Data Visualization Dashboard "Insightify"',
    category: 'Data Science',
    excerpt: 'An interactive dashboard for visualizing complex datasets, built with D3.js and Python (Flask) backend.',
    imageAlt: 'Screenshot of Insightify data visualization dashboard with charts and graphs',
    tags: ['D3.js', 'Python', 'Flask', 'Data Visualization'],
    year: 2022,
    liveLink: '#',
    repoLink: '#',
    details: 'Extensive details about Insightify...'
  },
  {
    id: 5,
    title: 'Portfolio Website Template "Prism"',
    category: 'Web Design',
    excerpt: 'A modern and responsive portfolio website template designed with Figma and built with Next.js and Tailwind CSS.',
    imageAlt: 'Screenshot of Prism portfolio website template homepage',
    tags: ['Next.js', 'Tailwind CSS', 'Figma', 'Web Design'],
    year: 2024,
    liveLink: '#',
    repoLink: '#',
    details: 'Extensive details about Prism template...'
  },
  {
    id: 6,
    title: 'Open Source UI Component Library "Aurora UI"',
    category: 'Open Source',
    excerpt: 'A set of accessible and customizable React UI components for building modern web applications.',
    imageAlt: 'Showcase of Aurora UI components',
    tags: ['React', 'TypeScript', 'Storybook', 'Open Source'],
    year: 2023,
    liveLink: '#',
    repoLink: '#',
    details: 'Extensive details about Aurora UI...'
  },
  {
    id: 7,
    title: 'Task Management App "TaskFlow"',
    category: 'Web Development',
    excerpt: 'A Kanban-style task management application with drag-and-drop functionality, user collaboration, and real-time updates.',
    imageAlt: 'Screenshot of TaskFlow application board view',
    tags: ['Vue.js', 'Firebase', 'Realtime Database', 'Productivity'],
    year: 2022,
    liveLink: '#',
    repoLink: '#',
    details: 'Extensive details about TaskFlow...'
  },
];

const PROJECTS_PER_PAGE = 6;

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [projectsToDisplay, setProjectsToDisplay] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const categories = ['All', ...new Set(allProjects.map(proj => proj.category))];

  useEffect(() => {
    setIsLoading(true);
    let filtered = allProjects;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(proj => proj.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(proj =>
        proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (proj.tags && proj.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    setTotalPages(Math.ceil(filtered.length / PROJECTS_PER_PAGE));
    const paginatedProjects = filtered.slice((currentPage - 1) * PROJECTS_PER_PAGE, currentPage * PROJECTS_PER_PAGE);

    setTimeout(() => {
      setProjectsToDisplay(paginatedProjects);
      setIsLoading(false);
    }, 500);

  }, [searchTerm, selectedCategory, currentPage]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24"
    >
      <section id="projects-page" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-70"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                My Project Showcase
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Explore a selection of projects I've worked on, showcasing my skills in various technologies and domains.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-sky-400 transition-all duration-200"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center
                      ${selectedCategory === category
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                  >
                    {category === 'All' && <Layers size={16} className="mr-2" />}
                    {category !== 'All' && <Briefcase size={16} className="mr-2" />}
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {Array.from({ length: PROJECTS_PER_PAGE }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="projects"
                initial="initial"
                animate="in"
                variants={{ in: { transition: { staggerChildren: 0.05 }}}}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {projectsToDisplay.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    layout
                    className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-sky-400/50 transition-all duration-200 group flex flex-col"
                  >
                    <Link to={`/projects/${project.id}`} className="block h-full flex flex-col">
                        <div className="relative h-56 overflow-hidden">
                        <img  
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            alt={project.imageAlt}
                         src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-xs font-semibold rounded-full">
                            {project.category}
                        </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors duration-200">
                            {project.title}
                        </h3>
                        <p className="text-white/70 text-sm mb-4 leading-relaxed flex-grow">
                            {project.excerpt}
                        </p>

                        {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.slice(0, 3).map((tag) => (
                                <span
                                key={tag}
                                className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-md"
                                >
                                {tag}
                                </span>
                            ))}
                            </div>
                        )}
                        <div className="mt-auto">
                            <Button
                                variant="ghost"
                                className="text-sky-400 hover:text-cyan-300 p-0 h-auto font-semibold group/button self-start"
                                asChild
                            >
                              <Link to={`/projects/${project.id}`}>
                                    View Details
                                    <ArrowRight size={16} className="ml-2 group-hover/button:translate-x-1 transition-transform duration-200" />
                                </Link>
                            </Button>
                        </div>
                        </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {projectsToDisplay.length === 0 && !isLoading &&(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/60 text-lg">No projects found. Try a different search or category!</p>
            </motion.div>
          )}

          {totalPages > 1 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex justify-center items-center mt-12 space-x-4"
            >
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                className="text-white/80 border-white/20 hover:bg-white/10"
              >
                <ChevronLeft size={18} className="mr-1" /> Previous
              </Button>
              <span className="text-white/80">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                variant="outline"
                className="text-white/80 border-white/20 hover:bg-white/10"
              >
                Next <ChevronRight size={18} className="ml-1" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectsPage;