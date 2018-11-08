import React from 'react';
import PropTypes from 'prop-types';

import css  from './DrivingFields.scss';

import Container  from '../Container/Container';
import DrivingLicencesItem  from './DrivingFieldsItem';

class DrivingFields extends React.Component {
  render() {
    return (
      <div className="driving-fields">
        <Container>
          <h2 className="driving-fields__header">Projděte si otázky dle kategorií řidičských oprávnění</h2>

          {
            this.props.questionFields.length > 0 &&
            <ul className="driving-fields__list">
              {
                this.props.questionFields.map((categoryItem) => {
                  const {name, licenseId, icon, link} = categoryItem;

                  return <DrivingLicencesItem
                    key={link}
                    name={name}
                    licenseId={licenseId}
                    icon={icon}
                    link={link}
                  />
                })
              }
            </ul>
          }
        </Container>
      </div>
    );
  }
}

DrivingFields.defaultProps = {
  questionFields: []
};

DrivingFields.propTypes = {
  questionFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      link: PropTypes.string
    })
  )
};

export default DrivingFields;
