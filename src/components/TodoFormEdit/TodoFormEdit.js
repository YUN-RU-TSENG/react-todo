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
            isFormStartValidate: false,
        }
    }

    get currentTodoErrorStatus() {
        return {
            title: this.props.currentEditTodo.title ? '' : '此項目為必填',
            expiryDate: this.props.currentEditTodo.expiryDate ? '' : '此項目為必填',
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

    // 更新當前編輯的 todo，並且送出時驗證表單內容是否填寫正確
    submitUpdateTodo = (e) => {
        e.preventDefault()

        this.setState({
            isFormStartValidate: true, // 開始驗證後，才會顯次當前表單的值的驗證錯誤內容
        })

        if (Object.values(this.currentTodoErrorStatus).find((item) => item)) return

        this.props.updateTodo()
        this.toggleForm()
    }

    toggleForm = () => {
        this.props.toggleForm()
        this.setState({
            isFormStartValidate: false,
        })
    }

    render() {
        console.log(323, this.props.isOpen)
        return (
            this.props.isOpen && (
                <BaseForm formTitle="Edit Todo">
                    <BaseInput
                        value={this.props.currentEditTodo.title}
                        label="事項"
                        errorMessage={
                            this.state.isFormStartValidate ? this.currentTodoErrorStatus.title : ''
                        }
                        changeValue={(e) => this.props.updateCacheTodo('title', e)}
                    ></BaseInput>
                    <BaseSelect
                        label="層級"
                        options={['medium', 'large', 'small']}
                        optionValue={this.props.currentEditTodo.level}
                        errorMessage={''}
                        changeOption={(e) => this.props.updateCacheTodo('level', e)}
                    ></BaseSelect>
                    <BaseInput
                        value={this.props.currentEditTodo.expiryDate}
                        label="代辦時間"
                        errorMessage={
                            this.state.isFormStartValidate
                                ? this.currentTodoErrorStatus.expiryDate
                                : ''
                        }
                        changeValue={(e) => this.props.updateCacheTodo('expiryDate', e)}
                    ></BaseInput>
                    <BaseButton handleClick={this.toggleForm} type="button">
                        Cancel
                    </BaseButton>
                    <BaseButton type="submit" isGreen={true} handleClick={this.submitUpdateTodo}>
                        OK
                    </BaseButton>
                </BaseForm>
            )
        )
    }
}

TodoFormEdit.propTypes = {
    isOpen: PropTypes.bool,
    toggleForm: PropTypes.func.isRequired,
    currentEditTodo: PropTypes.object,
    updateTodo: PropTypes.func.isRequired,
    updateCacheTodo: PropTypes.func.isRequired,
}

export default TodoFormEdit
