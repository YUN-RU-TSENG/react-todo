import React from 'react'
import styles from './BaseSelect.module.css'
import PropTypes from 'prop-types'

function BaseSelect(props) {
    function isShowErrorMessage() {
        return props.errorMessage ? styles['error'] : ''
    }

    return (
        <label className={`${styles['base-select-label']} ${isShowErrorMessage()}`}>
            <p className={styles['base-title']}>{props.label}：</p>
            <input type="checkbox" className={styles['base-select-toggle']} />
            <div className={styles['base-select']}>{props.optionValue}</div>
            <div className={styles['options']}>
                {props.options.map((option, index) => {
                    return (
                        <div
                            className={styles['option']}
                            key={index}
                            onClick={() => props.changeOption(option)}
                        >
                            {option}
                        </div>
                    )
                })}
            </div>
            <p className="error-text">{props.errorMessage}</p>
        </label>
    )
}

BaseSelect.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    optionValue: PropTypes.string,
    errorMessage: PropTypes.string,
    changeOption: PropTypes.func.isRequired,
}

export default BaseSelect
