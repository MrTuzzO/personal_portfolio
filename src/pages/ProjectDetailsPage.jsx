

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { API_BASE_URL } from '@/lib/api';


const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/projects/${id}/`);
        if (!response.ok) throw new Error('Failed to fetch project details');
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setProject(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleLinkClick = (url, type) => {
    if (!url) {
      toast({
        title: `🚧 ${type} Link Not Available`,
        description: "This project does not have a link yet!",
      });
    } else {
      window.open(url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Loading project details...
        </motion.div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Project not found.
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24"
    >
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
        >
          <Link to="/projects" className="flex items-center text-sky-400 hover:text-sky-300 transition-colors group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Left Column: Image and Meta */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                 <img 
                    className="w-full h-full object-cover"
                    alt={project.title}
                    src={project.featured_image || 'https://images.unsplash.com/photo-1595872018818-97555653a011'} />
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {project.title}
                </h1>
                <span className="px-3 py-1 bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-sm font-semibold rounded-full inline-block">
                  {project.category?.name}
                </span>
              </div>
              <div className="flex space-x-3">
                <Button 
                    onClick={() => handleLinkClick(project.live_link, 'Live Site')}
                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
                >
                    <ExternalLink size={18} className="mr-2" /> Live Site
                </Button>
                <Button 
                    onClick={() => handleLinkClick(project.repo_link, 'Repository')}
                    variant="outline" 
                    className="flex-1 border-white/30 text-white/80 hover:bg-white/10"
                >
                    <Github size={18} className="mr-2" /> Repository
                </Button>
              </div>
              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Technologies Used:</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right Column: Details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div 
                className="prose prose-invert prose-lg max-w-none text-white/80 
                           prose-headings:text-white prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
                           prose-p:text-base prose-p:leading-relaxed prose-p:mb-4
                           prose-a:text-sky-400 hover:prose-a:text-sky-300 prose-a:transition-colors
                           prose-strong:text-white/90
                           prose-blockquote:border-sky-500 prose-blockquote:bg-sky-500/10 prose-blockquote:text-white/90 prose-blockquote:rounded-r-lg prose-blockquote:text-base
                           prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-1 prose-ul:text-base
                           prose-li:marker:text-sky-400
                           prose-img:rounded-lg prose-img:shadow-md prose-img:my-6"
                dangerouslySetInnerHTML={{ __html: project.detailed_description }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetailsPage;
