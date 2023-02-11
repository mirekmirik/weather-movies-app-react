import styles from './Button.module.css'


// const defaultStyles = {

//     padding: "5px 20px",
//     borderRadius: "10px",
//     backgroundColor: "rgb(247, 167, 0)",
//     textAlign: "center",
//     color: "black",
//     border: "none",
    

// }

// const hoverStyles = {
//     ':hover': {
//         backgroundColor: "rgb(255, 195, 0)",
//     }
// }

const Button = (props) => {

    

    return (
        <button
            disabled={props.disabled}
            style={{ ...props.style}}
            onClick={props.onClick}
            type={props.type || 'button'}
            className={`${props.className} ${styles['button']}`}
        > {props.children}
        </button >
    )
}

export default Button