import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Tag, Edit2, Linkedin, Twitter, Facebook, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'; 

const allBlogPosts = [
  {
    id: 1,
    title: 'Building Scalable React Applications with Modern Architecture',
    excerpt: 'Learn how to structure large React applications using modern patterns like feature-based architecture, custom hooks, and state management best practices.',
    category: 'React',
    author: 'Alex Johnson',
    readTime: '8 min read',
    date: '2025-01-15',
    imageAlt: 'Modern React application architecture with components and hooks visualization',
    tags: ['React', 'Architecture', 'Hooks', 'State Management', 'Frontend'],
    content: `
      <p class="text-lg leading-relaxed mb-6">Building scalable React applications requires careful planning and a well-thought-out architecture. As projects grow, managing state, components, and side effects can become challenging. In this post, we'll explore modern patterns and best practices to help you structure your React applications for long-term maintainability and scalability.</p>
      <h2 class="text-3xl font-semibold text-white my-8">Feature-Based Architecture</h2>
      <p class="text-lg leading-relaxed mb-6">One popular approach is organizing your codebase by features rather than by type (e.g., components, containers, reducers). This means all files related to a specific feature (e.g., user authentication, product display) are grouped together. This makes it easier to locate related code and promotes modularity.</p>
      <img  class="w-full h-auto object-cover rounded-xl my-8 shadow-lg" alt="Diagram of feature-based architecture" src="https://images.unsplash.com/photo-1630255452787-70c5468377c6" />
      <h2 class="text-3xl font-semibold text-white my-8">Custom Hooks for Reusable Logic</h2>
      <p class="text-lg leading-relaxed mb-6">Custom hooks (functions starting with <code>use</code>) allow you to extract component logic into reusable functions. This is incredibly useful for sharing stateful logic between components without resorting to higher-order components or render props. For example, you could create a <code>useFetch</code> hook for data fetching or a <code>useForm</code> hook for managing form state.</p>
      <pre class="bg-gray-800/50 p-4 rounded-lg overflow-x-auto my-6 text-sm"><code class="language-javascript">
function useCustomHook(initialValue) {
  const [value, setValue] = useState(initialValue);
  // ... more logic
  return [value, setValue];
}
      </code></pre>
      <h2 class="text-3xl font-semibold text-white my-8">State Management Strategies</h2>
      <p class="text-lg leading-relaxed mb-6">Choosing the right state management strategy is crucial. While React's built-in Context API is suitable for some use cases, larger applications often benefit from more robust solutions like Redux, Zustand, or Recoil.</p>
      <ul class="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 pl-4">
        <li><strong>Context API:</strong> Good for theming, user authentication, or simple global state.</li>
        <li><strong>Redux/Zustand:</strong> Excellent for complex state, asynchronous actions, and middleware.</li>
        <li><strong>Recoil:</strong> Offers a more React-ish approach with atoms and selectors.</li>
      </ul>
      <h2 class="text-3xl font-semibold text-white my-8">Code Splitting and Lazy Loading</h2>
      <p class="text-lg leading-relaxed mb-6">To improve initial load times, especially for large applications, implement code splitting using <code>React.lazy()</code> and dynamic <code>import()</code>. This allows you to load components only when they are needed, reducing the initial bundle size.</p>
      <blockquote class="border-l-4 border-purple-500 p-4 my-8 bg-purple-500/10 text-white/90 rounded-r-lg">
        <p class="italic">"The key to managing complexity is to break things down into smaller, manageable pieces. This applies to software architecture as much as it does to any other complex system."</p>
      </blockquote>
      <p class="text-lg leading-relaxed">By incorporating these patterns and practices, you can build React applications that are not only scalable but also enjoyable to develop and maintain. Remember that the best architecture is one that fits your team's needs and the project's requirements.</p>
    `
  },
   {
    id: 2,
    title: 'The Future of Web Development: AI and Machine Learning Integration',
    excerpt: 'Exploring how artificial intelligence is revolutionizing web development, from automated code generation to intelligent user interfaces.',
    category: 'AI/ML',
    author: 'Alex Johnson',
    readTime: '12 min read',
    date: '2025-01-10',
    imageAlt: 'Futuristic web development workspace with AI assistance and machine learning models',
    tags: ['AI', 'Machine Learning', 'Web Development', 'Future Tech'],
    content: `<p class="text-lg leading-relaxed mb-6">AI is changing web dev. This is a placeholder for post ID 2.</p> 
              <img  class="w-full h-auto object-cover rounded-xl my-8 shadow-lg" alt="AI web dev concept" src="https://images.unsplash.com/photo-1677442136019-21780ecad995" />`
  },
  {
    id: 3,
    title: 'Mastering CSS Grid and Flexbox for Modern Layouts',
    excerpt: 'A comprehensive guide to creating responsive, flexible layouts using CSS Grid and Flexbox with practical examples and best practices.',
    category: 'CSS',
    author: 'Alex Johnson',
    readTime: '10 min read',
    date: '2025-01-05',
    imageAlt: 'CSS Grid and Flexbox layout examples on multiple devices showing responsive design',
    tags: ['CSS', 'Grid', 'Flexbox', 'Responsive Design'],
    content: `<p class="text-lg leading-relaxed mb-6">CSS Grid and Flexbox are powerful tools. This is a placeholder for post ID 3.</p>
               <img  class="w-full h-auto object-cover rounded-xl my-8 shadow-lg" alt="CSS layouts" src="https://images.unsplash.com/photo-1634634465913-5bb5600942f2" />`
  },
   {
    id: 4,
    title: 'Node.js Performance Optimization: Tips and Tricks',
    excerpt: 'Discover advanced techniques to optimize your Node.js applications for better performance, including memory management and async patterns.',
    category: 'Backend',
    author: 'Alex Johnson',
    readTime: '15 min read',
    date: '2024-12-28',
    imageAlt: 'Node.js performance monitoring dashboard with metrics and optimization charts',
    tags: ['Node.js', 'Performance', 'Optimization', 'Backend'],
    content: `<p class="text-lg leading-relaxed mb-6">Optimizing Node.js is key. This is a placeholder for post ID 4.</p>
               <img  class="w-full h-auto object-cover rounded-xl my-8 shadow-lg" alt="Nodejs performance" src="https://images.unsplash.com/photo-1650234083177-871b96b6c575" />`
  },
  {
    id: 5,
    title: 'Design Systems: Creating Consistent User Experiences',
    excerpt: 'How to build and maintain design systems that scale across teams and products, ensuring consistency and efficiency in UI development.',
    category: 'Design',
    author: 'Alex Johnson',
    readTime: '11 min read',
    date: '2024-12-20',
    imageAlt: 'Design system components and style guide with consistent UI elements',
    tags: ['Design Systems', 'UI/UX', 'Components', 'Consistency'],
    content: `<p class="text-lg leading-relaxed mb-6">Design systems ensure consistency. This is a placeholder for post ID 5.</p>
               <img  class="w-full h-auto object-cover rounded-xl my-8 shadow-lg" alt="Design system example" src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960" />`
  },
  {
    id: 6,
    title: 'TypeScript Best Practices for Large-Scale Applications',
    excerpt: 'Essential TypeScript patterns and practices for building maintainable, type-safe applications that scale with your team.',
    category: 'TypeScript',
    author: 'Alex Johnson',
    readTime: '9 min read',
    date: '2024-12-15',
    imageAlt: 'TypeScript code editor with type definitions and error checking in action',
    tags: ['TypeScript', 'Best Practices', 'Type Safety', 'Scalability'],
    content: `<p class="text-lg leading-relaxed mb-6">TypeScript helps build robust apps. This is a placeholder for post ID 6.</p>
              <img  class="w-full h-auto object-cover rounded-xl my-8 shadow-lg" alt="TypeScript code" src="https://images.unsplash.com/photo-1625398122646-049e15c5fb1b" />`
  },
  {
    id: 7,
    title: 'Understanding Serverless Architectures',
    excerpt: 'An introduction to serverless computing, its benefits, use cases, and popular platforms like AWS Lambda and Google Cloud Functions.',
    category: 'Backend',
    author: 'Alex Johnson',
    readTime: '10 min read',
    date: '2024-11-30',
    imageAlt: 'Diagram illustrating serverless architecture components',
    tags: ['Serverless', 'AWS Lambda', 'Cloud Computing', 'Backend'],
    content: `<p class="text-lg leading-relaxed mb-6">Serverless is the future. This is a placeholder for post ID 7.</p>
               <img  class="w-full h-auto object-cover rounded-xl my-8 shadow-lg" alt="Serverless diagram" src="https://images.unsplash.com/photo-1643101807331-21a4a3f081d5" />`
  },
  {
    id: 8,
    title: 'Web Accessibility (a11y): A Developer\'s Guide',
    excerpt: 'Practical tips and techniques for building accessible web applications that cater to users of all abilities.',
    category: 'Web Development',
    author: 'Alex Johnson',
    readTime: '14 min read',
    date: '2024-11-22',
    imageAlt: 'Diverse group of users interacting with accessible web interfaces',
    tags: ['Accessibility', 'a11y', 'Inclusive Design', 'WCAG'],
    content: `<p class="text-lg leading-relaxed mb-6">Accessibility matters. This is a placeholder for post ID 8.</p>
               <img  class="w-full h-auto object-cover rounded-xl my-8 shadow-lg" alt="Accessibility concept" src="https://images.unsplash.com/photo-1542587073-9ab99bcc5d6d" />`
  }
];

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    // Simulate API call
    setTimeout(() => {
      const foundPost = allBlogPosts.find(p => p.id.toString() === id);
      setPost(foundPost);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = post?.title || "Check out this amazing blog post!";
    let shareUrl = '';

    switch(platform) {
      case 'LinkedIn':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case 'Twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'Facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: title,
              text: post?.excerpt || "Great read!",
              url: url,
            });
            return; 
          } catch (error) {
            console.error('Error sharing:', error);
          }
        }
        // Fallback for browsers not supporting navigator.share or if it fails
        navigator.clipboard.writeText(url).then(() => {
           alert('Link copied to clipboard!');
        }).catch(err => {
           console.error('Failed to copy: ', err);
           alert('Failed to copy link.');
        });
        return;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 container mx-auto px-6 py-12 max-w-4xl">
        <Skeleton className="h-8 w-1/4 mb-8" />
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-16 w-full mb-6" />
          <div className="flex flex-wrap items-center text-white/70 text-sm mb-8 space-x-6">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-72 md:h-96 w-full rounded-xl mb-10" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-5/6 mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-4/6 mb-10" />
          <Skeleton className="h-10 w-1/3 mb-4" />
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Post not found.
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24"
    >
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mb-8"
        >
          <Link to="/blog" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </motion.div>

        <article className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-semibold rounded-full mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-white/70 text-sm mb-8 space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex items-center mr-6 md:mr-0">
                <User size={16} className="mr-2 text-purple-400" />
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center mr-6 md:mr-0">
                <Calendar size={16} className="mr-2 text-purple-400" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-purple-400" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="relative h-72 md:h-96 rounded-xl overflow-hidden mb-10 shadow-xl"
          >
            <img  
              className="w-full h-full object-cover"
              alt={post.imageAlt}
             src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="prose prose-invert prose-lg max-w-none text-white/90 
                       prose-headings:text-white prose-h2:text-3xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-6
                       prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
                       prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-a:transition-colors
                       prose-strong:text-white/95
                       prose-blockquote:border-purple-500 prose-blockquote:bg-purple-500/10 prose-blockquote:text-white/90 prose-blockquote:rounded-r-lg
                       prose-code:bg-gray-800/50 prose-code:p-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
                       prose-pre:bg-slate-800/70 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:text-sm
                       prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                       prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                       prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && post.tags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y:20 }}
              animate={{ opacity: 1, y:0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Tag size={20} className="mr-2 text-purple-400"/>
                Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/10 text-white/80 rounded-full text-sm hover:bg-white/20 transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Share2 size={20} className="mr-2 text-purple-400"/>
              Share this post
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white/80" onClick={() => handleShare('LinkedIn')}>
                <Linkedin size={18} className="mr-2"/> LinkedIn
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white/80" onClick={() => handleShare('Twitter')}>
                <Twitter size={18} className="mr-2"/> Twitter
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white/80" onClick={() => handleShare('Facebook')}>
                <Facebook size={18} className="mr-2"/> Facebook
              </Button>
               <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white/80" onClick={() => handleShare('Generic')}>
                <Edit2 size={18} className="mr-2"/> Copy Link / More
              </Button>
            </div>
          </motion.div>

        </article>
      </div>
    </motion.div>
  );
};

export default BlogPostPage;