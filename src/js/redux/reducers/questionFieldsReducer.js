const initState = [
  {
    id: 'pravidla-provozu',
    name: 'Pravidla provozu na pozemních komunikacích',
    icon: 'motorcycle',
    link: '/otazky/pravidla-provozu',
    perex: 'Otázky oheldně pravidel silničního provozu.'
  },
  {
    id: 'dopravni-znacky',
    name: 'Dopravní značky',
    icon: 'car-side',
    link: '/otazky/dopravni-znacky',
    perex: 'Otázky ohledně dopravních značek.'
  },
  {
    id: 'pravidla-bezpecne-jizdy',
    name: 'Zásady bezpečné jízdy',
    icon: 'truck',
    link: '/otazky/pravidla-bezpecne-jizdy',
    perex: 'Otázky ohledně bezpečné jízdy.'
  },
  {
    id: 'dopravni-situace',
    name: 'Dopravní situace',
    icon: 'bus',
    link: '/otazky/dopravni-situace',
    perex: 'Otázky ohledně dopravních situací.'
  },
  {
    id: 'predpisy-provozu-vozidel',
    name: 'Předpisy o podmínkách provozu vozidel',
    icon: 'bus',
    link: '/otazky/predpisy-provozu-vozidel',
    perex: 'Otázky ohledně předpisů vozidel.'
  },
  {
    id: 'predpisy-souvisejici-s-provozem',
    name: 'Předpisy související s provozem',
    icon: 'bus',
    link: '/otazky/predpisy-souvisejici-s-provozem',
    perex: 'Předpisy související s provozem.'
  },
  {
    id: 'zdravotnicka-priprava',
    name: 'Zdravotnická příprava',
    icon: 'bus',
    link: '/otazky/zdravotnicka-priprava',
    perex: 'Otázky ohledně zdravotnické přípravy.'
  }
];

export default (state = initState, action) => {
  return state
}
