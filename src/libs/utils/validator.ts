import React from "react";


export function validatePassword(str: string, callBack: Function) {
    let validPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{6,20}$/
    let errors = [];
    
    if (str.length < 8) {
        errors.push("Your password must be at least 8 characters");
    }
    if (str.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (str.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit.");
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    return true;
}

export const validateNumbers = (e: React.KeyboardEvent) => {
    const specialCharRegex = new RegExp("[0-9]");
    const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (!specialCharRegex.test(pressedKey)) {
        e.preventDefault();
        return false;
    }
    return true
}