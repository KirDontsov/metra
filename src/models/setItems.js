export default {
  state: {
    items: null,
    isReady: false,
    // latitude: 44.560424499999996,
    // longitude: 38.079167,
    haveUsersLocation: false,
    zoom: 15
  },
  reducers: {
    setItems: (state, payload) => ({
      ...state,
      items: payload,
      isReady: true
    }),
    setMapCenter: (state, payload) => ({
      ...state,
      latitude: payload,
      longitude: payload,
      haveUsersLocation: payload,
      zoom: payload
    })
  }
};
