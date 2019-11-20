const initialState = {
  coords: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_COORDS":
      return {
        items: action.payload
      };

    default:
      return state;
  }
};
