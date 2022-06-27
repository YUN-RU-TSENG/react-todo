import React from 'react'
import styles from './TodoListItem.module.css'
import PropTypes from 'prop-types'
import { ReactComponent as FinishLogo } from '../../images/checked.svg'
import { ReactComponent as TrashLogo } from '../../images/bucket.svg'
import { ReactComponent as UpdateLogo } from '../../images/pencil.svg'

class TodoListItem extends React.Component {
    render() {
        const currentTagColor = function (level) {
            return styles[level]
        }

        const currentFinishState = function (finish) {
            return finish ? styles['finish'] : ''
        }

        return (
            <li
                className={`${styles['todo-list-item-wrapper']} ${currentFinishState(
                    this.props.finish
                )}`}
            >
                <div>
                    <h3 className={styles['todo-list-item-title']}>{this.props.title}</h3>
                    <p className={styles['todo-list-item-text']}> {this.props.expiryDate}</p>
                    <button
                        className={styles['todo-list-item-button']}
                        onClick={() => this.props.deleteTodoItem(this.props.id)}
                    >
                        <TrashLogo/>
                    </button>
                    <button
                        className={styles['todo-list-item-button']}
                        onClick={this.props.toggleEditForm}
                    >
                        <UpdateLogo/>
                    </button>

                    <button
                        className={styles['todo-list-item-button']}
                        onClick={() => this.props.markTodoItemFinish(this.props.id)}
                    >
                        <FinishLogo/>
                    </button>
                    <div
                        className={`${styles['todo-list-item-tag']} ${currentTagColor(
                            this.props.level
                        )}`}
                    >
                        測試
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
