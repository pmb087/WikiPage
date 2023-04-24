import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostWikiPage from './components/PostWikiPage';
import WikiDetail from './components/WikiDetail';
import WikiMain from './components/WikiMain';
import WikiEditing from './components/WikiEditing';
import NotFound from './components/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WikiMain />} />
        <Route path='/post' element={<PostWikiPage />} />
        <Route path='/detail/:id' element={<WikiDetail />} />
        <Route path='/detail/:id/edit' element={<WikiEditing />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
