import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'


const Backdrop = (props) => {
    return (
        <div className={styles['backdrop']} onClick={props.onHideModal}></div>
    )
}


const ModalWindow = (props) => {
    return (
        <div className={styles['modal']} style={props.style}>
            {props.children}
        </div>
    )
}

const portalElement = document.getElementById('overlays')




const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onHideModal={props.onHideModal} />, portalElement)}
            {ReactDOM.createPortal(<ModalWindow style={props.style}>{props.children}</ModalWindow>, portalElement)}
        </React.Fragment>
    )
}


export default Modal