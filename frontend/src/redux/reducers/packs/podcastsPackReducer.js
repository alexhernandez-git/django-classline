import {
  STUDENT_PODCASTS_PACK_FETCH,
  STUDENT_PODCASTS_PACK_SUCCESS,
  STUDENT_PODCASTS_PACK_FAIL,
  PLAY_STUDENT_PODCAST_PACK,
  STOP_STUDENT_PODCAST_PACK,

} from "../../types";

const initialState = {
  isLoading: true,
  podcasts: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STUDENT_PODCASTS_PACK_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case STUDENT_PODCASTS_PACK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        podcasts: action.payload,
      };

    case STUDENT_PODCASTS_PACK_FAIL:
      return {
        ...state,
        podcasts: null,
        isLoading: false,
        error: action.payload,
      };
    case PLAY_STUDENT_PODCAST_PACK:
      return {
        ...state,
        podcast_playing: action.payload,
      };
    case STOP_STUDENT_PODCAST_PACK:
      return {
        ...state,
        podcast_playing: null,
      };
  
    default:
      return state;
  }
}
