import { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../features/Home';

export function AppRoutes() {
  const navigate = useNavigate();
  const isRootPath = window.location.pathname === '/';

  useEffect(() => {
    if (isRootPath) {
      navigate('/home');
    }
  }, [isRootPath, navigate]);

  const commonRoutes = [
    {
      element: <Layout />,
      path: '/',
      children: [
        { element: <Home />, path: '/home', index: true },
        {
          element: <div>recettes</div>,
          path: 'recipes',
        },
        {
          element: <div>404</div>,
          path: '*',
        },
      ],
    },
  ];

  const element = useRoutes(commonRoutes);

  return element;
}
