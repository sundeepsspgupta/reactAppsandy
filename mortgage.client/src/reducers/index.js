import { combineReducers } from "redux";
import { customer } from "./customer";
import { mortgageReducers } from "./mortgage";
import { dashboardReducers } from "./dashboard";

export const reducers = combineReducers({
    customer,
    mortgageReducers,
    dashboardReducers
})