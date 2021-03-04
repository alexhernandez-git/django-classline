
import {
    RECOMENDED_VIDEOS_FETCH,
    RECOMENDED_VIDEOS_SUCCESS,
    RECOMENDED_VIDEOS_FAIL,

} from "../types";

const initialState = {
    isLoading: false,
    videos: null,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RECOMENDED_VIDEOS_FETCH:
            return {
                ...state,
                isLoading: true
            };
        case RECOMENDED_VIDEOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                videos: action.payload
            };

        case RECOMENDED_VIDEOS_FAIL:
            return {
                ...state,
                videos: null,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}