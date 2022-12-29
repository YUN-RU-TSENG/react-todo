import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo, updateTodo } from './features/todo/todoSlice'
import styles from './App.module.css'
import TodoList from './components/TodoList/TodoList'
import TodoListItem from './components/TodoListItem/TodoListItem'
import TodoFormAdd from './components/TodoFormAdd/TodoFormAdd'
import TodoFormEdit from './components/TodoFormEdit/TodoFormEdit'

function App() {
    // redux app state
    const todoList = useSelector((state) => state.todo)
    const dispatch = useDispatch()

    // container component state
    const [isFormAddOpen, setIsFormAddOpen] = useState(false)
    const [isFormEditOpen, setIsFormEditOpen] = useState(false)
    const [cacheTodo, setCacheTodo] = useState()

    function addTodoItem(newTodo) {
        dispatch(addTodo(newTodo))
    }

    function deleteTodoItem(id) {
        dispatch(deleteTodo(id))
    }

    // 更新當前編輯 todo 的資料
    function updateTodoItem() {
        dispatch(updateTodo(cacheTodo))
    }

    // 更新當前 todo 完成狀態
    function markTodoItemFinish(id) {
        const todo = todoList.value.filter((todo) => todo.id === id)
        dispatch(updateTodo({ ...todo[0], finish: !todo[0].finish }))
    }

    function updateCacheTodo(property, value) {
        setCacheTodo((state) => ({ ...state, [property]: value }))
    }

    function toggleAddForm() {
        setIsFormAddOpen((state) => !state)
    }

    // 開關點擊當下的 todo 編輯表單
    function toggleEditForm(id) {
        setIsFormEditOpen((state) => !state)

        // 依照點擊的 id 來更新編輯表單內呈現的 cache todo
        setCacheTodo(() => {
            const [newTodoList] = todoList.value.filter((todo) => todo.id === id)

            return (
                { ...newTodoList } ?? {
                    title: '',
                    finish: false,
                    id: '',
                    level: '',
                    expiryDate: '',
                }
            )
        })
    }

    return (
        <div className={styles.app}>
            <div className={styles['app-wrapper']}>
                <h2 className={styles['app-title']}>代辦清單</h2>
                <TodoList>
                    {todoList.value.map((todo) => (
                        <TodoListItem
                            finish={todo.finish}
                            title={todo.title}
                            expiryDate={todo.expiryDate}
                            level={todo.level}
                            id={todo.id}
                            key={todo.id}
                            deleteTodoItem={deleteTodoItem}
                            markTodoItemFinish={markTodoItemFinish}
                            toggleEditForm={() => toggleEditForm(todo.id)}
                        />
                    ))}
                </TodoList>
                <TodoFormAdd
                    isOpen={isFormAddOpen}
                    toggleForm={toggleAddForm}
                    addTodoItem={addTodoItem}
                />
                <TodoFormEdit
                    isOpen={isFormEditOpen}
                    currentEditTodo={cacheTodo}
                    toggleForm={toggleEditForm}
                    updateTodo={updateTodoItem}
                    updateCacheTodo={updateCacheTodo}
                />
                <button className={styles['todo-add']} onClick={toggleAddForm}>
                    +
                </button>
            </div>
        </div>
    )
}

export default App
