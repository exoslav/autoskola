import React from 'react';

import queryString  from 'query-string';

export default (BaseComponent) => {
  class withQueryStringHandler extends React.Component {
    constructor() {
      super();

      this.state = ({
        testOptions: null,
        testOptionsError: false
      });

      this.TYPES = {
        category: ['pravidla-provozu'],
        sorting: ['random']
      };
    }

    componentDidMount() {
      const { category, sorting, count } = queryString.parse(this.props.location.search);

      if (
        !this.TYPES['category'].find(categoryItem => categoryItem === category) ||
        !this.TYPES['sorting'].find(sortingItem => sortingItem === sorting) ||
        !parseInt(count)
      ) {
        this.setState({
          testOptions: { category, sorting, count },
          testOptionsError: true
        });
      } else {
        this.setState({
          testOptions: { category, sorting, count },
          testOptionsError: false
        });
      }
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          testOptions={this.state.testOptions}
          testOptionsError={this.state.testOptionsError}
        />
      );
    }
  }

  return withQueryStringHandler;
}
