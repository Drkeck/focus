import {
UPDATE_MESSAGES,
REMOVE_MESSAGES,
FOCUSED_USER,
REMOVE_FOCUS
} from './actions';

const defaultState = {
    messages: [],
    focus: ''
}

export const reducer = (state=defaultState , action) => {
    switch(action.type) {
        case UPDATE_MESSAGES:
            return{
                ...state,
                messages: [...state.messages, action.messages]
            }
        case REMOVE_MESSAGES:
            return{
                ...state,
                messages: []
            }
        case FOCUSED_USER:
            return{
                ...state,
                focus: action.focus
            }
        case REMOVE_FOCUS:
            return{
                ...state,
                focus: action.focus
            }
        default:
            return state;
    }
}

export default reducer;