import React, { useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../../context/user-context'
import Button from '../../UI/Button'
import styles from './Form.module.css'
import Modal from '../Modal/Modal'


const FormLogin = (props) => {
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

    return (
        <Modal>
            <form onSubmit={onSubmitHandler} className={styles['form']}>
                <h3 className='centered'>Вход</h3>
                <div className={styles['form-input__wrapper']}>
                    <label>Введите логин</label>
                    <input type='text' ref={inputLogin} />
                </div>
                <div className={styles['form-input__wrapper']}>
                    <label>Введите пароль</label>
                    <input type='text' ref={inputPassword} />
                </div>
                <Link to={'/auth/register'}>Не зарегистрированы? Зарегистрируйтесь в системе</Link>

                <Button type="submit">Войти</Button>
            </form >
        </Modal>
    )
}

export default FormLogin