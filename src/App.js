import React from 'react'
import styles from './App.module.css'
import TodoList from './components/TodoList/TodoList'
import TodoListItem from './components/TodoListItem/TodoListItem'
import TodoFormAdd from './components/TodoFormAdd/TodoFormAdd'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
                    finish: false,
                    id: '479057214859073920',
                    level: 'large',
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
        }
        this.addTodoItem = this.addTodoItem.bind(this)
        this.updateTodoItem = this.updateTodoItem.bind(this)
        this.deleteTodoItem = this.deleteTodoItem.bind(this)
        this.toggleForm = this.toggleForm.bind(this)
    }

    addTodoItem(newTodo) {
        this.setState((state) => ({
            todoList: [...state.todoList, newTodo],
        }))
    }

    deleteTodoItem(id) {}

    updateTodoItem() {}

    toggleForm() {
        this.setState((state) => ({ isFormEditOpen: !state.isFormEditOpen }))
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
                                key={todo.id}
                            ></TodoListItem>
                        ))}
                    </TodoList>
                    <TodoFormAdd
                        isOpen={this.state.isFormEditOpen}
                        toggleForm={this.toggleForm}
                        addTodoItem={this.addTodoItem}
                    ></TodoFormAdd>
                    <button className={styles['todo-add']} onClick={this.toggleForm}>
                        +
                    </button>
                </div>
            </div>
        )
    }
}

export default App
