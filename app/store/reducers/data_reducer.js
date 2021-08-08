import {
  GET_FOODS_LISTINGS,
  GET_FEATURED_LISTINGS,
  GET_VALUE,
} from "../actions/action_types";

const initialState = {
  foodListings: [],
  featuredListings: [],
  value: "Mexican",
};
//Data reducer for 'Your Resturents' section
export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOODS_LISTINGS:
      return {
        ...state,
        foodListings: [...state.foodListings, ...action.payload],
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
//Data reducer for 'Featured' section
export const featured_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEATURED_LISTINGS:
      return {
        ...state,
        featuredListings: [...state.featuredListings, ...action.payload],
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
//Data reducer variable value for filtering
export const filter_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VALUE:
      return {
        ...state,
        value: action.payload,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};
