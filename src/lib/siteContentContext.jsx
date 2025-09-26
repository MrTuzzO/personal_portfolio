// Centralized site content context for global use
import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api';

const SiteContentContext = createContext();

export const SiteContentProvider = ({ children }) => {
  const [siteContent, setSiteContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/site-content/`);
        if (!response.ok) throw new Error('Failed to fetch site content');
        const data = await response.json();
        setSiteContent(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <SiteContentContext.Provider value={{ siteContent, loading, error }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);
