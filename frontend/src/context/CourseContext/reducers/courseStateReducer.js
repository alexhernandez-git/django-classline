
export const courseStateReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                course: null,
                error: '',
            }
        default:
            return state;
    }
}