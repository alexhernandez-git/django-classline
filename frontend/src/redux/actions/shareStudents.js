import axios from "axios";

import { STUDENTS_FETCH, STUDENTS_SUCCESS, STUDENTS_FAIL } from "../types";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchStudents = (search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: STUDENTS_FETCH });

  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/students/?search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: STUDENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STUDENTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
// export const fetchStudentsPagination = (url) => (dispatch, getState) => {
//   // User Loading
//   dispatch({ type: STUDENTS_FETCH });

//   axios
//     .get(url, tokenConfig(getState))
//     .then((res) => {
//       dispatch({
//         type: STUDENTS_SUCCESS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: STUDENTS_FAIL,
//         payload: { data: err.response.data, status: err.response.status },
//       });
//     });
// };
