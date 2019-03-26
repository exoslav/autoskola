import React from 'react';
import { compose, withStateHandlers } from 'recompose';

const defaultRoute = [
  {
    label: 'Domů',
    icon: 'home',
    link: '/'
  }
];

export default compose(
  withStateHandlers(
    { breadcrumbsRoutes: defaultRoute },
    {
      setBreadcrumbsRoutes: () => (routes) => ({ breadcrumbsRoutes: defaultRoute.concat(routes) })
    }
  )
);
