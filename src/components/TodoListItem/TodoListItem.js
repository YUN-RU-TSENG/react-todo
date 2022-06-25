import React from 'react'
import styles from './TodoListItem.module.css'
import { ReactComponent as FinishLogo } from '../../images/checked.svg'
import { ReactComponent as TrashLogo } from '../../images/bucket.svg'
import { ReactComponent as UpdateLogo } from '../../images/pencil.svg'

class TodoListItem extends React.Component {
    render() {
        const currentTagColor = function (level) {
            if (level === 'large') return styles['large']
            if (level === 'medium') return styles['medium']
            if (level === 'small') return styles['small']
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
                    <button className={styles['todo-list-item-button']}>
                        <TrashLogo></TrashLogo>
                    </button>
                    <button className={styles['todo-list-item-button']}>
                        <UpdateLogo></UpdateLogo>
                    </button>
                    <button className={styles['todo-list-item-button']}>
                        <FinishLogo></FinishLogo>
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

export default TodoListItem
