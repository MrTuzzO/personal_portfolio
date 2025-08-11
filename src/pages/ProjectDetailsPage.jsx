
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Zap, Palette, Code, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const allProjects = [
   {
    id: 1,
    title: 'E-commerce Platform "ShopSphere"',
    category: 'Web Development',
    year: 2024,
    excerpt: 'A full-featured e-commerce platform with React frontend, Node.js backend, and Stripe integration for payments. Includes product listings, user accounts, and an admin dashboard.',
    imageAlt: 'Screenshot of ShopSphere e-commerce platform homepage',
    tags: ['React', 'Node.js', 'Stripe', 'MongoDB', 'E-commerce', 'JavaScript', 'Tailwind CSS'],
    liveLink: '#',
    repoLink: '#',
    details: `
      <p class="text-lg leading-relaxed mb-6">ShopSphere is a comprehensive e-commerce solution designed to provide a seamless online shopping experience. Built with a modern tech stack, it offers robust functionality for both customers and administrators.</p>
      
      <h2 class="text-3xl font-semibold text-white my-8">Key Features</h2>
      <ul class="list-none space-y-4 mb-8">
        <li class="flex items-start"><CheckCircle class="text-green-400 mr-3 mt-1 flex-shrink-0" size={24}/><div><strong>User Authentication:</strong> Secure registration and login system with JWT.</div></li>
        <li class="flex items-start"><CheckCircle class="text-green-400 mr-3 mt-1 flex-shrink-0" size={24}/><div><strong>Product Catalog:</strong> Dynamic product listings with search, filtering, and sorting.</div></li>
        <li class="flex items-start"><CheckCircle class="text-green-400 mr-3 mt-1 flex-shrink-0" size={24}/><div><strong>Shopping Cart & Checkout:</strong> Intuitive cart management and secure Stripe-powered checkout.</div></li>
        <li class="flex items-start"><CheckCircle class="text-green-400 mr-3 mt-1 flex-shrink-0" size={24}/><div><strong>Order Management:</strong> Users can view their order history; admins can manage orders.</div></li>
        <li class="flex items-start"><CheckCircle class="text-green-400 mr-3 mt-1 flex-shrink-0" size={24}/><div><strong>Admin Dashboard:</strong> Tools for managing products, users, and site settings.</div></li>
        <li class="flex items-start"><CheckCircle class="text-green-400 mr-3 mt-1 flex-shrink-0" size={24}/><div><strong>Responsive Design:</strong> Optimized for all devices using Tailwind CSS.</div></li>
      </ul>

      <img  class="w-full h-auto object-cover rounded-xl my-8 shadow-lg" alt="Admin dashboard of ShopSphere" src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b" />

      <h2 class="text-3xl font-semibold text-white my-8">Technical Stack</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-slate-800/50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-sky-400 mb-2">Frontend</h3>
          <ul class="list-disc list-inside text-white/80 space-y-1">
            <li>React.js</li>
            <li>React Router</li>
            <li>Tailwind CSS</li>
            <li>Framer Motion</li>
            <li>Context API / Zustand for State Management</li>
          </ul>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-sky-400 mb-2">Backend</h3>
          <ul class="list-disc list-inside text-white/80 space-y-1">
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB with Mongoose</li>
            <li>Stripe API for Payments</li>
            <li>JSON Web Tokens (JWT) for Auth</li>
          </ul>
        </div>
      </div>

      <h2 class="text-3xl font-semibold text-white my-8">Challenges & Solutions</h2>
      <p class="text-lg leading-relaxed mb-4">One major challenge was implementing a secure and efficient payment gateway. Integrating Stripe's API required careful handling of sensitive data and ensuring PCI compliance. Solution involved using Stripe Elements for frontend card input and server-side processing for payment intents.</p>
      <p class="text-lg leading-relaxed mb-6">Another challenge was managing complex application state (cart, user sessions, product data). This was addressed by using a combination of React Context for simpler global state and Zustand for more complex, frequently updated state, ensuring performance and developer ergonomics.</p>
      
      <blockquote class="border-l-4 border-sky-500 p-4 my-8 bg-sky-500/10 text-white/90 rounded-r-lg">
        <p class="italic">ShopSphere demonstrates a full-stack development capability, focusing on user experience, security, and scalability. It was a fantastic learning experience in building a production-ready application.</p>
      </blockquote>
    `
  },
   {
    id: 2,
    title: 'AI-Powered Content Generator "TextCraft"',
    category: 'AI/ML',
    year: 2023,
    excerpt: 'A web application that uses GPT-3 to generate various types of text content, including articles, ad copy, and social media posts.',
    imageAlt: 'Screenshot of TextCraft AI content generator interface',
    tags: ['Python', 'Flask', 'GPT-3', 'AI', 'NLP'],
    liveLink: '#',
    repoLink: '#',
    details: '<p class="text-lg leading-relaxed mb-6">TextCraft is cool. This is placeholder content.</p>'
  },
];

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProject = allProjects.find(p => p.id.toString() === id);
    setProject(foundProject);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Loading project details...
        </motion.div>
      </div>
    );
  }
  
  const handleLinkClick = (url, type) => {
    if (url === '#') {
      toast({
        title: `🚧 ${type} Link Not Available`,
        description: "This is a demo project. The link isn't implemented yet!",
      });
    } else {
      window.open(url, '_blank');
    }
  };


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
                    alt={project.imageAlt}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {project.title}
                </h1>
                <span className="px-3 py-1 bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-sm font-semibold rounded-full inline-block">
                  {project.category} - {project.year}
                </span>
              </div>
              <div className="flex space-x-3">
                <Button 
                    onClick={() => handleLinkClick(project.liveLink, 'Live Site')}
                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
                >
                    <ExternalLink size={18} className="mr-2" /> Live Site
                </Button>
                <Button 
                    onClick={() => handleLinkClick(project.repoLink, 'Repository')}
                    variant="outline" 
                    className="flex-1 border-white/30 text-white/80 hover:bg-white/10"
                >
                    <Github size={18} className="mr-2" /> Repository
                </Button>
              </div>
              {project.tags && project.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Technologies Used:</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
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
                dangerouslySetInnerHTML={{ __html: project.details }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetailsPage;
