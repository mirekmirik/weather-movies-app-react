import Card from "../UI/Card"
import styles from './Question.module.css'
import QuestionItem from "./QuestionItem"
import clearWeatherImg from '../assets/img/Clear-weather.jpg'
import cloudsWeatherImg from '../assets/img/Clouds-weather.jpg'
import drizzleWeatherImg from '../assets/img/Drizzle-weather.jpg'
import fogWeatherImg from '../assets/img/Fog-weather.jpg'
import rainWeatherImg from '../assets/img/Rain-weather.jpg'
import snowWeatherImg from '../assets/img/Snow-weather.jpg'
import { useState } from "react"





const questionData = [
    {
        weather: 'Clear',
        img: clearWeatherImg
    },
    {
        weather: 'Clouds',
        img: cloudsWeatherImg
    },
    {
        weather: 'Drizzle',
        img: drizzleWeatherImg
    },
    {
        weather: 'Fog',
        img: fogWeatherImg
    },
    {
        weather: 'Rain',
        img: rainWeatherImg
    },
    {
        weather: 'Snow',
        img: snowWeatherImg
    },

]

const Question = (props) => {

    const [question, setQuestion] = useState(questionData)
    const [questionIdx, setQuestionIdx] = useState(0)

    const nextSlideHandler = () => {
        setQuestionIdx((prevState) => {
            return prevState += 1
        })
    }


    const questions = question.map(({ weather, img }, idx) => {
        if (idx == questionIdx) {
            return <QuestionItem key={idx} weatherName={weather} imgSrc={img} onNextSlide={nextSlideHandler} />
        }
    })

    let content;

    if (questionIdx >= question.length) {
        content = <h1>Картинки кончились!</h1>
    }

    return (
        <div className={styles['centered']}>
            {content ? content : questions}
        </div>
    )
}

export default Question