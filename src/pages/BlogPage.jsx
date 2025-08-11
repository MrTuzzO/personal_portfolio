import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag, Rss, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SkeletonCard from '@/components/SkeletonCard';

const allBlogPosts = [
  {
    id: 1,
    title: 'Building Scalable React Applications with Modern Architecture',
    excerpt: 'Learn how to structure large React applications using modern patterns like feature-based architecture, custom hooks, and state management best practices.',
    category: 'React',
    readTime: '8 min read',
    date: '2025-01-15',
    imageAlt: 'Modern React application architecture with components and hooks visualization',
    tags: ['React', 'Architecture', 'Hooks', 'State Management'],
    content: 'Detailed content for blog post 1...'
  },
  {
    id: 2,
    title: 'The Future of Web Development: AI and Machine Learning Integration',
    excerpt: 'Exploring how artificial intelligence is revolutionizing web development, from automated code generation to intelligent user interfaces.',
    category: 'AI/ML',
    readTime: '12 min read',
    date: '2025-01-10',
    imageAlt: 'Futuristic web development workspace with AI assistance and machine learning models',
    tags: ['AI', 'Machine Learning', 'Web Development', 'Future Tech'],
    content: 'Detailed content for blog post 2...'
  },
  {
    id: 3,
    title: 'Mastering CSS Grid and Flexbox for Modern Layouts',
    excerpt: 'A comprehensive guide to creating responsive, flexible layouts using CSS Grid and Flexbox with practical examples and best practices.',
    category: 'CSS',
    readTime: '10 min read',
    date: '2025-01-05',
    imageAlt: 'CSS Grid and Flexbox layout examples on multiple devices showing responsive design',
    tags: ['CSS', 'Grid', 'Flexbox', 'Responsive Design'],
    content: 'Detailed content for blog post 3...'
  },
  {
    id: 4,
    title: 'Node.js Performance Optimization: Tips and Tricks',
    excerpt: 'Discover advanced techniques to optimize your Node.js applications for better performance, including memory management and async patterns.',
    category: 'Backend',
    readTime: '15 min read',
    date: '2024-12-28',
    imageAlt: 'Node.js performance monitoring dashboard with metrics and optimization charts',
    tags: ['Node.js', 'Performance', 'Optimization', 'Backend'],
    content: 'Detailed content for blog post 4...'
  },
  {
    id: 5,
    title: 'Design Systems: Creating Consistent User Experiences',
    excerpt: 'How to build and maintain design systems that scale across teams and products, ensuring consistency and efficiency in UI development.',
    category: 'Design',
    readTime: '11 min read',
    date: '2024-12-20',
    imageAlt: 'Design system components and style guide with consistent UI elements',
    tags: ['Design Systems', 'UI/UX', 'Components', 'Consistency'],
    content: 'Detailed content for blog post 5...'
  },
  {
    id: 6,
    title: 'TypeScript Best Practices for Large-Scale Applications',
    excerpt: 'Essential TypeScript patterns and practices for building maintainable, type-safe applications that scale with your team.',
    category: 'TypeScript',
    readTime: '9 min read',
    date: '2024-12-15',
    imageAlt: 'TypeScript code editor with type definitions and error checking in action',
    tags: ['TypeScript', 'Best Practices', 'Type Safety', 'Scalability'],
    content: 'Detailed content for blog post 6...'
  },
  {
    id: 7,
    title: 'Understanding Serverless Architectures',
    excerpt: 'An introduction to serverless computing, its benefits, use cases, and popular platforms like AWS Lambda and Google Cloud Functions.',
    category: 'Backend',
    readTime: '10 min read',
    date: '2024-11-30',
    imageAlt: 'Diagram illustrating serverless architecture components',
    tags: ['Serverless', 'AWS Lambda', 'Cloud Computing', 'Backend'],
    content: 'Detailed content for blog post 7...'
  },
  {
    id: 8,
    title: 'Web Accessibility (a11y): A Developer\'s Guide',
    excerpt: 'Practical tips and techniques for building accessible web applications that cater to users of all abilities.',
    category: 'Web Development',
    readTime: '14 min read',
    date: '2024-11-22',
    imageAlt: 'Diverse group of users interacting with accessible web interfaces',
    tags: ['Accessibility', 'a11y', 'Inclusive Design', 'WCAG'],
    content: 'Detailed content for blog post 8...'
  },
];

const POSTS_PER_PAGE = 6;

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const categories = ['All', ...new Set(allBlogPosts.map(post => post.category))];

  useEffect(() => {
    setIsLoading(true);
    let filtered = allBlogPosts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    setTotalPages(Math.ceil(filtered.length / POSTS_PER_PAGE));
    const paginatedPosts = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);
    
    // Simulate loading delay
    setTimeout(() => {
      setPostsToDisplay(paginatedPosts);
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
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <section id="blog-page" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl opacity-70"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                The Digital Dispatch
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on web development, technology trends, and best practices.
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
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-violet-400 transition-all duration-200"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center
                      ${selectedCategory === category
                        ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                  >
                    {category === 'All' && <Rss size={16} className="mr-2" />}
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
                {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="posts"
                initial="initial"
                animate="in"
                variants={{ in: { transition: { staggerChildren: 0.05 }}}}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {postsToDisplay.map((post) => (
                  <motion.article
                    key={post.id}
                    variants={cardVariants}
                    layout
                    className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-violet-400/50 transition-all duration-200 group flex flex-col"
                  >
                    <Link to={`/blog/${post.id}`} className="block h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        <img  
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          alt={post.imageAlt}
                         src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs font-semibold rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center text-white/60 text-sm mb-3 space-x-4">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors duration-200">
                          {post.title}
                        </h3>

                        <p className="text-white/70 mb-4 leading-relaxed text-sm flex-grow">
                          {post.excerpt}
                        </p>

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="flex items-center px-2 py-1 bg-white/10 text-white/60 text-xs rounded-md"
                              >
                                <Tag size={10} className="mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-auto">
                          <Button
                              variant="ghost"
                              className="text-violet-400 hover:text-violet-300 p-0 h-auto font-semibold group/button self-start"
                              asChild
                            >
                              <Link to={`/blog/${post.id}`}>
                                Read More
                                <ArrowRight size={16} className="ml-2 group-hover/button:translate-x-1 transition-transform duration-200" />
                              </Link>
                            </Button>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {postsToDisplay.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/60 text-lg">No articles found matching your criteria. Try broadening your search!</p>
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

export default BlogPage;