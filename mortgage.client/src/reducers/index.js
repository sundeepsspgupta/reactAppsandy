import { combineReducers } from "redux";
import { dCandidate } from "./dCandidate";
import { mortgageReducers } from "./mortgage";
import { dashboardReducers } from "./dashboard";

export const reducers = combineReducers({
    dCandidate,
    mortgageReducers,
    dashboardReducers
})