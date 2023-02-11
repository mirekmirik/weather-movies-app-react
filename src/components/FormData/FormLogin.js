import React, { useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../../context/user-context'
import Button from '../../UI/Button'
import styles from './Form.module.css'
import Modal from '../Modal/Modal'
import { getUsers } from '../../api/users'


const FormLogin = (props) => {
    // const ctx = useContext(userContext)


    const [httpError, setHttpError] = useState()
    const inputLogin = useRef()
    const inputPassword = useRef()

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        const login = inputLogin.current.value
        const password = inputPassword.current.value
        try {
            const responseUser = await getUsers()
            const findLogin = responseUser.find((user) => user.login === login && user.password === password)
            if (!findLogin) {
                throw new Error('Вы неправильно ввели данные')
            }
            console.log(findLogin)
            alert('Вы успешно вошли в аккаунт!')
        } catch (err) {
            setHttpError(err.message)
        }
    }


    const onFocusHandler = () => {
        if (httpError) {
            setHttpError('')
        }
    }


    return (
        <Modal>
            {httpError && <p className={`${styles['text-error']} ${styles['centered']}`}>{httpError}</p>}
            <form onSubmit={onSubmitHandler} className={styles['form']}>
                <h3 className='centered'>Вход</h3>
                <div className={styles['form-input__wrapper']}>
                    <label>Введите логин</label>
                    <input type='text' ref={inputLogin} onFocus={onFocusHandler} />
                </div>
                <div className={styles['form-input__wrapper']}>
                    <label>Введите пароль</label>
                    <input type='password' ref={inputPassword} onFocus={onFocusHandler} />
                </div>
                <Link to={'/auth/register'}>Не зарегистрированы? Зарегистрируйтесь в системе</Link>
                <Button type="submit">Войти</Button>
            </form >
        </Modal>
    )
}

export default FormLogin