import React from 'react'
import styles from './BaseButton.module.css'
import PropTypes from 'prop-types'

class BaseButton extends React.Component {
    get isGreen() {
        return this.props.isGreen ? styles['green'] : ''
    }

    render() {
        return (
            <button
                className={`${styles['base-button']} ${this.isGreen}`}
                type={this.props.type}
                onClick={this.props.handleClick}
            >
                {this.props.children}
            </button>
        )
    }
}

BaseButton.propTypes = {
    isGreen: PropTypes.bool,
    type: PropTypes.string,
    children: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
}

export default BaseButton
