import React from 'react'
import styles from './BaseForm.module.css'
import PropTypes from 'prop-types'

function BaseForm(props) {
    return (
        <div className={styles['base-form-wrapper']}>
            <section className={styles['base-form']}>
                <h3 className={styles['base-form-title']}>{props.formTitle}</h3>
                <form onSubmit={function () {}}>{props.children}</form>
            </section>
        </div>
    )
}

BaseForm.propTypes = {
    formTitle: PropTypes.string.isRequired,
    // children: PropTypes.elementType.isRequired,
}

export default BaseForm
