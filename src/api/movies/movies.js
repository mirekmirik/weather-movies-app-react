const API_KEY = 'https://api.themoviedb.org/3/discover/movie?api_key=a4f0ea1cc807a86b3fdda7945c5c3ebb&with_genres=28'

export const getMoviesByGenreId = async (page = '1', genreId) => {
    try {
        const getMovies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=a4f0ea1cc807a86b3fdda7945c5c3ebb&with_genres=${genreId}&page=${page}`)
        if (!getMovies.ok) {
            throw new Error('Что-то пошло не так...')
        }
        const data = await getMovies.json()
        return data
    } catch (err) {
        throw err.message
    }
}

export const getMoviesGenresList = async () => {
    try {
        const getMovies = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=a4f0ea1cc807a86b3fdda7945c5c3ebb')
        if (!getMovies.ok) {
            throw new Error('Что-то пошло не так...')
        }
        const data = await getMovies.json()
        return data
    } catch (err) {
        throw err.message
    }
}