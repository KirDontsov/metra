export default {
  state: {
    firstAddress: "",
    secondAddress: "",
    additionalAddress: "",
    phone: "",
    comment: "",
    query1: "г. Геленджик, ",
    query2: "г. Геленджик, ",
    query3: "г. Геленджик, ",
    data1: "",
    data2: "",
    data3: "",
    didFetched1: false,
    didFetched2: false,
    didFetched3: false,
    backEndFetch: 0,
    errors: null,
    res: ""
  },
  reducers: {
    setFirstAddress: (state, payload) => ({
      ...state,
      firstAddress: payload
    }),
    setSecondAddress: (state, payload) => ({
      ...state,
      secondAddress: payload
    }),
    setAdditionalAddress: (state, payload) => ({
      ...state,
      additionalAddress: payload
    }),
    setPhone: (state, payload) => ({
      ...state,
      phone: payload
    }),
    setComment: (state, payload) => ({
      ...state,
      comment: payload
    }),
    setData1: (state, payload) => ({
      ...state,
      data1: payload,
      didFetched1: true
    }),
    setData2: (state, payload) => ({
      ...state,
      data2: payload,
      didFetched2: true
    }),
    setData3: (state, payload) => ({
      ...state,
      data3: payload,
      didFetched3: true
    }),
    setRes: (state, payload) => ({
      ...state,
      res: payload
    }),
    clearGeoJson: (state, payload) => ({
      ...state,
    })
  }
};
