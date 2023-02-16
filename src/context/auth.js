import { useState, createContext, Children, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import userContext from "./user-context";

const AuthContext = createContext(null)

export const AuthProvider = (props) => {

    const [user, setUser] = useState()
    const userCtx = useContext(userContext)

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        // console.log('stored', JSON.parse(storedUser))
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const login = (user) => {
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
    }

    const logout = () => {
        setUser(null)
        userCtx.resetValues()
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}