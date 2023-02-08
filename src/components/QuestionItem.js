import React, { useState } from 'react'



const QuestionItem = (props) => {

    // const nextQuestion = () => {
    //     onSetQuestionIdx()
    // }




    return (
        <div>
            <h2>Weather name is: {props.weatherName}</h2>
            <img src={props.imgSrc} alt={props.weatherName} width="300" height={300} />
            <button type='submit' onClick={props.onNextSlide}>Next</button>
        </div>
    )


}

export default QuestionItem