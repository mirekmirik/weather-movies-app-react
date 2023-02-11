const USER_URL = 'https://weather-movies-app-default-rtdb.europe-west1.firebasedatabase.app/user.json'


export const getUsers = async () => {
    try {
        const getUsers = await fetch(USER_URL)
        if (!getUsers.ok) {
            throw new Error('Что-то пошло не так...')
        }
        const resultGetUsers = await getUsers.json()

        const users = []
        for (const key in resultGetUsers) {
            users.push({
                id: resultGetUsers[key].id,
                login: resultGetUsers[key].login,
                password: resultGetUsers[key].password,
                pickedJenres: resultGetUsers[key].pickedJenres
            })
        }
        return users
    } catch (err) {
        throw err.message
    }
}


export const postUsers = async (user) => {
    try {
        const response = await fetch('https://weather-movies-app-default-rtdb.europe-west1.firebasedatabase.app/user.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error('Что-то пошло не так...')
        }
        return user
    } catch (err) {
        throw err.message
    }
}


