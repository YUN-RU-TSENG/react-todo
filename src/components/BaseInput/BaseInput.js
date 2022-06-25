import React from 'react'
import styles from './BaseInput.module.css'
import PropTypes from 'prop-types'

class BaseInput extends React.Component {
    render() {
        const isShowErrorMessage = function (errorMessage) {
            return errorMessage ? 'error' : ''
        }

        const randomNumber = function (N) {
            return Math.floor(Math.random() * N)
        }

        return (
            <label
                htmlFor={'input' + randomNumber(1000)}
                className={`${styles['base-input-label error']} ${isShowErrorMessage(
                    this.props.errorMessage
                )}`}
            >
                <p className={styles['base-title']}>{this.props.label}：</p>
                <input id="input" type="text" className={styles['base-input']} />
                <p className={styles['error-text']}>{this.props.errorMessage}</p>
            </label>
        )
    }
}

BaseInput.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    changeValue: PropTypes.func.isRequired,
}

export default BaseInput
