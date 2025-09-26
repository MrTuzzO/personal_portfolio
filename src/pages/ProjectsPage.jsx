import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, Briefcase, ArrowRight, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SkeletonCard from '@/components/SkeletonCard';


const PROJECTS_PER_PAGE = 6;


const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [projectCategories, setProjectCategories] = useState([]);

  useEffect(() => {
    // Fetch project categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/project-categories/`);
        if (!response.ok) throw new Error('Failed to fetch project categories');
        const data = await response.json();
        setProjectCategories(data);
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch projects from API with pagination and category filter
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        let url = `${API_BASE_URL}/projects/?page=${currentPage}`;
        if (selectedCategoryId !== 'All') {
          url += `&category=${selectedCategoryId}`;
        }
        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
  setProjects(data.results);
  setTotalPages(Math.ceil(data.count / PROJECTS_PER_PAGE));
  setNextUrl(data.next);
  setPrevUrl(data.previous);
      } catch (err) {
        setProjects([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [selectedCategoryId, currentPage, searchTerm]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <motion.div
      className="min-h-screen pt-24"
    >
      <section id="projects-page" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                My Project Showcase
              </span>
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 mb-10">
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
              <button
                key="all"
                onClick={() => handleCategoryChange('All')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${selectedCategoryId === 'All' ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'}`}
              >
                <Layers size={16} className="mr-2" />
                All
              </button>
              {projectCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${selectedCategoryId === cat.id ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'}`}
                >
                  <Briefcase size={16} className="mr-2" />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {Array.from({ length: PROJECTS_PER_PAGE }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="projects"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-sky-400/50 transition-all duration-200 group flex flex-col"
                  >
                    <Link to={`/projects/${project.id}`} className="block h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        <img  
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          alt={project.title}
                          src={project.featured_image || 'https://images.unsplash.com/photo-1595872018818-97555653a011'} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-xs font-semibold rounded-full">
                          {project.category_name}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-white/70 text-sm mb-4 leading-relaxed flex-grow">
                          {project.short_description}
                        </p>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tag) => (
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

          {projects.length === 0 && !isLoading &&(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/60 text-lg">No projects found. Try a different search or category!</p>
            </motion.div>
          )}

          {(nextUrl || prevUrl) && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex justify-center items-center mt-12 space-x-4"
            >
              <Button
                onClick={() => {
                  if (prevUrl) setCurrentPage(prev => Math.max(prev - 1, 1));
                }}
                disabled={!prevUrl}
                variant="outline"
                className="text-white/80 border-white/20 hover:bg-white/10"
              >
                <ChevronLeft size={18} className="mr-1" /> Previous
              </Button>
              <span className="text-white/80">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => {
                  if (nextUrl) setCurrentPage(prev => prev + 1);
                }}
                disabled={!nextUrl}
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
}

export default ProjectsPage;