import styled from '@emotion/styled'

import React from 'react'

import { Field } from 'formik'

const Checkbox = props => {
    return (
        <CheckboxCustom >
            <Field name={props.name} type="checkbox" />
            <span className="checkmark"></span>
        </CheckboxCustom>
    )
}

export default Checkbox


export const CheckboxCustom = styled.label`
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    input{
        position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    }
    .checkmark{
        position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: .5rem;
    }
    &:hover input ~ .checkmark {
        background-color: #ccc;
    }
    input:checked ~ .checkmark {
    background-color: #000;
    }
    .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    }
    input:checked ~ .checkmark:after {
    display: block;
    }
    .checkmark:after {
        left: 7px;
    top: 6px;
    width: 10px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    }
`