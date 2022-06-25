import React from 'react'
import styles from './BaseButton.module.css'
import PropTypes from 'prop-types'

class BaseButton extends React.Component {
    render() {
        const isGreen = function (isGreen) {
            return isGreen ? styles['green'] : ''
        }

        return (
            <button
                className={`${styles['base-button']} ${isGreen(this.props.isGreen)}`}
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
    handleClick: PropTypes.func.isRequired,
}

export default BaseButton
