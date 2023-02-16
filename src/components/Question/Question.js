import { useContext, useEffect, useState } from "react"
import { Redirect, useHistory, useNavigate } from "react-router-dom";
import Card from "../../UI/Card"
import styles from './Question.module.css'
import QuestionItem from "./QuestionItem"
import clearWeatherImg from '../../assets/img/Clear-weather.jpg'
import cloudsWeatherImg from '../../assets/img/Clouds-weather.jpg'
import drizzleWeatherImg from '../../assets/img/Drizzle-weather.jpg'
import fogWeatherImg from '../../assets/img/Fog-weather.jpg'
import rainWeatherImg from '../../assets/img/Rain-weather.jpg'
import snowWeatherImg from '../../assets/img/Snow-weather.jpg'
import userContext from "../../context/user-context"
import { getWeather } from "../../api/weather/weather";
import uaJson from '../../json-data/ua.json'
import { useAuth } from "../../context/auth";
// use





const QUESTION_DATA = [
    {
        id: 1,
        weather: 'Clear',
        img: clearWeatherImg
    },
    {
        id: 2,
        weather: 'Clouds',
        img: cloudsWeatherImg
    },
    {
        id: 3,
        weather: 'Drizzle',
        img: drizzleWeatherImg
    },
    {
        id: 4,
        weather: 'Fog',
        img: fogWeatherImg
    },
    {
        id: 5,
        weather: 'Rain',
        img: rainWeatherImg
    },
    {
        id: 6,
        weather: 'Snow',
        img: snowWeatherImg
    },
]



const Question = (props) => {
    const navigate = useNavigate()
    const ctx = useContext(userContext)
    const auth = useAuth()

    useEffect(() => {
        if (auth.user) {
            navigate('/profile')
        }
    }, [auth])


    const [questionIdx, setQuestionIdx] = useState(0)

    const takeDataOfJenresHandler = (data) => {
        ctx.addJenresHandler(data)
    }

    const nextSlideHandler = () => {
        setQuestionIdx((prevState) => {
            return prevState += 1
        })
    }


    const questions = QUESTION_DATA.map(({ weather, img, id }, idx, arr) => {
        if (idx == questionIdx) {
            return <QuestionItem
                key={idx}
                id={id}
                weatherName={weather}
                imgSrc={img}
                arrLength={arr.length}
                onNextSlide={nextSlideHandler}
                onTakeDataOfJenres={takeDataOfJenresHandler}
            />
        }
    })

    let content;

    if (questionIdx >= QUESTION_DATA.length) {
        navigate('/auth/register')
    }

    return (
        <div className={styles['centered']}>
            {content ? content : questions}
        </div>
    )
}

export default Question