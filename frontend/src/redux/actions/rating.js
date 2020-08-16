import axios from "axios";
import Swal from "sweetalert2";
import {
  CREATE_RATING,
  CREATE_RATING_SUCCESS,
  CREATE_RATING_FAIL,
} from "../types";

import { tokenConfig } from "./auth";

export const createRating = (rating) => (dispatch, getState) => {
  dispatch({
    type: CREATE_RATING,
  });

  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/ratings/`,
      rating,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CREATE_RATING_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        title: "Guardado!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_RATING_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
      Swal.fire({
        title: "Algo ha salido mal",
        icon: "success",
        confirmButtonText: "Ok",
      });
    });
};
