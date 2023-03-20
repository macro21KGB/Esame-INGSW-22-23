import React from 'react'
import "../../App.css"
import styled from 'styled-components'
import { COLORS } from "../../utils/constants";
import PropTypes from 'prop-types'

export default function FABAddButton(props) {

    const FABButton = styled.button`
        background-color: ${COLORS.primaryColor};
        border-radius: 50%;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: bold;
        height: 2.5rem;
        width: 2.5rem;

    `

    return (
        <FABButton onClick={props.onClick}>
            +
        </FABButton >
    )
}

FABAddButton.propTypes = {
    onClick: PropTypes.func.isRequired
}