import React from 'react'
import styles from './BaseButton.module.css'
import PropTypes from 'prop-types'

function BaseButton(props) {
    const isGreen = () => {
        return props.isGreen ? styles['green'] : ''
    }

    return (
        <button
            className={`${styles['base-button']} ${isGreen()}`}
            type={props.type}
            onClick={props.handleClick}
        >
            {props.children}
        </button>
    )
}

BaseButton.propTypes = {
    isGreen: PropTypes.bool,
    type: PropTypes.string,
    children: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
}

export default BaseButton
