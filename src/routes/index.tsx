import {Routes, Route} from 'react-router-dom';
import routes from './routes';
import Article from '@/components/layout/article';

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