import { ACTION_TYPES } from "../actions/populateCombo";
const initialState = {
    list: []
}


export const populateComboReducers = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }
        
        default:
            return state
    }
}