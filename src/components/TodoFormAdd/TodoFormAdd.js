import React, { useState } from 'react'
// import styles from './TodoFormAdd.module.css'
import BaseButton from '../BaseButton/BaseButton'
import BaseInput from '../BaseInput/BaseInput'
import BaseSelect from '../BaseSelect/BaseSelect'
import BaseForm from '../BaseForm/BaseForm'
import PropTypes from 'prop-types'
import getRandomNumber from '../../utils/getRenderNumber'

function TodoFormAdd(props) {
    const [currentTodo, setCurrentTodo] = useState({
        title: '',
        finish: false,
        id: null,
        level: 'medium',
        expiryDate: '',
    })
    const [isFormStartValidate, setIsFormStartValidate] = useState(false)

    function currentTodoErrorStatus() {
        return {
            title: currentTodo.title ? '' : '此項目為必填',
            expiryDate: currentTodo.expiryDate ? '' : '此項目為必填',
        }
    }

    // 開關 modal 時鎖定 body 尺寸
    function lockBodyElementSize() {
        if (props.isOpen) return document.body.classList.add('modal-open')
        document.body.classList.remove('modal-open')
    }

    function updatedCurrentTodo(value, property) {
        setCurrentTodo((state) => ({
            ...state,
            [property]: value,
        }))
    }

    function submitAddTodo(e) {
        e.preventDefault()

        setIsFormStartValidate(true)

        if (Object.values(currentTodoErrorStatus()).find((item) => item)) return

        props.addTodoItem({ ...currentTodo, id: getRandomNumber(10000) })

        toggleForm()
    }

    // 關閉表單，並且重新清空 todo、todo 輸入驗證錯誤
    function toggleForm() {
        props.toggleForm()
        setIsFormStartValidate(false)
        setCurrentTodo({
            title: '',
            finish: false,
            id: null,
            level: 'medium',
            expiryDate: '',
        })
    }

    lockBodyElementSize()

    return (
        props.isOpen && (
            <BaseForm formTitle={'Add Todo'}>
                <BaseInput
                    value={currentTodo.title}
                    label="事項"
                    errorMessage={isFormStartValidate ? currentTodoErrorStatus().title : ''}
                    changeValue={(e) => updatedCurrentTodo(e, 'title')}
                ></BaseInput>
                <BaseSelect
                    label="層級"
                    options={['medium', 'large', 'small']}
                    optionValue={currentTodo.level}
                    errorMessage={''}
                    changeOption={(e) => updatedCurrentTodo(e, 'level')}
                ></BaseSelect>
                <BaseInput
                    value={currentTodo.expiryDate}
                    label="代辦時間"
                    errorMessage={isFormStartValidate ? currentTodoErrorStatus().expiryDate : ''}
                    changeValue={(e) => updatedCurrentTodo(e, 'expiryDate')}
                ></BaseInput>
                <BaseButton type="button" handleClick={toggleForm}>
                    Cancel
                </BaseButton>
                <BaseButton type="submit" isGreen={true} handleClick={submitAddTodo}>
                    OK
                </BaseButton>
            </BaseForm>
        )
    )
}

TodoFormAdd.propTypes = {
    isOpen: PropTypes.bool,
    toggleForm: PropTypes.func.isRequired,
    addTodoItem: PropTypes.func.isRequired,
}

export default TodoFormAdd
