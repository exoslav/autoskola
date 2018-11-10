import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMotorcycle as fasMotorcycle,
  faCarSide as fasCarSide,
  faCarCrash as fasCarCrash,
  faCarBattery as fasCarBattery,
  faBus as fasBus,
  faTruck as fasTruck,
  faStar as fasStar,
  faHome as fasHome,
  faExclamationTriangle as fasExclamationTriangle,
  faUser as fasUser,
  faAlignJustify as fasAlignJustify,
  faTh as fasTh,
  faBriefcaseMedical as fasBriefcaseMedical,
  faTrafficLight as fasTrafficLight,
  faSign as fasSign,
  faChalkboardTeacher as fasChalkboardTeacher,
  faStickyNote as fasStickyNote
} from '@fortawesome/free-solid-svg-icons';

import {
  faStar as farStar,
  faStickyNote as farStickyNote
} from '@fortawesome/free-regular-svg-icons';

const initIcons = () => {
  library.add(
    fasMotorcycle, fasCarSide, fasCarCrash, fasCarBattery, fasBus, fasTruck, fasStar, farStar, fasHome,
    fasExclamationTriangle, fasUser, fasAlignJustify, fasTh, fasBriefcaseMedical, fasTrafficLight, fasSign,
    fasChalkboardTeacher, fasStickyNote, farStickyNote
  );
};

export default initIcons;
