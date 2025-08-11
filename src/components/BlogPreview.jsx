
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';

const previewPosts = [
  {
    id: 1,
    title: 'Building Scalable React Applications',
    excerpt: 'Learn modern patterns for structuring large React applications effectively.',
    category: 'React',
    readTime: '8 min',
    date: '2025-01-15',
    imageAlt: 'Abstract representation of React components and architecture'
  },
  {
    id: 2,
    title: 'AI in Web Development: The Future',
    excerpt: 'Exploring how AI is revolutionizing web development practices.',
    category: 'AI/ML',
    readTime: '12 min',
    date: '2025-01-10',
    imageAlt: 'Futuristic interface with AI assisting in code generation'
  },
  {
    id: 3,
    title: 'Mastering Modern CSS Layouts',
    excerpt: 'A guide to CSS Grid and Flexbox for responsive designs.',
    category: 'CSS',
    readTime: '10 min',
    date: '2025-01-05',
    imageAlt: 'Visual representation of CSS Grid and Flexbox layouts'
  },
];

const BlogPreview = () => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              From The Blog
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            A glimpse into my latest articles, sharing insights on technology and development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-violet-400/50 transition-all duration-300 group flex flex-col"
            >
              <Link to={`/blog/${post.id}`} className="block h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={post.imageAlt}
                   src="https://images.unsplash.com/photo-1668788272025-dbed4990dc44" />
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

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-white/70 mb-4 leading-relaxed text-sm flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <Button
                      variant="ghost"
                      className="text-violet-400 hover:text-violet-300 p-0 h-auto font-semibold group/button self-start"
                      asChild 
                    >
                        <Link to={`/blog/${post.id}`}>
                            Read More
                            <ArrowRight size={16} className="ml-2 group-hover/button:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white px-8 py-3 rounded-full font-semibold group"
            asChild
          >
            <Link to="/blog">
              <Rss size={20} className="mr-2 group-hover:animate-pulse"/>
              Explore All Posts
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
