import React, { useState, useRef, useContext, useEffect } from 'react'

import Modal from '../Modal/Modal'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../../context/user-context'
import Button from '../../UI/Button'
import styles from './Form.module.css'
import getUniqueRandomNumber from '../../helpers/getUniqueRandomNumber'
import { getUsers, postUsers } from '../../api/users/users'
import Dropdown from '../inputDropdown/Dropdown'
import { useAuth } from '../../context/auth'



const takeDataCity = async () => {
    const response = await fetch('https://weather-movies-app-default-rtdb.europe-west1.firebasedatabase.app/citiesUkraine.json');
    const data = await response.json();
    let arrData = [];
    for (const key in data) {
        arrData.push(...data[key]);
    }

    return arrData
};

const FormRegister = (props) => {

    const navigate = useNavigate()
    const auth = useAuth()



    const [httpError, setHttpError] = useState()



    const [loginError, setLoginError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const [seconds, setSeconds] = useState(3)
    const [isFocusCity, setIsFocusCity] = useState(false)

    const [stateCities, setStateCities] = useState([])
    const [fullCities, setFullCities] = useState([])
    const [pickedCity, setPickedCity] = useState('')


    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);

    useEffect(() => {
        if (auth.user) {
            navigate('/profile')
        }
        async function fetchData() {
            const cities = await takeDataCity();
            setStateCities(cities)
            setFullCities(cities.map((item) => {
                return {
                    fullName: `${item.city} (${item.admin_name})`
                }
            }))
        }
        fetchData();
    }, [auth.user, navigate])

    useEffect(() => {
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
                pickedJenres: ctx.user.pickedJenres,
                city: pickedCity
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
        if (!isFocusCity) {
            setPickedCity('')
            setSearchTerm('')
        }
    }

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value)
        setFilteredCities(fullCities.filter((city) => city.fullName.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    const pickCityHandler = (event) => {
        console.log(event.target.textContent.split('(')[0])
        const takeOnlyCity = event.target.textContent.split('(')[0].trim()
        setPickedCity(takeOnlyCity)
    }

    let dropdownCities;

    if (filteredCities.length > 0) {
        dropdownCities = <ul>
            {filteredCities.map((data, idx) => <li key={idx} onMouseDown={pickCityHandler}>{data.fullName}</li>)}
        </ul>
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
                        <label>Придумайте логин (от {validLengthLogin} символов)</label>
                        <input type='text' ref={inputLogin} className={loginError ? styles['invalid'] : ''} onFocus={onFocusHandler} />
                    </div>
                    <div className={styles['form-input__wrapper']}>
                        <label>Придумайте пароль (от {validLengthPassword} символов)</label>
                        <input type='password' ref={inputPassword} className={passwordError ? styles['invalid'] : ''} onFocus={onFocusHandler} />
                    </div>
                    <div className={styles['form-input__wrapper']}>
                        <label>Введите город (English)</label>
                        <input type={'text'} className={styles['input-dropdown-cities']} onFocus={onFocusHandler} onChange={handleSearchTermChange} value={pickedCity ? pickedCity : searchTerm} />
                        {dropdownCities}
                    </div>

                    <Link to={'/auth/login'}>Уже зарегистрированы? Войдите в систему</Link>
                    <Button type="submit" disabled={isFormValid}>Зарегистрироваться</Button>
                </form>
            </Modal>

        </React.Fragment >
    )
}

export default FormRegister