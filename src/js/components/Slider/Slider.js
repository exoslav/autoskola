import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStateHandlers, lifecycle, defaultProps, compose } from 'recompose';

import './Slider.scss';

class Slider extends PureComponent {
  render() {
    const { items, active } = this.props;

    return (
      <div className="slider">
        {
          items.length > 0 &&
          <ul className="slider__list">
            {
              items.map((item, index) => (
                <li className={`slider__item ${++index === active ? 'slider__item--active' : ''}`}>
                  {
                    item.img &&
                    <div className="slider__image-wrapper">
                      <img className="slider__image" src={`${item.img}`} alt={`${item.title}`}/>
                    </div>
                  }
                  <div className="slider__content">
                    <h3 className="slider__item__header">{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))
            }
          </ul>
        }
      </div>
    );
  }
}

Slider.propTypes = {
  active: PropTypes.number,
  interval: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequire,
      text: PropTypes.string.isRequire
    })
  )
};

export default compose(
  defaultProps({
    items: [],
    active: 1,
    interval: 8000
  }),
  withStateHandlers(
    ({ active }) => ({ active }),
    {
      tick: ({ active }, { items }) => () => ({ active: active === items.length ? 1 : active + 1 })
    }
  ),
  lifecycle({
    componentDidMount() {
      setInterval(() => {
        this.props.tick();
      }, this.props.interval)
    }
  })
)(Slider);
