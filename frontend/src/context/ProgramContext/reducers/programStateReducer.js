
export const programStateReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                program: action.payload
            }
        default:
            return state;
    }
}