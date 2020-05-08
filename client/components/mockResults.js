//TODO use context or redux
export const mockResult = [
  {
    driver: {
      id: 1, name: 'Virginie',
      departureDate: 1588774296658,
      departureAddress: 'Place de l\'Etoile, Paris',
      departureLocation: { lat: 48.873767349999994, lng: 2.2954440989984803 },
      departureTime: '16:30:00'
    },
    passengers: [
      {
        id: 2, name: 'Brendan',
        departureLocation: { lat: 41.4019693, lng: -2.1860034 },
        departureTime: '15:45:00'
      },
      {
        id: 3, name: 'Anthony',
        departureLocation: { lat: 41.4019695, lng: -2.1862589 },
        departureTime: '16:15:00'
      },
      {
        id: 4, name: 'Lello',
        departureLocation: { lat: 41.4019542, lng: -2.1862875 },
        departureTime: '16:05:00'
      }
    ]
  },
  {
    driver: {
      id: 5, name: 'John',
      departureDate: 1588774443514,
      departureLocation: { lat: 48.858093, lng: 2.294694 },
      departureTime: '20:45:00'
    },
    passengers: [
      {
        id: 6, name: 'Jane',
        departureLocation: { lat: 41.473568, lng: 2.081234 },
        departureTime: '19:45:00'
      },
      {
        id: 7, name: 'Jake',
        departureLocation: { lat: 41.475789, lng: 2.085781 },
        departureTime: '19:30:00'
      }
    ]
  }
];