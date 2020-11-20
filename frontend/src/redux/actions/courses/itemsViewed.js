import axios from "axios";
import Swal from "sweetalert2";

import {
  CREATE_ITEM_VIEWED,
  CREATE_ITEM_VIEWED_SUCCESS,
  CREATE_ITEM_VIEWED_FAIL,
  UPDATE_ITEM_VIEWED,
  UPDATE_ITEM_VIEWED_SUCCESS,
  UPDATE_ITEM_VIEWED_FAIL,
} from "../../types";

import { tokenConfig } from "../auth";
export const updateItemViewed = (item, item_viewed) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_ITEM_VIEWED,
  });
  // console.log(item);
  console.log("item_viewed", item_viewed);
  axios
    .patch(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().playingCourseReducer.course.code
      }/items/${item.code}/items-viewed/${item.item_viewed.id}/`,
      item_viewed,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: UPDATE_ITEM_VIEWED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_ITEM_VIEWED_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const createItemViewed = (item_id) => (dispatch, getState) => {
  dispatch({
    type: CREATE_ITEM_VIEWED,
  });

  axios
    .post(
      `/api/programs/${getState().programReducer.program.code}/courses/${
        getState().playingCourseReducer.course.code
      }/items/${item_id}/items-viewed/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: CREATE_ITEM_VIEWED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error", err.response);
      dispatch({
        type: CREATE_ITEM_VIEWED_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

// export const deleteItemViewed = (id) => (dispatch, getState) => {
//   dispatch({
//     type: DELETE_QUESTION,
//     payload: id,
//   });

//   axios
//     .delete(
//       `/api/programs/${getState().programReducer.program.code}/courses/${
//         getState().playingCourseReducer.course.code
//       }/items/${item_id}/items-viewed/${item_viewed_id}/`,
//       tokenConfig(getState)
//     )
//     .then(() => {
//       dispatch({
//         type: DELETE_QUESTION_SUCCESS,
//       });
//       Swal.fire({
//         title: "Eliminado!",
//         icon: "success",
//         confirmButtonText: "Ok",
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: DELETE_QUESTION_FAIL,
//         payload: { data: err.response.data, status: err.response.status },
//       });
//     });
// };
