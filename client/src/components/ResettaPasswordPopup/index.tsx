import { useState } from "react";
import styled from "styled-components";
import BigButton from "../BigButton";
import InputBox from "../InputBox";

const PopupContainer = styled.div`
    
    position: fixed;
    top: 50%;
    left: 50%;
    
    transform: translate(-50%, -50%);
    background-color: #465375;
    border-radius: 1rem;
    padding: 0.5rem 2rem;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    
    color: white;
    
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
`;

const PopupBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

interface ResettaPasswordPopupProps {
    onConfirm: () => void;
}

const ResettaPasswordPopup = ({ onConfirm }: ResettaPasswordPopupProps) => {

    const [password, setPassword] = useState<string>("");

    const handleClickOnConfirm = () => {
        if (password === "") {
            alert("Inserire una password");
            return;
        }

        onConfirm();
    }

    return (
        <PopupBackground>
            <PopupContainer>
                <p>Crea una nuova password per procedere</p>
                <InputBox type="text" value={password} placeholder="Nuova Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                <BigButton text="Cambia Password" onClick={handleClickOnConfirm} />
            </PopupContainer>
        </PopupBackground>
    )

}

export default ResettaPasswordPopup;