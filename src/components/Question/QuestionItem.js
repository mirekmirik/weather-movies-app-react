import React, { useEffect, useRef, useState } from 'react'
import styles from './QuestionItem.module.css'
import Card from '../../UI/Card'
import Modal from '../Modal/Modal'
import Button from '../../UI/Button'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'


const QuestionItem = (props) => {

    const [checkedValues, setCheckedValues] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            event.target.nextSibling.classList.add(styles['text-bold'])
            setCheckedValues([...checkedValues, event.target.value])
        } else {
            event.target.nextSibling.classList.remove(styles['text-bold'])
            setCheckedValues((prevState) => {
                return prevState.filter((data) => data !== event.target.value)
            })
        }
    };

    const takeDatasFromRadios = () => {
        const data = {
            [props.weatherName]: checkedValues
        }
        props.onTakeDataOfJenres(data)
    };

    const nextSlideHandler = () => {
        if (checkedValues.length === 0) {
            setIsModalOpen(true)
            return;
        }
        takeDatasFromRadios()
        props.onNextSlide()
    };

    const hideModalHandler = () => {
        setIsModalOpen(false)
    };


    return (
        <React.Fragment>

            {isModalOpen &&
                <Modal onHideModal={hideModalHandler}>
                    <p>Вы не выбрали чекбокс!</p>
                    <Button onClick={hideModalHandler}>Закрыть</Button>
                </Modal>}

            <Card>
                <form type="submit" onSubmit={nextSlideHandler}>

                    <div className={styles['question-item']}>
                        <Link to={'/auth/login'}>Уже зарегистрированы? Войдите в систему</Link>
                        <p>{props.id}/{props.arrLength}</p>
                        <h2 className={styles['question-item__text']}>{props.weatherName}</h2>
                        <img src={props.imgSrc} alt={props.weatherName} width="100%" height={300} className={styles['question-item__img']} />
                        <p className={styles['question-item__text']}>What genre of film do you prefer under the specified weather?</p>
                        {/* <div className={styles['input-radios-wrapper']}> */}
                        <div className={styles['input-radios-wrapper']}>
                            <div className={styles['input-radios']}>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="thriller" onChange={handleCheckboxChange} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox1">Thriller</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="fantastic" onChange={handleCheckboxChange} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox2">Fantastic</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="comedy" onChange={handleCheckboxChange} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox3">Comedy</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="horror" onChange={handleCheckboxChange} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox4">Horror</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox5" value="action" onChange={handleCheckboxChange} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox5">Action</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox6" value="drama" onChange={handleCheckboxChange} />
                                    <label className="form-check-label" htmlFor="inlineCheckbox6">Drama</label>
                                </div>
                            </div>
                        </div>

                        <Button onClick={nextSlideHandler} style={{ "width": "150px" }}>Next</Button>
                    </div>
                </form>
            </Card >

        </React.Fragment >
    )
}


export default QuestionItem


QuestionItem.propTypes = {
    id: PropTypes.number,
    arrLength: PropTypes.number,
    imgSrc: PropTypes.string,
    weatherName: PropTypes.string,
    onNextSlide: PropTypes.func,
    onTakeDataOfJenres: PropTypes.func
}