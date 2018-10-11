const initState = [
  {
    name: 'Motocykl',
    licenseId: 'A',
    icon: 'motorcycle',
    link: '/testy/motocykl'
  },
  {
    name: 'Osobní automobil',
    licenseId: 'B',
    icon: 'car-side',
    link: '/testy/osobni-automobil'
  },
  {
    name: 'Nákladní automobil nad 3500 Kg',
    licenseId: 'C',
    icon: 'truck',
    link: '/testy/nakladni-automobil-nad-3500-kg'
  },
  {
    name: 'Autobus',
    licenseId: 'D',
    icon: 'bus',
    link: '/testy/autobus'
  }
];

export default (state = initState, action) => {
  return state
}
