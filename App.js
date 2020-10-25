import React  from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Food from "./src/Food";
const initialState = {
  foods: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FOOD":
      return { foods: [...state.foods, { name: action.name }] };
    case "ADD_MULTIPLE_FOODS":
      return { foods: [...action.list] };
    case "ADD_FOOD_OBJ":
      return { foods: [...state.foods, action.food] };
  }
  return state;
};
const store = createStore(reducer);
export default function App() {
  return (
    <Provider store={store}>
      {/*ensures store is available throughout the app*/}
      <Food />
    </Provider>
  );
}
