import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../pages/home/page'));
const IdolProject = lazy(() => import('../pages/idol-project/page'));
const Guideline = lazy(() => import('../pages/guideline/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/idol-project',
    element: <IdolProject />,
  },
  {
    path: '/guideline',
    element: <Guideline />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
