import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import Button from '../UI/Button'
import { useAuth } from '../context/auth'

const Header = () => {

    const auth = useAuth()

    const logoutHandler = () => {
        auth.logout()
    }

    return (
        <ul className={`nav justify-content-end ${styles['nav']}`} id='ul'>
            {/* <li class="nav-item">
                <a class="nav-link active" href="#">Active</a>
            </li> */}
            <li className="nav-item">
                {/* <Button type="button" className="btn btn-primary mr-3">Войти</Button> */}
                {!auth.user && <Link to={'/auth/login'}>
                    <Button type="button" style={{ "marginRight": "50px" }}>Войти</Button>
                </Link>}
                {auth.user && <Link to={'/'}>
                    <Button onClick={logoutHandler} type="button" style={{ "marginRight": "50px" }}>Quit</Button>
                </Link>}

            </li>
            {/* <li class="nav-item">
                <a class="nav-link" href="#"></a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
            </li> */}
        </ul>
    )
}


export default Header