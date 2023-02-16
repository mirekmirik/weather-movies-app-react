import { useCallback, useEffect, useReducer, useState } from 'react'
import UserContext from './user-context'


const UserContextProvider = (props) => {
    const [user, setUser] = useState({})

    const innerFunction = useCallback(() => {
        console.log('userCtx', user)
    });

    useEffect(() => {
        innerFunction()
    }, [innerFunction])



    const addJenresByWeatherHandler = (jenres) => {
        setUser((prevUser) => {
            return {
                ...prevUser,
                jenres
            };
        });
    }

    const resetValues = () => {
        setUser({})
    }


    const addWeatherHandler = (weather) => {
        setUser((prevUser) => {
            console.log({ ...prevUser })
            return {
                ...prevUser,
                weather: weather
            };
        });
    }

    const addUserHandler = (inputObject) => {
        setUser(inputObject)
    }

    const addJenresHandler = (jenre) => {
        setUser((prevUser) => {
            let newPickedJenres;
            if (Array.isArray(prevUser.pickedJenres)) {
                newPickedJenres = [...prevUser.pickedJenres, jenre];
            } else {
                newPickedJenres = [jenre];
            }
            return { ...prevUser, pickedJenres: newPickedJenres };
        });
    }

    const userContext = {
        user: user,
        addUserHandler: addUserHandler,
        addJenresHandler: addJenresHandler,
        addJenresByWeatherHandler,
        addWeatherHandler,
        resetValues
    }


    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider