import {
ADD_MESSAGES,
UPDATE_MESSAGES,
REMOVE_MESSAGES,
FOCUSED_USER,
UPDATE_FOCUS,
REMOVE_FOCUS
} from './actions';

const defaultState = {
    messages: [],
    focus: ''
}

export const reducer = (state=defaultState , action) => {
    switch(action.type) {
        case ADD_MESSAGES:
            return{}
        case UPDATE_MESSAGES:
            return{}
        case REMOVE_MESSAGES:
            return{}
        case FOCUSED_USER:
            return{}
        case REMOVE_FOCUS:
            return{}
        default:
            return state;
    }
}

export default reducer;