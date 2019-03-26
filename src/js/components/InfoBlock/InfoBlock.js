import React from 'react';
import PropTypes from 'prop-types';

import InfoBlockItem from './InfoBlockItem';

import './InfoBlock.scss';

const InfoBlock = ({ title, infoItems, view }) => (
  <div className="infoblock">
    {
      title &&
      <strong className="infoblock__title">{title}</strong>
    }

    {
      infoItems.length > 0 &&
      <ul className={`infoblock__list infoblock__list--${view} styled-list`}>
        {
          infoItems.map(infoItem => (
            <InfoBlockItem
              text={infoItem.text}
              icon={infoItem.icon}
              view={view}
            />
          ))
        }
      </ul>
    }
  </div>
);

InfoBlock.defaultProps = {
  title: null,
  view: 'aligned'
};

InfoBlock.propTypes = {
  title: PropTypes.string,
  infoItems: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.string
  })).isRequired,
  view: PropTypes.oneOf(['aligned', 'wrapped'])
};

export default InfoBlock;
