
export const teacherStateReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            console.log(action.payload.classes_buyed);

            return {
                ...state,
                loading: false,
                user: action.payload.user,
                classes: action.payload.classes,
                classes_buyed: action.payload.classes_buyed,
                error: '',
            }
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: 'Algo ha ido mal'
            }
        case 'SET_EVENT_CLASSES_LEFT':
            const classesUsed = state.classes.filter(classData => classData.owner.id == action.payload.user_id)
            const count = state.classes_buyed - classesUsed.length
            const newClassesLeft = []
            for (let y = 0; y < count; y++) {
                newClassesLeft[y] = {
                    id: null,
                    title: '',
                    start: null,
                    constraint: 'businessHours',
                    description: ''
                };
            }
            return {
                ...state,
                event_classes_left: newClassesLeft
            }
        case 'ADD_CLASS':

            let newArrayClassesLeft = state.event_classes_left
            newArrayClassesLeft.pop()
            return {
                ...state,
                event_classes_left: newArrayClassesLeft
            }

        case 'REMOVE_CLASS':

            return {
                ...state,
                event_classes_left: [...state.event_classes_left, {
                    id: null,
                    title: '',
                    start: null,
                    constraint: 'businessHours',
                    description: ''
                }]
            }
        case 'SET_CLASSES_LEFT':

            const newArray = [];
            for (let index = 0; index < action.payload; index++) {
                newArray[index] = {
                    id: null,
                    title: '',
                    start: null,
                    constraint: 'businessHours',
                    description: ''
                };
            }
            return {
                ...state,
                event_classes_left: [...newArray, ...state.event_classes_left]
            }
        case 'ADD_CLASSES':
            let newArrayClasses = []
            if (Array.isArray(action.payload)) {
                newArrayClasses = [...state.classes, ...action.payload]
            } else {
                newArrayClasses = [...state.classes, action.payload]
            }
            return {
                ...state,
                classes: newArrayClasses
            }
        case 'UPDATE_CLASSES':
            const indexClasses = state.classes.findIndex(event => event.id === action.payload.id);
            state.classes[indexClasses].description = action.payload.description
            state.classes[indexClasses].students = action.payload.students
            return state
        case 'DELETE_CLASSES':
            const indexClasses1 = state.classes.findIndex(event => event.id === action.payload.id);
            state.classes.splice(indexClasses1, 1)
            return state
        case 'ADD_TEMPORARY_CLASS':
            return {
                ...state,
                temporary_classes: [...state.temporary_classes, action.payload]
            }
        case 'UPDATE_TEMPORARY_CLASS':

            const index = state.temporary_classes.findIndex(event => event.id === action.payload.id);

            state.temporary_classes[index].description = action.payload.description
            state.temporary_classes[index].students = action.payload.students

            return state
        case 'DELETE_TEMPORARY_CLASS':
            const index1 = state.temporary_classes.findIndex(event => event.id === action.payload.id);
            state.temporary_classes.splice(index1, 1)
            return state
        case 'SET_TEMPORARY_CLASS':

            return {
                ...state,
                temporary_classes: action.payload
            }
        case 'RESET_TEMPORARY_CLASS':
            return {
                ...state,
                temporary_classes: []
            }
        case 'ADD_CLASS':
            state.event_classes_left.pop()
            return state
        case 'REMOVE_CLASS':
            return {
                ...state,
                event_classes_left: [
                    ...state.event_classes_left,
                    {
                        id: null,
                        title: '',
                        start: null,
                        constraint: 'businessHours',
                        description: ''
                    }
                ]
            }
        case 'SET_CLASSES_LEFT':
            const newArray2 = [];
            for (let index2 = 0; index2 < action.payload; index2++) {
                newArray2[index2] = {
                    id: null,
                    title: '',
                    start: null,
                    constraint: 'businessHours',
                    description: ''
                };

            }
            return {
                ...state,
                event_classes_left: [...newArray2, ...state.event_classes_left]
            }
        case 'ADD_ASSIGNED_CLASS':
            return {

                ...state,
                classes_assigned_left: [
                    ...state.classes_assigned_left,
                    {
                        id: null,
                        title: '',
                        start: null,
                        constraint: 'businessHours',
                        description: ''
                    }

                ]
            }
        case 'REMOVE_ASSIGNED_CLASS':
            state.classes_assigned_left.pop()
            return state
        case 'SET_ASSIGNED_CLASS':
            const newArray3 = [];
            for (let index3 = 0; index3 < action.payload; index3++) {
                newArray3[index3] = {
                    id: null,
                    title: '',
                    start: null,
                    constraint: 'businessHours',
                    description: ''
                };

            }
            return {
                ...state,
                classes_assigned_left: [...newArray3, ...state.classes_assigned_left]
            }
        case 'RESET_ASSIGNED_CLASS':
            return {
                ...state,
                classes_assigned_left: []
            }
        case 'SET_SELECTED_CLASSES':
            return {
                ...state,
                selected_classes: action.payload
            }
        case 'BUY_CLASSES':
            const newArray4 = [];
            for (let index4 = 0; index4 < state.selected_classes; index4++) {
                newArray4[index4] = {
                    id: null,
                    title: '',
                    start: null,
                    constraint: 'businessHours',
                    description: ''
                };

            }
            return {
                ...state,
                classes: [...state.classes, ...state.temporary_classes],
                temporary_classes: [],
                classes_assigned_left: [],
                event_classes_left: [...state.event_classes_left, ...newArray4],
                selected_classes: 0,
                classes_buyed: state.classes_buyed + state.selected_classes,
            }
        default:
            return state;
    }
}