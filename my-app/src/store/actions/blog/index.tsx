import { toast } from "react-toastify";
import { AppDispatch } from "../..";
import { BlogItemType } from "../../../interface/blog";
import * as service from "../../../services/Todo"
import * as type from "../../types/todo";

export const fillData = () => async (dispatch: AppDispatch) => {
    let data = localStorage.getItem(type.FILL_TODOS)

    if (data) {
        dispatch({ type: type.FILL_TODOS, payload: JSON.parse(data) })
        return
    }

    try {
        let { data } = await service.getTodos()
        dispatch({ type: type.FILL_TODOS, payload: data })
        localStorage.setItem(type.FILL_TODOS, JSON.stringify(data))
    } catch (error) {
        toast.error("Error")
    }
}

export const addTodo = (todoForm: BlogItemType) => async (dispatch: AppDispatch) => {
    try {
        let { status } = await service.addTodos(todoForm)
        if (status === 201) {
            dispatch({ type: type.ADD_TODO, payload: todoForm })
            toast.success("Successfully added")
        }

    } catch (error) {
        toast.error("Error")
    }
}

export const completedTodo = (todoID: number | undefined | string) => {
    return { type: type.COMPLETED_TODO, payload: todoID }
}

export const addImportantTodo = (data:AppDispatch) => {
    return { type: type.IMPORTANT_TODO, payload: data }
}

export const deleteTodo = (todoID: number) => async (dispatch: AppDispatch) => {

    try {
        let { status } = await service.deleteTodos(todoID)

        if (status === 200) {
            dispatch({ type: type.DELETE_TODO, payload: todoID })
            toast.success("Successfully deleted")
        }

    } catch (error) {
        toast.error("Error")
    }
}

