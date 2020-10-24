import {
  TOPICS_FETCH,
  TOPICS_SUCCESS,
  TOPICS_FAIL,
  CREATE_TOPIC,
  CREATE_TOPIC_FAIL,
  CREATE_TOPIC_SUCCESS,
} from "../../types";

const initialState = {
  isLoading: true,
topics: null,
  error: null,
topic_edit: null,
topic_editing: false,
topic_edit_error: null,
topic_creating: false,
topic_create_error: null,
topic_delete: null,
topic_deleting: false,
topic_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOPICS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case TOPICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      topics: action.payload,
      };

    case TOPICS_FAIL:
      return {
        ...state,
      topics: null,
        isLoading: false,
        error: action.payload,
      };
    
    case CREATE_TOPIC:
      return {
        ...state,
      topic_creating: true,
      };
    case CREATE_TOPIC_SUCCESS:
      return {
        ...state,
      topic_creating: false,
      topics: {
          ...statetopics,
          results: [action.payload, ...statetopics.results],
        },
      };

    case CREATE_TOPIC_FAIL:
      return {
        ...state,
      topic_creating: false,
      topic_create_error: action.payload,
      };
     default:
      return state;
  }
}
