import React from 'react'
import styles from './TodoListItem.module.css'
import PropTypes from 'prop-types'
import { ReactComponent as FinishLogo } from '../../assets/images/checked.svg'
import { ReactComponent as TrashLogo } from '../../assets/images/bucket.svg'
import { ReactComponent as UpdateLogo } from '../../assets/images/pencil.svg'

class TodoListItem extends React.Component {
    get currentFinishState() {
        return this.props.finish ? styles['finish'] : ''
    }

    get currentTagColor() {
        return styles[this.props.level]
    }

    render() {
        return (
            <li className={`${styles['todo-list-item-wrapper']} ${this.currentFinishState}`}>
                <div>
                    <h3 className={styles['todo-list-item-title']}>{this.props.title}</h3>
                    <p className={styles['todo-list-item-text']}> {this.props.expiryDate}</p>
                    <button
                        className={styles['todo-list-item-button']}
                        onClick={() => this.props.deleteTodoItem(this.props.id)}
                    >
                        <TrashLogo />
                    </button>
                    <button
                        className={styles['todo-list-item-button']}
                        onClick={this.props.toggleEditForm}
                    >
                        <UpdateLogo />
                    </button>

                    <button
                        className={styles['todo-list-item-button']}
                        onClick={() => this.props.markTodoItemFinish(this.props.id)}
                    >
                        <FinishLogo />
                    </button>
                    <div className={`${styles['todo-list-item-tag']} ${this.currentTagColor}`}>
                        {this.props.level}
                    </div>
                </div>
            </li>
        )
    }
}

TodoListItem.propTypes = {
    toggleEditForm: PropTypes.func.isRequired,
    markTodoItemFinish: PropTypes.func.isRequired,
    deleteTodoItem: PropTypes.func.isRequired,
    level: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
    finish: PropTypes.bool.isRequired,
}

export default TodoListItem
