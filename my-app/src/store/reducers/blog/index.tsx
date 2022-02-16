import { BlogItemType } from "../../../interface/blog"
import * as type from "../../types/blog"

type ActionType = {
    type:string
    payload: any
}


let initialState = {
    todos: [],
}

export const BlogReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {

        case type.GET_BLOGS:
            return { ...state, todos: action.payload }

        case type.GET_SPECIFICBLOG:
            localStorage.setItem(type.GET_SPECIFICBLOG, JSON.stringify([action.payload, ...state.todos]))
            return { ...state, todos: [action.payload, ...state.todos] }

        case type.MAKE_NEWPOST :
            let data = state.todos.map((todo: BlogItemType) => {
                if (todo.id === action.payload) {
                    todo.completed = !todo.completed
                }
                return todo
            })

            localStorage.setItem(type.UPDATE_POST, JSON.stringify(data))
            return { ...state, todos: data }

        case type.DELETE_POST:
            let importantData = state.todos.map((todo: BlogItemType) => {
                if (todo.id === action.payload.id) {
                    todo.important = action.payload.important
                }
                return todo
            })

            localStorage.setItem(type.MAKENEW_COMMENT, JSON.stringify(importantData))
            return { ...state, todos: importantData }

      

        default:
            return state
    }
}


