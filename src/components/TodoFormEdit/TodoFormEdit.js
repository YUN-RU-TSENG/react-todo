import React, { useState } from 'react'
// import styles from './TodoFormEdit.module.css'
import BaseButton from '../BaseButton/BaseButton'
import BaseInput from '../BaseInput/BaseInput'
import BaseSelect from '../BaseSelect/BaseSelect'
import BaseForm from '../BaseForm/BaseForm'
import PropTypes from 'prop-types'

function TodoFormEdit(props) {
    const [isFormStartValidate, setIsFormStartValidate] = useState(false)

    function currentTodoErrorStatus() {
        return {
            title: props.currentEditTodo.title ? '' : '此項目為必填',
            expiryDate: props.currentEditTodo.expiryDate ? '' : '此項目為必填',
        }
    }

    // 開關 modal 時鎖定 body 尺寸
    function lockBodyElementSize() {
        if (props.isOpen) return document.body.classList.add('modal-open')
        document.body.classList.remove('modal-open')
    }

    // 更新當前編輯的 todo，並且送出時驗證表單內容是否填寫正確
    function submitUpdateTodo(e) {
        e.preventDefault()

        setIsFormStartValidate(true) // 開始驗證後，才會顯次當前表單的值的驗證錯誤內容

        if (Object.values(currentTodoErrorStatus()).find((item) => item)) return

        props.updateTodo()
        toggleForm()
    }

    function toggleForm() {
        props.toggleForm()
        setIsFormStartValidate(false)
    }

    lockBodyElementSize()

    return (
        props.isOpen && (
            <BaseForm formTitle="Edit Todo">
                <BaseInput
                    value={props.currentEditTodo.title}
                    label="事項"
                    errorMessage={isFormStartValidate ? currentTodoErrorStatus().title : ''}
                    changeValue={(e) => props.updateCacheTodo('title', e)}
                ></BaseInput>
                <BaseSelect
                    label="層級"
                    options={['medium', 'large', 'small']}
                    optionValue={props.currentEditTodo.level}
                    errorMessage={''}
                    changeOption={(e) => props.updateCacheTodo('level', e)}
                ></BaseSelect>
                <BaseInput
                    value={props.currentEditTodo.expiryDate}
                    label="代辦時間"
                    errorMessage={isFormStartValidate ? currentTodoErrorStatus().expiryDate : ''}
                    changeValue={(e) => props.updateCacheTodo('expiryDate', e)}
                ></BaseInput>
                <BaseButton handleClick={toggleForm} type="button">
                    Cancel
                </BaseButton>
                <BaseButton type="submit" isGreen={true} handleClick={submitUpdateTodo}>
                    OK
                </BaseButton>
            </BaseForm>
        )
    )
}

TodoFormEdit.propTypes = {
    isOpen: PropTypes.bool,
    toggleForm: PropTypes.func.isRequired,
    currentEditTodo: PropTypes.object,
    updateTodo: PropTypes.func.isRequired,
    updateCacheTodo: PropTypes.func.isRequired,
}

export default TodoFormEdit
