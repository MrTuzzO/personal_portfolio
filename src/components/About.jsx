import React from 'react';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/lib/siteContentContext';
const About = () => {
  const { siteContent } = useSiteContent();
  const sectionAnimation = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  return <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div variants={sectionAnimation} initial="initial" whileInView="animate" viewport={{
        once: true
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover the person behind the code and the philosophy that drives my work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <img
              className="rounded-xl shadow-2xl object-cover w-full h-auto md:max-h-[500px] aspect-[4/5]"
              alt={siteContent?.name ? `${siteContent.name} about` : "About profile"}
              src={siteContent?.about_me_img || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-semibold text-white mb-4">Hello, I'm {siteContent?.name || 'Portfolio User'}</h3>
            <div className="text-lg text-white/80 leading-relaxed mb-4">
              {siteContent?.about_me
                ? siteContent.about_me.split('\n').map((para, idx) => (
                    <p key={idx} className="mb-4">{para}</p>
                  ))
                : <p>About content not available.</p>}
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default About;