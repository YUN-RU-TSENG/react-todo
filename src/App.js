import React from 'react'
import styles from './App.module.css'
import TodoList from './components/TodoList/TodoList'
import TodoListItem from './components/TodoListItem/TodoListItem'
import TodoFormAdd from './components/TodoFormAdd/TodoFormAdd'
import TodoFormEdit from './components/TodoFormEdit/TodoFormEdit'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFormAddOpen: false,
            isFormEditOpen: false,
            todoList: [
                {
                    title: '代辦事項',
                    finish: false,
                    id: '479057',
                    level: 'medium',
                    expiryDate: new Date().toLocaleDateString(),
                },
            ],
            cacheTodo: {
                title: '',
                finish: false,
                id: '',
                level: '',
                expiryDate: '',
            },
        }
    }

    addTodoItem = (newTodo) => {
        this.setState((state) => ({
            todoList: [...state.todoList, newTodo],
        }))
    }

    deleteTodoItem = (id) => {
        this.setState((state) => {
            const newTodoList = state.todoList.filter((todo) => todo.id !== id)
            return {
                todoList: newTodoList,
            }
        })
    }

    // 更新當前編輯 todo 的資料
    updateTodoItem = () => {
        this.setState((state) => {
            const todoLists = state.todoList.filter((todo) => todo.id !== state.cacheTodo.id)

            return {
                todoList: [...todoLists, state.cacheTodo],
            }
        })
    }

    // 更新當前 todo 完成狀態
    markTodoItemFinish = (id) => {
        this.setState((state) => {
            return {
                todoList: state.todoList.map((todo) =>
                    todo.id !== id
                        ? todo
                        : {
                              ...todo,
                              finish: !todo.finish,
                          }
                ),
            }
        })
    }

    // 更新當前編輯 cache todo 的資料，由於編輯 todo 後可以取消更新，故當前編輯狀態為點擊 todo 的快取版本
    updateCacheTodo = (property, value) => {
        this.setState((state) => ({
            cacheTodo: { ...state.cacheTodo, [property]: value },
        }))
    }

    toggleAddForm = () => {
        this.setState((state) => ({ isFormAddOpen: !state.isFormAddOpen }))
    }

    // 開關點擊當下的 todo 編輯表單
    toggleEditForm = (id) => {
        this.setState((state) => ({ isFormEditOpen: !state.isFormEditOpen }))
        // 依照點擊的 id 來更新編輯表單內呈現的 cache todo
        this.setState((state) => {
            const [newTodoList] = state.todoList.filter((todo) => todo.id === id)

            return {
                cacheTodo: newTodoList ?? {
                    title: '',
                    finish: false,
                    id: '',
                    level: '',
                    expiryDate: '',
                },
            }
        })
    }

    render() {
        return (
            <div className={styles.app}>
                <div className={styles['app-wrapper']}>
                    <h2 className={styles['app-title']}>代辦清單</h2>
                    <TodoList>
                        {this.state.todoList.map((todo) => (
                            <TodoListItem
                                finish={todo.finish}
                                title={todo.title}
                                expiryDate={todo.expiryDate}
                                level={todo.level}
                                id={todo.id}
                                key={todo.id}
                                deleteTodoItem={this.deleteTodoItem}
                                markTodoItemFinish={this.markTodoItemFinish}
                                toggleEditForm={() => this.toggleEditForm(todo.id)}
                            />
                        ))}
                    </TodoList>
                    <TodoFormAdd
                        isOpen={this.state.isFormAddOpen}
                        toggleForm={this.toggleAddForm}
                        addTodoItem={this.addTodoItem}
                    />
                    <TodoFormEdit
                        isOpen={this.state.isFormEditOpen}
                        currentEditTodo={this.state.cacheTodo}
                        toggleForm={this.toggleEditForm}
                        updateTodo={this.updateTodoItem}
                        updateCacheTodo={this.updateCacheTodo}
                    />
                    <button className={styles['todo-add']} onClick={this.toggleAddForm}>
                        +
                    </button>
                </div>
            </div>
        )
    }
}

export default App
