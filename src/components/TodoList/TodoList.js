import React from 'react'
import styles from './TodoList.module.css'

class TodoList extends React.Component {
    render() {
        return <ul className={styles['todo-list']}>{this.props.children}</ul>
    }
}

export default TodoList
