import React from 'react'
// import styles from './TodoFormEdit.module.css'
import BaseButton from '../BaseButton/BaseButton'
import BaseInput from '../BaseInput/BaseInput'
import BaseSelect from '../BaseSelect/BaseSelect'
import BaseForm from '../BaseForm/BaseForm'
import PropTypes from 'prop-types'

class TodoFormEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTodoError: {
                title: '',
                expiryDate: '',
            },
        }
        this.updateEditTodo = this.updateEditTodo.bind(this)
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

    updateEditTodo(e) {
        this.props.updateEditTodo()
        this.props.toggleForm()
        e.preventDefault()
    }

    render() {
        const toggleFormEdit = (
            <BaseForm formTitle="Edit Todo">
                <BaseInput
                    value={this.props.currentEditTodo?.title}
                    label="事項"
                    errorMessage={this.state.currentTodoError.title}
                    changeValue={(e) => this.props.updateEditTodoTitle(e.target.value)}
                ></BaseInput>
                <BaseSelect
                    label="層級"
                    options={['medium', 'large', 'small']}
                    optionValue={this.props.currentEditTodo?.level}
                    errorMessage={''}
                    changeOption={(e) => this.props.updateEditTodoLevel(e.target.value)}
                ></BaseSelect>
                <BaseInput
                    value={this.props.currentEditTodo?.expiryDate}
                    label="代辦時間"
                    errorMessage={this.state.currentTodoError.expiryDate}
                    changeValue={(e) => this.props.updateEditTodoExpiryDate(e.target.value)}
                ></BaseInput>
                <BaseButton handleClick={this.props.toggleForm} type="button">
                    Cancel
                </BaseButton>
                <BaseButton type="submit" isGreen={true} handleClick={this.updateEditTodo}>
                    OK
                </BaseButton>
            </BaseForm>
        )

        return this.props.isOpen ? toggleFormEdit : null
    }
}

TodoFormEdit.propTypes = {
    isOpen: PropTypes.bool,
    toggleForm: PropTypes.func.isRequired,
    currentEditTodo: PropTypes.object,
    updateEditTodo: PropTypes.func.isRequired,
    updateEditTodoTitle: PropTypes.func.isRequired,
    updateEditTodoLevel: PropTypes.func.isRequired,
    updateEditTodoExpiryDate: PropTypes.func.isRequired,
}

export default TodoFormEdit
