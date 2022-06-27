import React from 'react'
import styles from './BaseInput.module.css'
import PropTypes from 'prop-types'

class BaseInput extends React.Component {
    get isShowErrorMessage() {
        return this.props.errorMessage ? styles['error'] : ''
    }

    render() {
        return (
            <label className={`${styles['base-input-label']} ${this.isShowErrorMessage}`}>
                <p className={styles['base-title']}>{this.props.label}：</p>
                <input
                    type="text"
                    className={styles['base-input']}
                    value={this.props.value}
                    onInput={(e) => this.props.changeValue(e.target.value)}
                />
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
