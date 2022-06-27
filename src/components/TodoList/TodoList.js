import React from 'react'
import styles from './TodoList.module.css'

function TodoList(props) {
    return <ul className={styles['todo-list']}>{props.children}</ul>
}

export default TodoList
