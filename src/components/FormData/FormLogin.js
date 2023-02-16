import React, { useState, useRef, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../../context/user-context'
import Button from '../../UI/Button'
import styles from './Form.module.css'
import Modal from '../Modal/Modal'
import { getUsers } from '../../api/users/users'
import { useAuth } from '../../context/auth'


const FormLogin = (props) => {

    const navigate = useNavigate()
    const auth = useAuth()

    useEffect(() => {
        if (auth.user) {
            navigate('/profile')
        }
    })


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
            // userCtx.addUserHandler(findLogin)
            console.log('findLogin', findLogin)
            auth.login(findLogin)
            navigate('/profile')
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