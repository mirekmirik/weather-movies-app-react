import React from "react"

const DropdownItem = (props) => {
    return (
        <React.Fragment>
            <li className={props.className} key={props.key}>{props.children}</li>
        </React.Fragment>
    )
}

export default DropdownItem