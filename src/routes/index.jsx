import React from 'react';
import {Routes, Route} from 'react-router-dom';
import routes from './routes';
import Article from '../component/article/article';

const Router = () => {
  return (
    <Article>
      <Routes>
        {routes.map((route) => (
          <Route
            path={route.path}
            key={`${route.name}:${route.path}`}
            element={<route.component />}
            />
        ))}
      </Routes>
    </Article>
  );
};

export default Router;