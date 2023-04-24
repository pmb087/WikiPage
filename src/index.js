import React from 'react';
import ReactDOM from 'react-dom/client';
import WikiProvider from './context/WikiContext';
import Router from './Router';
import GlobalStyle from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle />
    <WikiProvider>
      <Router />
    </WikiProvider>
  </>
);
