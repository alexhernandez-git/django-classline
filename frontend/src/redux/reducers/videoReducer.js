
import {
    VIDEO_FETCH,
    VIDEO_SUCCESS,
    VIDEO_FAIL,

} from "../types";

const initialState = {
    isLoading: false,
    video: null,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case VIDEO_FETCH:
            return {
                ...state,
                isLoading: true
            };
        case VIDEO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                video: action.payload
            };

        case VIDEO_FAIL:
            return {
                ...state,
                video: null,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}