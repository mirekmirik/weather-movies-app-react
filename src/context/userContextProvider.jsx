import { useEffect, useReducer, useState } from 'react'
import UserContext from './user-context'

// const defaultUserState = {
//     user: {},
//     pickedJenres: [],
// }


// const reducerFunc = (prevState, action) => {
//     if(action.type === "ADD_USER") {

//     }

//     return defaultUserState
// }

const UserContextProvider = (props) => {
    const [user, setUser] = useState('')
    const [pickedJenres, setPickedJenres] = useState([])

    useEffect(() => {
        console.log({ user, pickedJenres })

    }, [user, pickedJenres])



    const addUserHandler = (inputObject) => {
        setUser(inputObject)
    }

    const addJenresHandler = (jenre) => {
        setPickedJenres((prevState) => {
            return [...prevState, jenre]
        })
    }

    const userContext = {
        user: user,
        addUserHandler: addUserHandler,
        addJenresHandler: addJenresHandler
    }

    // const [state, dispatchState] = useReducer(reducerFunc, defaultUserState)

    // const addPickedJenresHandler = (jenres) => {
    //     dispatchState({
    //         type: "ADD_JENRE",
    //         jenres: jenres
    //     })
    // }

    // const addUserHandler = (userObject) => {
    //     dispatchState({
    //         type: "ADD_USER",
    //         userObject: userObject
    //     })
    // }


    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider