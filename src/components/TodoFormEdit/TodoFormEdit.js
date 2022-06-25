import React from 'react'
import styles from './TodoFormEdit.module.css'
import BaseButton from '../BaseButton/BaseButton'
import BaseInput from '../BaseInput/BaseInput'
import BaseSelect from '../BaseSelect/BaseSelect'
import PropTypes from 'prop-types'

class TodoFormEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTodo: {
                title: '代辦事項',
                finish: false,
                id: '479057234859073920',
                level: 'medium',
                expiryDate: '2022-06-06',
            },
        }
    }

    componentDidMount() {
        if (this.props.isOpen) {
            document.body.classList.add('modal-open')
        } else document.body.classList.remove('modal-open')
    }

    componentDidUpdate() {
        if (this.props.isOpen) {
            document.body.classList.add('modal-open')
        } else document.body.classList.remove('modal-open')
    }

    componentWillUnmount() {
        document.body.classList.remove('modal-open')
    }

    render() {
        const toggleFormEdit = (
            <section className={styles['todo-edit']}>
                <h3 className={'todo-edit-title'}>ADD TODO</h3>
                <form onSubmit={function () {}}>
                    <BaseInput
                        value={this.state.title}
                        label="事項"
                        errorMessage={''}
                        changeValue={function () {}}
                    ></BaseInput>
                    <BaseSelect
                        label="層級"
                        options={['medium', 'large', 'small']}
                        option={this.state.level}
                        errorMessage={''}
                        changeOption={function () {}}
                    ></BaseSelect>
                    <BaseInput
                        value={this.state.title}
                        label="代辦時間"
                        errorMessage={''}
                        changeValue={function () {}}
                    ></BaseInput>
                    <BaseButton handleClick={this.props.toggleForm} type="button">
                        Cancel
                    </BaseButton>
                    <BaseButton type="submit" isGreen={true}>
                        OK
                    </BaseButton>
                </form>
            </section>
        )

        return this.props.isOpen ? toggleFormEdit : null
    }
}

TodoFormEdit.propTypes = {
    isOpen: PropTypes.bool,
    toggleForm: PropTypes.func.isRequired,
}

export default TodoFormEdit
