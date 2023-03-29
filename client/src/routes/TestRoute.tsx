import { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import styled from "styled-components";
import axios from "axios";

const AutoCompleteContainer = styled.button`
    all: unset;    

    cursor: pointer;
    position: relative;
    border-radius: 0.6rem;
    padding: 0.1rem 1rem;
    background-color: #fff;
    color: gray;
    margin-bottom: 0.5rem;

    &:after {
        content: "";
        position: absolute;
        bottom: -40%;
        left: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
        border-top: 0.5rem solid white;

    }

    p {
        margin: 0;
    }
    `;

export default function TestRoute() {

    const [value, setValue] = useState<string>("");
    const [autoCompleteString, setAutoCompleteString] = useState<string>("AutoComplete");

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const fetchSuggestions = async () => {
        const response = await axios.get<string>(`http://www.themealdb.com/api/json/v1/1/search.php?s=${value.replace(" ", "_")}`);

        const data = response.data;
        console.log(data);
        if (data["meals"] != null) {
            setAutoCompleteString(data["meals"][0]["strMeal"]);
        }
    }

    const selectAutoComplete = () => {
        setValue(autoCompleteString);
    }

    useEffect(() => {
        if (value.length > 3) {
            fetchSuggestions();
        }
    }, [value])

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <AutoCompleteContainer onClick={selectAutoComplete}>
                <p>{autoCompleteString}</p>
            </AutoCompleteContainer>
            <InputBox value={value} placeholder="Test" onChange={(e) => { onChangeHandler(e) }} />
        </>
    )
}