import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "./auth"

export const RequireAuth = (props) => {

    const auth = useAuth()
    const navigate = useNavigate()
    useEffect(() => {

        if (!localStorage.getItem('user')) {
            navigate('/auth/login')

        }
    }, [auth.user, navigate])


    return auth.user ? props.children : null

}


