import React from 'react'
import styles from './BaseInput.module.css'
import PropTypes from 'prop-types'

function BaseInput(props) {
    const isShowErrorMessage = () => {
        return props.errorMessage ? styles['error'] : ''
    }

    return (
        <label className={`${styles['base-input-label']} ${isShowErrorMessage()}`}>
            <p className={styles['base-title']}>{props.label}：</p>
            <input
                type="text"
                className={styles['base-input']}
                value={props.value}
                onInput={(e) => props.changeValue(e.target.value)}
            />
            <p className={styles['error-text']}>{props.errorMessage}</p>
        </label>
    )
}

BaseInput.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    changeValue: PropTypes.func.isRequired,
}

export default BaseInput
