import axios from "axios";

import { PRICING_FETCH, PRICING_SUCCESS, PRICING_FAIL } from "../types";

// CHECK TOKEN & LOAD USER
export const fetchPricing = () => (dispatch) => {
  // User Loading
  dispatch({ type: PRICING_FETCH });

  axios
    .get(`/api/pricing-accounts/`)
    .then((res) => {
      dispatch({
        type: PRICING_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PRICING_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
