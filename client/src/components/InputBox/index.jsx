import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/constants";
import PropTypes from "prop-types"

export default function InputBox(props) {

    const InputBoxContainer = styled.input`
        background-color: white;
        border-radius: 0.4rem;
        border: 1px solid ${COLORS.accentBackgroundColor};
        width: auto;

        padding: 0.8rem 0.5rem;
        margin: 0.5rem 0.7rem;
    `

    return (
        <InputBoxContainer placeholder={props.placeholder || "Placeholder Here"} />
    );
}

InputBox.propTypes = {
    placeholder: PropTypes.string
}