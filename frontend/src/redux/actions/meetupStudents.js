import axios from "axios";

import { MEETUP_STUDENTS_FETCH, MEETUP_STUDENTS_SUCCESS, MEETUP_STUDENTS_FAIL } from "../types";

import { tokenConfig } from "./auth";
import moment from "moment-timezone"
// CHECK TOKEN & LOAD USER
export const fetchStudents = (event_parent_id,event,search = "") => (dispatch, getState) => {
  // User Loading
  dispatch({ type: MEETUP_STUDENTS_FETCH });
  console.log(event.start)
  const start = moment(event.start).utc().format("YYYY-MM-DDTHH:mm:ss[Z]")
  let end 
  if (event.end) {
    end = moment(event.end).utc().format("YYYY-MM-DDTHH:mm:ss[Z]")
  }
  else{
    end=null
  }
  axios
    .get(
      `/api/programs/${
        getState().programReducer.program.code
      }/events/${event_parent_id}/event-students/?start=${start}&end=${end}&search=${search}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: MEETUP_STUDENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: MEETUP_STUDENTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
export const fetchStudentsPagination = (url) => (dispatch, getState) => {
  // User Loading
  dispatch({ type: MEETUP_STUDENTS_FETCH });

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: MEETUP_STUDENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: MEETUP_STUDENTS_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};
