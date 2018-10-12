import React from 'react';
import PropTypes from 'prop-types';

import QuestionFieldsItem  from './QuestionFieldsItem';

class TestsByQuestionFields extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>Projděte si jednotlivé okruhy otázek:</h2>

        {
          this.props.questionFields.length > 0 &&
          <ul>
            {
              this.props.questionFields.map((categoryItem) => {
                const {name, licenseId, icon, link} = categoryItem;

                return <QuestionFieldsItem
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
      </React.Fragment>
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
