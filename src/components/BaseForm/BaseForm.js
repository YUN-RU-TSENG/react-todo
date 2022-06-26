import React from 'react'
import styles from './BaseForm.module.css'
import PropTypes from 'prop-types'

class BaseForm extends React.Component {
    render() {
        return (
            <section className={styles['base-form']}>
                <h3 className={styles['base-form-title']}>{this.props.formTitle}</h3>
                <form onSubmit={function () {}}>{this.props.children}</form>
            </section>
        )
    }
}

BaseForm.propTypes = {
    formTitle: PropTypes.string.isRequired,
    // children: PropTypes.elementType.isRequired,
}

export default BaseForm
