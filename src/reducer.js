/**
 * Created by mluk on 08.04.17.
 */
import {combineReducers} from "redux";

const initialState = {
    gruss: "...",
    name: ""
}

const reducer1 = (state = initialState, {type, gruss}) => {
    switch (type) {
        case "UPDATE_GRUSS":
            return {...state, gruss: gruss};
        case "DELETE_GRUSS":
            return {...state, gruss: "..."};
        default:
            return state
    }
}

const reducer2 = (state = initialState, {type, name}) => {
    switch (type) {
        case "UPDATE_NAME":
            return {...state, name: name};
        case "DELETE_NAME":
            return {...state, name: name};
        default:
            return state
    }
}

export default combineReducers(reducer1, reducer2)