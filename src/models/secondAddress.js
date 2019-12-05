// count model
export default {
  state: {
    addClass: false,
    step: 0,
    phone: "",
    firstAddress: "",
    secondAddress: "",
    additionalAddress: "",
    disabled: true
  },
  reducers: {
    changeClass: (state, payload) => ({
      ...state,
      addClass: payload
    }),
    nextStep: (state, payload) => ({
      ...state,
      step: payload + 1
    })
  }
};
