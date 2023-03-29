import { useState } from "react";
import styled from "styled-components"

const DropDownItemContainer = styled.select`
    position: relative;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #263657;
    padding: 0.5rem 1rem;
    border-radius: 0.7rem;
    margin: 0.5rem;
    cursor: pointer;
    transition: 0.2s;
    border: none;
    color: white;
    outline: none;

    font-family: 'Poppins', sans-serif;
    text-align: center;

    p {
        margin: 0;
    }

    &:hover {
        background-color: #2c3e50;
    }

`;

interface DropDownItemProps {
    children: React.ReactNode;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default function DropDownItem({ children, onChange }: DropDownItemProps) {

    return (
        <DropDownItemContainer onChange={onChange}>
            {children}
        </DropDownItemContainer>
    )
}