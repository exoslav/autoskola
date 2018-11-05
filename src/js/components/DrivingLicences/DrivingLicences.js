import React from 'react';
import PropTypes from 'prop-types';

import css  from './DrivingLicences.scss';

import Container  from '../Container/Container';
import DrivingLicencesItem  from './DrivingLicencesItem';

class TestsByQuestionFields extends React.Component {
  render() {
    return (
      <div className="driving-licenses">
        <Container>
          <h2 className="driving-licenses__header">Projděte si jednotlivé okruhy otázek:</h2>

          {
            this.props.questionFields.length > 0 &&
            <ul className="driving-licenses__list">
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

TestsByQuestionFields.defaultProps = {
  questionFields: []
};

TestsByQuestionFields.propTypes = {
  questionFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      link: PropTypes.string
    })
  )
};

export default TestsByQuestionFields;
