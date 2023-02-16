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
        const inputWrapper = event.target.closest('div')
        console.log(event.target)
        if (event.target.checked) {
            event.target.nextSibling.classList.add(styles['text-bold'])
            setCheckedValues([...checkedValues, event.target.value])

            inputWrapper.classList.add(styles['pick-color'])

        } else {
            event.target.nextSibling.classList.remove(styles['text-bold'])
            inputWrapper.classList.remove(styles['pick-color'])
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
                        {/* <Link to={'/auth/login'}>Уже зарегистрированы? Войдите в систему</Link> */}
                        <p className={styles['text-total']}>{props.id}/{props.arrLength}</p>
                        <h2 className={styles['question-item__text']}>{props.weatherName}</h2>
                        <img src={props.imgSrc} alt={props.weatherName} width="100%" height={300} className={styles['question-item__img']} />
                        <p className={styles['question-item__text']}>What genre of film do you prefer under the specified weather?</p>
                        {/* <div className={styles['input-radios-wrapper']}> */}
                        <div className={styles['input-radios-wrapper']}>
                            <div className={styles['input-radios']}>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox1" value="thriller" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox1">Thriller</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox2" value="fantastic" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox2">Fantastic</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox3" value="comedy" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox3">Comedy</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox4" value="horror" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox4">Horror</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox5" value="action" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox5">Action</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} id="inlineCheckbox6" type="checkbox" value="drama" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox6">Drama</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox7" value="crime" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox7">Crime</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox8" value="adventure" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox8">Adventure</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox9" value="animation" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox9">Animation</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox10" value="documentary" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox10">Documentary</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox11" value="family" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox11">Family</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox12" value="mystery" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox12">Mystery</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox13" value="romance" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox13">Romance</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox14" value="science fiction" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox14">Science fiction</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox15" value="tv movie" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox15">TV Movie</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox16" value="war" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox16">War</label>
                                </div>
                                <div className={`${styles['form-check-inline']} ${styles['form-check']}`}>
                                    <input className={styles['form-check-input']} type="checkbox" id="inlineCheckbox17" value="western" onChange={handleCheckboxChange} />
                                    <label className={styles['form-check-label']} htmlFor="inlineCheckbox17">Western</label>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <a href='#ul'><Button onClick={nextSlideHandler} style={{ "width": "150px" }}>Next</Button></a>
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