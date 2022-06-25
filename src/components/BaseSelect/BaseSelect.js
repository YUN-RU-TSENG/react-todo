import React from 'react'
import styles from './BaseSelect.module.css'
import PropTypes from 'prop-types'

class BaseSelect extends React.Component {
    constructor(props) {
        super(props)
        this.changeOption = this.props.changeOption.bind(this)
    }

    render() {
        const isShowErrorMessage = function (errorMessage) {
            return errorMessage ? 'error' : ''
        }

        return (
            <label
                htmlFor="select-input"
                className={`${styles['base-select-label']} ${isShowErrorMessage(
                    this.props.errorMessage
                )}`}
            >
                <p className={styles['base-title']}>{this.props.label}：</p>
                <input id="select-input" type="checkbox" className={styles['base-select-toggle']} />
                <div className={styles['base-select']}>{this.props.option}</div>
                <div className={styles['options']} onClick={this.changeOption}>
                    {this.props.options.map((option, index) => {
                        return (
                            <div className={styles['option']} key={index}>
                                {option.name}
                            </div>
                        )
                    })}
                </div>
                <p className="error-text">{this.props.errorMessage}</p>
            </label>
        )
    }
}

BaseSelect.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    optionValue: PropTypes.string,
    errorMessage: PropTypes.string,
    changeOption: PropTypes.func.isRequired,
}

export default BaseSelect
