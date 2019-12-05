export default {
  state: {
    items: null,
    isReady: false
  },
  reducers: {
    setItems: (state, payload) => ({
      ...state,
      items: payload,
      isReady: true
    })
  }
};
