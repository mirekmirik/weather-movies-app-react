import { useCallback, useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getWeatherByCity } from "../../api/weather/weather"
import userContext from "../../context/user-context"
import { useAuth } from "../../context/auth"
import { getMoviesByGenreId, getMoviesGenresList } from "../../api/movies/movies"
import randomInteger from "../../helpers/getRadomInteger"

export const Profile = () => {
    const [weather, setWeather] = useState('')
    const [genresByWeather, setGenresByWeather] = useState([])

    const auth = useAuth()
    const userCtx = useContext(userContext)


    useEffect(() => {
        const fetchData = async () => {
            const weatherApi = await getWeatherByCity(auth.user.city)
            setWeather(weatherApi.weather[0].main)

            if (auth.user.pickedJenres) {
                const jenres = auth.user.pickedJenres.find((data) => data[weatherApi.weather[0].main])
                setGenresByWeather(jenres[weatherApi.weather[0].main])
            }
        }
        fetchData()
    }, [auth.user.city, auth.user.pickedJenres])


    useEffect(() => {
        if (weather && auth.user.pickedJenres) {
            userCtx.addUserHandler({ ...auth.user, genresByWeather, weather })
        }
    }, [genresByWeather, weather])

    useEffect(() => {
        if (genresByWeather && weather) {
            const fetchData = async () => {
                const getGenres = await getMoviesGenresList()
                const genres = getGenres.genres.filter((genre) => genresByWeather.includes(genre.name.toLowerCase()))
                // let randomNumber = randomInteger(1, 250)
                const genresIds = genres.map((data) => data.id)
                const getMovies = await getMoviesByGenreId(1, genresIds.join(','))
                console.log(getMovies)
            }
            fetchData()
        }
    }, [genresByWeather, weather])




    return (
        <div></div>
        // <div>
        //     <p>hi</p>
        //     <h1>Welcome {auth.user.login}</h1>
        //     <p>IN your City : {auth.user.city}</p>
        //     <p>Weather: {weather}</p>
        //     {genresByWeather.length > 0 && <p>You love this films under this weather: {genresByWeather.join(', ')}</p>}
        // </div>
    )
}










// useEffect(() => {
//     const addToContext = () => {
//         // userCtx.addUserHandler(auth.user)
//         // userCtx.addJenresByWeatherHandler(weather)
//         // userCtx.addJenresByWeatherHandler(jenresByWeather)
//     }
//     addToContext()
// }, [])