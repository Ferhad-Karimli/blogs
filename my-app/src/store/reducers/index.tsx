import { combineReducers } from "redux"
import { BlogReducer } from "./blog"



const reducers = combineReducers({
    todo:BlogReducer,
})

export default reducers