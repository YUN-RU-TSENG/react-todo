import React, { useState } from 'react'
import styles from './App.module.css'
import TodoList from './components/TodoList/TodoList'
import TodoListItem from './components/TodoListItem/TodoListItem'
import TodoFormAdd from './components/TodoFormAdd/TodoFormAdd'
import TodoFormEdit from './components/TodoFormEdit/TodoFormEdit'

function App() {
    const [isFormAddOpen, setIsFormAddOpen] = useState(false)
    const [isFormEditOpen, setIsFormEditOpen] = useState(false)
    const [todoList, setTodoList] = useState([
        {
            title: '代辦事項',
            finish: false,
            id: '479057',
            level: 'medium',
            expiryDate: new Date().toLocaleDateString(),
        },
    ])
    const [cacheTodo, setCacheTodo] = useState()

    function addTodoItem(newTodo) {
        setTodoList((state) => [...state, newTodo])
    }

    function deleteTodoItem(id) {
        setTodoList((state) => {
            const newTodoList = state.filter((todo) => todo.id !== id)
            return newTodoList
        })
    }

    // 更新當前編輯 todo 的資料
    function updateTodoItem() {
        setTodoList((state) => {
            const todoLists = state.filter((todo) => todo.id !== cacheTodo.id)

            return [...todoLists, cacheTodo]
        })
    }

    // 更新當前 todo 完成狀態
    function markTodoItemFinish(id) {
        setTodoList((state) => {
            return state.map((todo) =>
                todo.id !== id
                    ? todo
                    : {
                          ...todo,
                          finish: !todo.finish,
                      }
            )
        })
    }

    // 更新當前編輯 cache todo 的資料，由於編輯 todo 後可以取消更新，故當前編輯狀態為點擊 todo 的快取版本
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
            const [newTodoList] = todoList.filter((todo) => todo.id === id)

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
                    {todoList.map((todo) => (
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
