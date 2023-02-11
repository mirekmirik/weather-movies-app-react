import React, { useState, useRef, useContext } from 'react'
import userContext from '../../context/user-context'
import Button from '../../UI/Button'
import styles from './Form.module.css'

const Form = (props) => {
    const ctx = useContext(userContext)

    const inputLogin = useRef()
    const inputPassword = useRef()

    const onSubmitHandler = (event) => {
        event.preventDefault()
        const login = inputLogin.current.value
        const password = inputPassword.current.value
        console.log({ login, password })
        ctx.addUserHandler({ login, password })
    }
    let content = props.labels.map((label) => {
        return (
            <React.Fragment>
                <label>{label}</label>
                <input type='text' />
            </React.Fragment>

        )
    })

    return (
        <form onSubmit={onSubmitHandler} className={styles['form']}>
            {content}
            {/* <label>Введите логин</label>
            <input type='text' ref={inputLogin} />
            <label>Введите пароль</label>
            <input type='text' ref={inputPassword} />
            <label>Введите имя</label> */}
            {/* <input type='text' ref={inputName} /> */}

            <Button type="submit">Подтвердить</Button>
        </form>
    )
}

export default Form