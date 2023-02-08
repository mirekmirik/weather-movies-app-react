import styles from './Header.module.css'


const Header = () => {
    return (
        <ul className="nav justify-content-end bg-info

        ">
            {/* <li class="nav-item">
                <a class="nav-link active" href="#">Active</a>
            </li> */}
            <li className="nav-item">
                <button type="button" className="btn btn-primary mr-3">Войти</button>
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