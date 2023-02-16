import React from "react"
import DropdownItem from "./DropdownItem"
import DropDownList from "./DropdownList"
import styles from './Dropdown.module.css'

const Dropdown = (props) => {
    return (
        <React.Fragment>
            <label>{props.label || 'label'}</label>
            <input type={props.type || 'text'} className={props.className || styles['input-dropdown']} onChange={props.onChange} value={props.value} />
            <DropDownList>
                {/* {props.data.map((data, idx) => <DropdownItem key={idx}>{data}</DropdownItem>)} */}
            </DropDownList>
        </React.Fragment>
    )
}

export default Dropdown