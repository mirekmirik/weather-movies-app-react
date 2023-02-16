// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// const API_KEY = '74ed9167ce33381a87338ec2eecbf169'

// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

export const getWeatherByLatLng = async (lat = 33.44, lon = -94.04, exclude = `hourly,daily`, API_KEY = '74ed9167ce33381a87338ec2eecbf169') => {

    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}`)
    const data = await response.json()
    return data
}


export const getWeatherByCity = async (city, API_KEY = '74ed9167ce33381a87338ec2eecbf169') => {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    const data = await response.json()
    return data
}

// https://api.openweathermap.org/data/2.5/weather?q=kamianske&appid=74ed9167ce33381a87338ec2eecbf169
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}