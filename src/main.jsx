
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { SiteContentProvider } from '@/lib/siteContentContext.jsx';
import '@/index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SiteContentProvider>
        <App />
      </SiteContentProvider>
    </BrowserRouter>
  </React.StrictMode>
);
