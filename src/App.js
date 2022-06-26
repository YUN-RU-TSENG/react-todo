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
                    id: '479057234859073920',
                    level: 'medium',
                    expiryDate: '2022-06-06',
                },
                {
                    title: '代辦事項',
                    finish: true,
                    id: '479057234859073923',
                    level: 'small',
                    expiryDate: '2022-06-06',
                },
            ],
            editTodo: {
                title: '',
                finish: false,
                id: '',
                level: '',
                expiryDate: '',
            },
        }
        this.addTodoItem = this.addTodoItem.bind(this)
        this.updateTodoItemFinishState = this.updateTodoItemFinishState.bind(this)
        this.updateTodoItem = this.updateTodoItem.bind(this)
        this.deleteTodoItem = this.deleteTodoItem.bind(this)
        this.toggleAddForm = this.toggleAddForm.bind(this)
        this.toggleEditForm = this.toggleEditForm.bind(this)
        this.updateEditTodoTitle = this.updateEditTodoTitle.bind(this)
        this.updateEditTodoExpiryDate = this.updateEditTodoExpiryDate.bind(this)
        this.updateEditTodoLevel = this.updateEditTodoLevel.bind(this)
    }

    addTodoItem(newTodo) {
        this.setState((state) => ({
            todoList: [...state.todoList, newTodo],
        }))
    }

    deleteTodoItem(id) {
        this.setState((state) => {
            const newTodoList = state.todoList.filter((todo) => todo.id !== id)
            return {
                todoList: newTodoList,
            }
        })
    }

    updateTodoItemFinishState(id) {
        this.setState((state) => {
            const todoLists = state.todoList.filter((todo) => todo.id !== id)
            const [newTodoList] = state.todoList.filter((todo) => todo.id === id)

            return {
                todoList: [...todoLists, { ...newTodoList, finish: !newTodoList.finish }],
            }
        })
    }

    updateTodoItem() {
        this.setState((state) => {
            const todoLists = state.todoList.filter((todo) => todo.id !== state.editTodo.id)

            return {
                todoList: [...todoLists, state.editTodo],
            }
        })
    }

    toggleAddForm() {
        this.setState((state) => ({ isFormAddOpen: !state.isFormAddOpen }))
    }

    toggleEditForm(id) {
        this.setState((state) => {
            const [newTodoList] = state.todoList.filter((todo) => todo.id === id)

            return {
                editTodo: newTodoList,
            }
        })
        this.setState((state) => ({ isFormEditOpen: !state.isFormEditOpen }))
    }

    updateEditTodoTitle(value) {
        this.setState((state) => ({
            editTodo: { ...state.editTodo, title: value },
        }))
    }

    updateEditTodoLevel(value) {
        this.setState((state) => ({
            editTodo: { ...state.editTodo, level: value },
        }))
    }

    updateEditTodoExpiryDate(value) {
        this.setState((state) => ({
            editTodo: { ...state.editTodo, expiryDate: value },
        }))
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
                                updateTodoItem={this.updateTodoItemFinishState}
                                toggleEditForm={() => this.toggleEditForm(todo.id)}
                            ></TodoListItem>
                        ))}
                    </TodoList>
                    <TodoFormAdd
                        isOpen={this.state.isFormAddOpen}
                        toggleForm={this.toggleAddForm}
                        addTodoItem={this.addTodoItem}
                    ></TodoFormAdd>
                    <TodoFormEdit
                        isOpen={this.state.isFormEditOpen}
                        toggleForm={this.toggleEditForm}
                        addTodoItem={this.addTodoItem}
                        currentEditTodo={this.state.editTodo}
                        updateEditTodo={this.updateTodoItem}
                        updateEditTodoTitle={this.updateEditTodoTitle}
                        updateEditTodoLevel={this.updateEditTodoLevel}
                        updateEditTodoExpiryDate={this.updateEditTodoExpiryDate}
                    ></TodoFormEdit>
                    <button className={styles['todo-add']} onClick={this.toggleAddForm}>
                        +
                    </button>
                </div>
            </div>
        )
    }
}

export default App
