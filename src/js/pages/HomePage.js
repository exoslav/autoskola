import React, { Fragment } from 'react';

import allQuestions from '../redux/sady-otazek/pravidla-provozu-na-pozemnich-komunikacich';
import deployQuestions from '../firebase/scripts/deployQuestions';

import Slider from '../components/Slider/Slider';
import Container from '../components/Container/Container';
import DrivingFieldsContainer from '../components/DrivingFields/DrivingFieldsContainer';

class HomePage extends React.Component {
  constructor() {
    super();

    this.deployQuestions = this.deployQuestions.bind(this);
  }

  deployQuestions() {
    deployQuestions(allQuestions.slice(0, 30));
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Slider
            items={[
              {
                title: 'Více než 1.000 testových otázek',
                text: 'Projděte si více než tisíc testových otázek v interaktivních testech. Otázky jsou aktuální přímo ze stránke ministerstva dopravy!',
                img: './assets/imgs/slider/slider-1.jpg'
              },
              {
                title: 'Vytvořte si účet!',
                text: 'Přihlášením se získáte možnost si otázky ukládat, psát si k nim poznámky a uvidíte historii svých testů.',
                img: './assets/imgs/slider/slider-1.jpg'
              }
            ]}
          />
        </Container>

        <button
          type="button"
          onClick={() => this.deployQuestions()}
        >
          Deploy
        </button>

        <DrivingFieldsContainer />
      </Fragment>
    );
  }
}

HomePage.defaultProps = {
};

HomePage.propTypes = {
};

export default HomePage;
