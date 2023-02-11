import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import Button from '../UI/Button'

const Header = () => {
    return (
        <ul className={`nav justify-content-end ${styles['nav']}`}>
            {/* <li class="nav-item">
                <a class="nav-link active" href="#">Active</a>
            </li> */}
            <li className="nav-item">
                {/* <Button type="button" className="btn btn-primary mr-3">Войти</Button> */}
                <Link to={'/auth/login'}>
                    <Button type="button" style={{ "marginRight": "50px" }}>Войти</Button>
                </Link>

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