import React, { useState, useRef, useContext, useEffect } from 'react'
import Modal from '../Modal/Modal'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../../context/user-context'
import Button from '../../UI/Button'
import styles from './Form.module.css'
import getUniqueRandomNumber from '../../helpers/getUniqueRandomNumber'
import { getUsers, postUsers } from '../../api/users'

const FormRegister = (props) => {

    const navigate = useNavigate()

    const [httpError, setHttpError] = useState()

    const [loginError, setLoginError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const [seconds, setSeconds] = useState(3)


    useEffect(() => {
        console.log(seconds)
        if (isFormValid) {
            let interval = setInterval(() => {
                setSeconds((prevState) => prevState -= 1)
                if (seconds === 0) {
                    clearInterval(interval)
                    navigate('/auth/login')
                }
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [isFormValid, seconds, navigate, httpError])


    const ctx = useContext(userContext)


    const inputLogin = useRef()
    const inputPassword = useRef()
    const validLengthLogin = 4;
    const validLengthPassword = 8;


    const onSubmitHandler = async (event) => {
        event.preventDefault()
        const login = inputLogin.current.value
        const password = inputPassword.current.value
        if (login.length < validLengthLogin) {
            setLoginError(true)
            return;
        }
        if (password.length < validLengthPassword) {
            setPasswordError(true)
            return;
        }

        // ctx.addUserHandler({ login, password })

        try {
            const responseUsers = await getUsers()
            let isSameLogin = responseUsers.some((user) => user.login === login)
            if (isSameLogin) {
                throw new Error('Такой логин уже существует!')
            }

            const uniqueRandomId = getUniqueRandomNumber(responseUsers.map(data => data.id))

            const requestUsers = await postUsers({
                id: uniqueRandomId,
                login,
                password,
                pickedJenres: ctx.pickedJenres
            })
            console.log(requestUsers)
            setIsFormValid(true)

        } catch (err) {
            setHttpError(err.message)
        }

    }


    const onFocusHandler = () => {
        if (loginError) {
            setLoginError(false)
        }
        if (passwordError) {
            setPasswordError(false)
        }
        if (httpError) {
            setHttpError('')
        }
    }

    const error = loginError ? <p className={styles['text-error']}>Логин не подходит под условия! Логин должен содержать как минимум {validLengthLogin} символа.</p> : passwordError ? <p className={styles['text-error']}>Пароль не подходит под условия! Пароль должен содержать как минимум {validLengthPassword} символа.</p> : ''
    const errorHttp = httpError && <p className={styles['text-error']}>{httpError}</p>
    return (
        <React.Fragment>

            {isFormValid && <Modal style={{ "backgroundColor": "green" }}>Успешно! Вы перейдете на страничку логина автоматически через {seconds} секунды...</Modal>}
            <Modal>
                <form onSubmit={onSubmitHandler} className={styles['form']}>
                    {error}
                    {errorHttp}
                    <h3 className='centered'>Регистрация</h3>
                    <div className={styles['form-input__wrapper']}>
                        <label>Придумайте логин (от 4 символов)</label>
                        <input type='text' ref={inputLogin} className={loginError ? styles['invalid'] : ''} onFocus={onFocusHandler} />
                    </div>
                    <div className={styles['form-input__wrapper']}>
                        <label>Придумайте пароль (от 8 символов)</label>
                        <input type='password' ref={inputPassword} className={passwordError ? styles['invalid'] : ''} onFocus={onFocusHandler} />
                    </div>
                    <Link to={'/auth/login'}>Уже зарегистрированы? Войдите в систему</Link>
                    <Button type="submit" disabled={isFormValid}>Зарегистрироваться</Button>
                </form>
            </Modal>

        </React.Fragment >
    )
}

export default FormRegister