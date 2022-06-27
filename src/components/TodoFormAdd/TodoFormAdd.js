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
            isFormStartValidate: false,
        }
    }

    get currentTodoErrorStatus() {
        return {
            title: this.state.currentTodo.title ? '' : '此項目為必填',
            expiryDate: this.state.currentTodo.expiryDate ? '' : '此項目為必填',
        }
    }

    componentDidMount() {
        if (this.props.isOpen) {
            return document.body.classList.add('modal-open')
        }
        document.body.classList.remove('modal-open')
    }

    componentDidUpdate() {
        if (this.props.isOpen) {
            return document.body.classList.add('modal-open')
        }
        document.body.classList.remove('modal-open')
    }

    componentWillUnmount() {
        document.body.classList.remove('modal-open')
    }

    updatedCurrentTodo = (value, property) => {
        this.setState((state) => ({
            currentTodo: {
                ...state.currentTodo,
                [property]: value,
            },
        }))
    }

    submitAddTodo = (e) => {
        e.preventDefault()

        this.setState(() => ({
            isFormStartValidate: true,
        }))

        if (Object.values(this.currentTodoErrorStatus).find((item) => item)) return

        this.props.addTodoItem({ ...this.state.currentTodo, id: getRandomNumber(10000) })

        this.toggleForm()
    }

    // 關閉表單，並且重新清空 todo、todo 輸入驗證錯誤
    toggleForm = () => {
        this.props.toggleForm()
        this.setState({
            isFormStartValidate: false,
            currentTodo: {
                title: '',
                finish: false,
                id: null,
                level: 'medium',
                expiryDate: '',
            },
        })
    }

    render() {
        return (
            this.props.isOpen && (
                <BaseForm formTitle={'Add Todo'}>
                    <BaseInput
                        value={this.state.currentTodo.title}
                        label="事項"
                        errorMessage={
                            this.state.isFormStartValidate ? this.currentTodoErrorStatus.title : ''
                        }
                        changeValue={(e) => this.updatedCurrentTodo(e, 'title')}
                    ></BaseInput>
                    <BaseSelect
                        label="層級"
                        options={['medium', 'large', 'small']}
                        optionValue={this.state.currentTodo.level}
                        errorMessage={''}
                        changeOption={(e) => this.updatedCurrentTodo(e, 'level')}
                    ></BaseSelect>
                    <BaseInput
                        value={this.state.currentTodo.expiryDate}
                        label="代辦時間"
                        errorMessage={
                            this.state.isFormStartValidate
                                ? this.currentTodoErrorStatus.expiryDate
                                : ''
                        }
                        changeValue={(e) => this.updatedCurrentTodo(e, 'expiryDate')}
                    ></BaseInput>
                    <BaseButton type="button" handleClick={this.toggleForm}>
                        Cancel
                    </BaseButton>
                    <BaseButton type="submit" isGreen={true} handleClick={this.submitAddTodo}>
                        OK
                    </BaseButton>
                </BaseForm>
            )
        )
    }
}

TodoFormAdd.propTypes = {
    isOpen: PropTypes.bool,
    toggleForm: PropTypes.func.isRequired,
    addTodoItem: PropTypes.func.isRequired,
}

export default TodoFormAdd
