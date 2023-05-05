// src/reduxStore.js

import { createStore } from 'redux';

// Actions
const TOGGLE_UNIT = 'TOGGLE_UNIT';

const toggleUnit = () => ({
  type: TOGGLE_UNIT,
});

// Reducer
const initialState = {
  isCelcius: true,
};

const weatherUnitReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_UNIT:
      return {
        ...state,
        isCelcius: !state.isCelcius,
      };
    default:
      return state;
  }
};

// Store
const store = createStore(
  weatherUnitReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store, toggleUnit };
