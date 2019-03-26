import React from 'react';
import { compose, withStateHandlers } from 'recompose';

const defaultRoute = [
  {
    label: 'Domů',
    icon: 'home',
    link: '/'
  }
];

export default (BaseComponent) => {
  class withBreadcrumbsUpdater extends React.Component {
    constructor() {
      super();

      this.state = {
        breadcrumbsRoutes: defaultRoute
      };

      this.setBreadcrumbsRoutes = this.setBreadcrumbsRoutes.bind(this);
    }

    setBreadcrumbsRoutes(routes) {
      this.setState({ breadcrumbsRoutes: defaultRoute.concat(routes) });
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          breadcrumbsRoutes={this.state.breadcrumbsRoutes}
          setBreadcrumbsRoutes={this.setBreadcrumbsRoutes}
        />
      );
    }
  }

  const enhanced = compose(
    withStateHandlers(
      { breadcrumbsRoutes: defaultRoute },
      {
        setBreadcrumbsRoutes: () => (routes) => ({ breadcrumbsRoutes: defaultRoute.concat(routes) })
      }
    )
  )(withBreadcrumbsUpdater);

  return withBreadcrumbsUpdater;
}
