import React from 'react'
import styles from './BaseSelect.module.css'
import PropTypes from 'prop-types'

class BaseSelect extends React.Component {
    constructor(props) {
        super(props)
        this.changeOption = this.props.changeOption.bind(this)
    }

    get isShowErrorMessage() {
        return this.props.errorMessage ? styles['error'] : ''
    }

    render() {
        return (
            <label className={`${styles['base-select-label']} ${this.isShowErrorMessage}`}>
                <p className={styles['base-title']}>{this.props.label}：</p>
                <input type="checkbox" className={styles['base-select-toggle']} />
                <div className={styles['base-select']}>{this.props.optionValue}</div>
                <div className={styles['options']}>
                    {this.props.options.map((option, index) => {
                        return (
                            <div
                                className={styles['option']}
                                key={index}
                                onClick={() => this.props.changeOption(option)}
                            >
                                {option}
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
