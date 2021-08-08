import {
  GET_FOODS_LISTINGS,
  GET_FEATURED_LISTINGS,
  GET_VALUE,
} from "../actions/action_types";

//action for "Your Restaurent" data
export const getDataListings = (payload) => {
  return {
    type: GET_FOODS_LISTINGS,
    payload: payload,
  };
};
//action for "Featured" data
export const getFeaturedListings = (payload) => {
  return {
    type: GET_FEATURED_LISTINGS,
    payload: payload,
  };
};
//action for Filtering
export const filterAction = (payload) => {
  return {
    type: GET_VALUE,
    payload: payload,
  };
};
