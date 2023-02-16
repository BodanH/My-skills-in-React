import React from "react";
import classes from "./MyButton.module.css";

const Button = ({children, ...props}) => {
    return (
        <button {...props} disabled = {false} className={classes.my_button}>
            {children}
        </button>
    )
}

export default Button;