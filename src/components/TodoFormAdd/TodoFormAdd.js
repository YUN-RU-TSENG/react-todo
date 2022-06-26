import React from 'react'
// import styles from './TodoFormAdd.module.css'
import BaseButton from '../BaseButton/BaseButton'
import BaseInput from '../BaseInput/BaseInput'
import BaseSelect from '../BaseSelect/BaseSelect'
import BaseForm from '../BaseForm/BaseForm'
import PropTypes from 'prop-types'
import getRandomNumber from '../../utils/getRenderNumber'

class TodoFormAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTodo: {
                title: '',
                finish: false,
                id: null,
                level: 'medium',
                expiryDate: '',
            },
            currentTodoError: {
                title: '',
                expiryDate: '',
            },
        }
        this.submitAddTodo = this.submitAddTodo.bind(this)
        this.updatedCurrentTodoTitle = this.updatedCurrentTodoTitle.bind(this)
        this.updatedCurrentTodoExpiryDate = this.updatedCurrentTodoExpiryDate.bind(this)
        this.updatedCurrentTodoLevel = this.updatedCurrentTodoLevel.bind(this)
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

    updatedCurrentTodoTitle(e) {
        this.setState((state) => ({
            currentTodo: {
                ...state.currentTodo,
                title: e.target.value,
            },
        }))
    }

    updatedCurrentTodoExpiryDate(e) {
        this.setState((state) => ({
            currentTodo: {
                ...state.currentTodo,
                expiryDate: e.target.value,
            },
        }))
    }

    updatedCurrentTodoLevel(value) {
        this.setState((state) => ({
            currentTodo: {
                ...state.currentTodo,
                level: value,
            },
        }))
    }

    submitAddTodo(event) {
        event.preventDefault()

        this.setState({
            currentTodoError: { expiryDate: null, title: null },
        })

        if (!this.state.currentTodo.title) {
            this.setState((state) => ({
                currentTodoError: {
                    ...state.currentTodoError,
                    title: '此項目為必填',
                },
            }))
            return
        }

        if (!this.state.currentTodo.expiryDate) {
            this.setState((state) => ({
                currentTodoError: {
                    ...state.currentTodoError,
                    expiryDate: '此項目為必填',
                },
            }))
            return
        }

        this.setState((state) => ({
            currentTodo: {
                ...state.currentTodo,
                id: getRandomNumber(10000),
            },
        }))

        this.props.addTodoItem(this.state.currentTodo)
        this.props.toggleForm()

        console.log('submit')
    }

    render() {
        const toggleFormEdit = (
            <BaseForm formTitle={'Add Todo'}>
                <BaseInput
                    value={this.state.currentTodo.title}
                    label="事項"
                    errorMessage={this.state.currentTodoError.title}
                    changeValue={this.updatedCurrentTodoTitle}
                ></BaseInput>
                <BaseSelect
                    label="層級"
                    options={['medium', 'large', 'small']}
                    optionValue={this.state.currentTodo.level}
                    errorMessage={''}
                    changeOption={this.updatedCurrentTodoLevel}
                ></BaseSelect>
                <BaseInput
                    value={this.state.currentTodo.expiryDate}
                    label="代辦時間"
                    errorMessage={this.state.currentTodoError.expiryDate}
                    changeValue={this.updatedCurrentTodoExpiryDate}
                ></BaseInput>
                <BaseButton type="button" handleClick={this.props.toggleForm}>
                    Cancel
                </BaseButton>
                <BaseButton type="submit" isGreen={true} handleClick={this.submitAddTodo}>
                    OK
                </BaseButton>
            </BaseForm>
        )

        return this.props.isOpen ? toggleFormEdit : null
    }
}

TodoFormAdd.propTypes = {
    isOpen: PropTypes.bool,
    toggleForm: PropTypes.func.isRequired,
    addTodoItem: PropTypes.func.isRequired,
}

export default TodoFormAdd
