import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [
        {
            title: '代辦事項1',
            finish: false,
            id: '479057',
            level: 'medium',
            expiryDate: new Date().toLocaleDateString(),
        },
        {
            title: '代辦事項2',
            finish: false,
            id: '477050',
            level: 'medium',
            expiryDate: new Date().toLocaleDateString(),
        },
    ],
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        deleteTodo: (state, action) => {
            const newTodoList = state.value.filter((todo) => todo.id !== action.payload)
            return newTodoList
        },
        updateTodo: (state, action) => {
            const todoLists = state.value.filter((todo) => todo.id !== action.payload.id)
            return [...todoLists, action.payload]
        },
    },
})

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer
