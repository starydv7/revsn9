// Action Types
import { GET_ROOMS,FILTER_ROOMS,SORT_ROOMS } from "./actionTypes";

// Action Creators
const getData = (data) => {
  return {
    type: GET_ROOMS,
    payload: data,
  };
};

const filterData = (data) => {
  return {
    type: FILTER_ROOMS,
    payload: data,
  };
};

const sortData = (data) => {
  return {
    type: SORT_ROOMS,
    payload: data,
  };
};
export { filterData,getData, sortData };
