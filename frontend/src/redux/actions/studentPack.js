import axios from "axios";
import Swal from "sweetalert2";
import {
  STUDENT_PACK_FETCH,
  STUDENT_PACK_SUCCESS,
  STUDENT_PACK_FAIL,
} from "../types";

import { tokenConfig } from "./auth";
// CHECK TOKEN & LOAD USER
export const fetchPack = (programId, packId) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: STUDENT_PACK_FETCH });

  axios
    .get(`/api/programs/${
      programId
    }/packs/${packId}`)
    .then((res) => {
      console.log(res);

      dispatch({
        type: STUDENT_PACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STUDENT_PACK_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
