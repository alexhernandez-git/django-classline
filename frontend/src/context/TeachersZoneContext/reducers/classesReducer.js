

export const classesReducer = (state, action) => {
    switch (action.type) {
        case 'CLASSES_CONFIRMED_REQUEST':
            return {
                ...state,
                isFetching: true,
                hasError: false
            };
        case 'CLASSES_CONFIRMED_SUCCESS':
            return {
                ...state,
                isFetching: false,
                classes_confirmed: action.payload
            };
        case 'CLASSES_CONFIRMED_ERROR':
            return {
                ...state,
                hasError: true,
                isFetching: false
            };
        case 'CLASSES_TO_BE_CONFIRMED_REQUEST':
            return {
                ...state,
                isFetching: true,
                hasError: false
            };
        case 'CLASSES_TO_BE_CONFIRMED_SUCCESS':
            return {
                ...state,
                isFetching: false,
                classes_to_be_confirmed: action.payload
            };
        case 'CLASSES_TO_BE_CONFIRMED_ERROR':
            return {
                ...state,
                hasError: true,
                isFetching: false
            };
        case 'CONFIRM_CLASS':
            action.payload.confirmedDate = new Date()
            const newArray = state.classes_to_be_confirmed.filter((classElement) => {
                return classElement.id != action.payload.id
            })
            const newArrayConfirmed = [...state.classes_confirmed, action.payload]
            const newArrayConfirmedSorted = newArrayConfirmed.sort((a, b) => (b.confirmedDate - a.confirmedDate))

            return {
                ...state,
                classes_confirmed: newArrayConfirmedSorted,
                classes_to_be_confirmed: newArray
            }
        case 'CANCEL_CLASS_CONFIRMED':
            const newArrayClassesConfirmed = state.classes_confirmed.filter((classElement) => {
                return classElement.id != action.payload.id
            })
            return {
                ...state,
                classes_confirmed: newArrayClassesConfirmed
            }
        case 'CANCEL_CLASS_TO_BE_CONFIRMED':
            const newArrayClassesToBeConfirmed = state.classes_to_be_confirmed.filter((classElement) => {
                return classElement.id != action.payload.id
            })
            return {
                ...state,
                classes_to_be_confirmed: newArrayClassesToBeConfirmed
            }
        default:
            return state;
    }
}