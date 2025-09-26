
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/work-experience/`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setExperiences(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // Helper function to format date period
  const formatDatePeriod = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    if (!endDate || endDate === '9999-12-31') {
      return `${start} - Present`;
    }
    const end = new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    return `${start} - ${end}`;
  };

  const handleViewProject = (company) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
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
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            My professional journey and the impact I've made at various organizations.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center text-white/60">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
              <p>Loading experience data...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-400">
              <p>Failed to load experience data: {error}</p>
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center text-white/60">
              <div className="mx-auto mb-4 opacity-50">
                <Calendar size={48} />
              </div>
              <p>No work experience data available.</p>
            </div>
          ) : (
            experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline Line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-orange-400 to-red-400 opacity-30"></div>
                )}

                <div className="flex items-start space-x-8">
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.designation}</h3>
                        {exp.company_website && exp.company_website !== 'null' && exp.company_website.trim() !== '' ? (
                          <a
                            href={exp.company_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl text-orange-400 font-semibold mb-4 underline hover:text-orange-300 transition-colors"
                          >
                            {exp.organization}
                          </a>
                        ) : (
                          <h4 className="text-xl text-orange-400 font-semibold mb-4">{exp.organization}</h4>
                        )}
                      </div>
                      <div className="flex flex-col md:items-end space-y-2">
                        <div className="flex items-center text-white/60">
                          <Calendar size={16} className="mr-2" />
                          <span>{formatDatePeriod(exp.starting_date, exp.end_date)}</span>
                        </div>
                        <div className="flex items-center text-white/60">
                          <MapPin size={16} className="mr-2" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {exp.description && (
                      <div
                        className="mb-6 leading-relaxed max-w-none prose prose-invert prose-sm [&>p]:mb-3 [&>p]:text-white/80 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:space-y-1 [&>ul>li]:text-white/70 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:space-y-1 [&>ol>li]:text-white/70 [&>h1]:text-xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mb-2 [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-white [&>h2]:mb-2 [&>h3]:text-base [&>h3]:font-medium [&>h3]:text-white [&>h3]:mb-2 [&>strong]:font-semibold [&>strong]:text-white [&>em]:italic [&>a]:text-orange-400 [&>a]:underline hover:[&>a]:text-orange-300"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white/80 rounded-full text-sm border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
