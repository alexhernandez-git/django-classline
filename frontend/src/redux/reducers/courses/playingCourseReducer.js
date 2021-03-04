import {
  PLAYING_COURSE_FETCH,
  PLAYING_COURSE_SUCCESS,
  PLAYING_COURSE_FAIL,
  CREATE_ITEM_VIEWED,
  CREATE_ITEM_VIEWED_FAIL,
  CREATE_ITEM_VIEWED_SUCCESS,
  UPDATE_ITEM_VIEWED,
  UPDATE_ITEM_VIEWED_FAIL,
  UPDATE_ITEM_VIEWED_SUCCESS,
} from "../../types";

const initialState = {
  isLoading: true,
  course: {
    blocks: [],
  },
  error: null,
  item_viewed_creating: false,
  item_viewed_created_error: null,
  item_viewed_updating: false,
  item_viewed_updated_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PLAYING_COURSE_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case PLAYING_COURSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        course: action.payload,
      };

    case PLAYING_COURSE_FAIL:
      return {
        ...state,
        course: null,
        isLoading: false,
        error: action.payload,
      };
    case CREATE_ITEM_VIEWED:
      return {
        ...state,
        item_viewed_creating: true,
      };
    case CREATE_ITEM_VIEWED_SUCCESS:
      return {
        ...state,
        item_viewed_creating: false,
        item_viewed_created_error: null,
      };

    case CREATE_ITEM_VIEWED_FAIL:
      return {
        ...state,
        item_viewed_creating: false,
        item_viewed_created_error: action.payload,
      };
    case UPDATE_ITEM_VIEWED:
      return {
        ...state,
        item_viewed_updating: true,
      };
    case UPDATE_ITEM_VIEWED_SUCCESS:
      return {
        ...state,
        item_viewed_updating: false,
        item_viewed_updated_error: null,
      };
    case UPDATE_ITEM_VIEWED_FAIL:
      return {
        ...state,
        item_viewed_updating: false,
        item_viewed_updated_error: action.payload,
      };
    default:
      return state;
  }
}
