
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/education/`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setEducation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  // Helper to format date range
  const formatPeriod = (start, end) => {
    const startDate = new Date(start);
    const startStr = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    if (!end) return `${startStr} - Present`;
    const endDate = new Date(end);
    const endStr = endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    return `${startStr} - ${endStr}`;
  };

  // Certifications (dynamic)
  const [certifications, setCertifications] = useState([]);
  const [certLoading, setCertLoading] = useState(true);
  const [certError, setCertError] = useState(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setCertLoading(true);
        const response = await fetch(`${API_BASE_URL}/certifications/`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCertifications(data);
      } catch (err) {
        setCertError(err.message);
      } finally {
        setCertLoading(false);
      }
    };
    fetchCertifications();
  }, []);

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
              {loading ? (
                <div className="text-center text-white/60">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
                  <p>Loading education data...</p>
                </div>
              ) : error ? (
                <div className="text-center text-red-400">
                  <p>Failed to load education data: {error}</p>
                </div>
              ) : education.length === 0 ? (
                <div className="text-center text-white/60">
                  <GraduationCap size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No education data available.</p>
                </div>
              ) : (
                education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                        <h5 className="text-lg text-teal-400 font-semibold mb-2">{edu.institution}</h5>
                        <div className="flex items-center text-white/60 mb-2">
                          <Calendar size={16} className="mr-2" />
                          <span>{formatPeriod(edu.start_date, edu.end_date)}</span>
                        </div>
                        <div className="text-white/60 mb-4">
                          📍 {edu.location} • Result: {edu.result}
                        </div>
                      </div>
                    </div>

                    {edu.description && edu.description.trim() !== '' && (
                      <p className="text-white/80 mb-6 leading-relaxed">{edu.description}</p>
                    )}
                  </motion.div>
                ))
              )}
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
              {certLoading ? (
                <div className="text-center text-white/60">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                  <p>Loading certifications...</p>
                </div>
              ) : certError ? (
                <div className="text-center text-red-400">
                  <p>Failed to load certifications: {certError}</p>
                </div>
              ) : certifications.length === 0 ? (
                <div className="text-center text-white/60">
                  <Award size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No certifications available.</p>
                </div>
              ) : (
                certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
                        <Award size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1">{cert.name}</h4>
                        <p className="text-white/70">{cert.issuing_organization}</p>
                        <p className="text-white/60 text-sm">
                          {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                        </p>
                        {(cert.credential_url && cert.credential_url !== 'null' && cert.credential_url.trim() !== '') && (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-semibold shadow hover:from-cyan-600 hover:to-teal-600 transition-colors mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                          >
                            <Award size={16} className="text-white" />
                            Verify Credential
                          </a>
                        )}
                        {(cert.credential_id && cert.credential_id !== 'null' && cert.credential_id.trim() !== '') && (
                          <span className="text-xs text-cyan-300 bg-cyan-500/10 rounded px-2 py-1 block mt-2 w-fit font-mono">Credential ID: {cert.credential_id}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
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
