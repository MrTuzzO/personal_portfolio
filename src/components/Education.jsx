
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'Stanford University',
      location: 'Stanford, CA',
      period: '2017 - 2019',
      gpa: '3.8/4.0',
      description: 'Specialized in Machine Learning and Human-Computer Interaction. Thesis on "Improving User Experience through AI-Driven Interface Design".',
      courses: ['Advanced Algorithms', 'Machine Learning', 'HCI Design', 'Database Systems', 'Software Engineering']
    },
    {
      degree: 'Bachelor of Science in Software Engineering',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      period: '2013 - 2017',
      gpa: '3.7/4.0',
      description: 'Graduated Magna Cum Laude. Active member of the Computer Science Society and participated in multiple hackathons.',
      courses: ['Data Structures', 'Web Development', 'Mobile App Development', 'Computer Networks', 'Software Testing']
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2023',
      icon: Award
    },
    {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      year: '2022',
      icon: Award
    },
    {
      name: 'React Advanced Certification',
      issuer: 'Meta',
      year: '2021',
      icon: Award
    }
  ];

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
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
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Education & Certifications
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            My academic background and continuous learning journey in technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-8 flex items-center"
            >
              <GraduationCap className="mr-3 text-teal-400" size={32} />
              Education
            </motion.h3>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                      <h5 className="text-lg text-teal-400 font-semibold mb-2">{edu.school}</h5>
                      <div className="flex items-center text-white/60 mb-2">
                        <Calendar size={16} className="mr-2" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="text-white/60 mb-4">
                        📍 {edu.location} • GPA: {edu.gpa}
                      </div>
                    </div>
                  </div>

                  <p className="text-white/80 mb-6 leading-relaxed">{edu.description}</p>

                  <div>
                    <h6 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <BookOpen size={18} className="mr-2" />
                      Key Courses
                    </h6>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="px-3 py-1 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-white/80 rounded-full text-sm border border-white/10"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-8 flex items-center"
            >
              <Award className="mr-3 text-cyan-400" size={32} />
              Certifications
            </motion.h3>

            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
                      <cert.icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1">{cert.name}</h4>
                      <p className="text-white/70">{cert.issuer}</p>
                      <p className="text-white/60 text-sm">{cert.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Learning */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <h4 className="text-xl font-bold text-white mb-4">Continuous Learning</h4>
              <p className="text-white/80 mb-4">
                I believe in lifelong learning and staying updated with the latest technologies and industry trends.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Online Courses', 'Tech Conferences', 'Open Source', 'Mentoring', 'Side Projects'].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm border border-white/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
