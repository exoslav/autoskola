import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMotorcycle as fasMotorcycle,
  faCarSide as fasCarSide,
  faBus as fasBus,
  faTruck as fasTruck,
  faStar as fasStar,
  faHome as fasHome
} from '@fortawesome/free-solid-svg-icons';

import {
  faStar as farStar
} from '@fortawesome/free-regular-svg-icons';

const initIcons = () => {
  library.add(fasMotorcycle, fasCarSide, fasBus, fasTruck, fasStar, farStar, fasHome);
};

export default initIcons;
