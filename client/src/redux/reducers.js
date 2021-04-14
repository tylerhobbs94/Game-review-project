import { SET_USER } from "./action"

export function userReducer(state = null, action) {
    switch (action.type) {
        case SET_USER:
            return action.data;
    
        default:
            return state;
    }
}