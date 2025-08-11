import React from 'react';
import { motion } from 'framer-motion';
const About = () => {
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
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.4,
          delay: 0.1
        }} viewport={{
          once: true
        }} className="w-full">
            <img className="rounded-xl shadow-2xl object-cover w-full h-auto md:max-h-[500px] aspect-[4/5]" alt="Alex Johnson, a professional full-stack developer, smiling confidently in a modern workspace" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" />
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.4,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="space-y-6">
            <div>
              <h3 className="text-3xl font-semibold text-white mb-4">Hello, I'm Alex Johnson</h3>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                A passionate Full Stack Developer with over 5 years of experience dedicated to building intuitive, high-performance web applications. My journey into tech was fueled by a fascination with how digital solutions can solve real-world problems and enhance human experiences.
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-4">
                I specialize in JavaScript ecosystems, particularly React and Node.js, but I'm always eager to explore new technologies. I thrive in collaborative environments, believing that the best products are born from diverse perspectives and open communication.
              </p>
               <p className="text-lg text-white/80 leading-relaxed">
                My philosophy centers around user-centric design and writing clean, scalable code. I'm not just building features; I'm crafting experiences. When I'm not coding, you can find me exploring new hiking trails, experimenting with new recipes, or diving into a good sci-fi novel.
              </p>
            </div>
             <div className="pt-4">
                <h4 className="text-2xl font-semibold text-white mb-3">List</h4>
                <ul className="list-disc list-inside text-white/70 space-y-2 text-lg">
                    <li><strong>Integrity:</strong> Building trust through transparent and ethical work.</li>
                    <li><strong>Innovation:</strong> Constantly seeking creative and efficient solutions.</li>
                    <li><strong>Collaboration:</strong> Believing in the power of teamwork.</li>
                    <li><strong>Growth:</strong> Committed to continuous learning and self-improvement.</li>
                </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default About;