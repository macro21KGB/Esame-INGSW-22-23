import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const AutoCompleteContainer = styled.button`
    all:unset;

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
        bottom: -35%;
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

interface AutoCompleteProps {
    placeholder: string;
    onClick: (suggestion: string, ingredients: string) => void;
    valueToSearch: string;
}


export default function AutoCompleteComponent({ placeholder, onClick, valueToSearch }: AutoCompleteProps) {

    const [autoCompleteString, setAutoCompleteString] = useState<string>(placeholder);
    const [ingredients, setIngredients] = useState<string>("");

    const fetchSuggestions = async () => {
        const response = await axios.get<{ meals: any[] }>(`http://www.themealdb.com/api/json/v1/1/search.php?s=${valueToSearch.replace(" ", "_")}`);

        const data = response.data;
        if (data["meals"]) {
            setAutoCompleteString(data["meals"][0]["strMeal"]);
            const ingredients = [];
            for (let i = 1; i < 20; i++) {
                if (data["meals"][0][`strIngredient${i}`] !== "" && data["meals"][0][`strIngredient${i}`] !== null) {
                    ingredients.push(data["meals"][0][`strIngredient${i}`]);
                }
            }
            setIngredients(ingredients.join(", "));
        }
    }

    const handleOnClick = () => {
        if (autoCompleteString === placeholder)
            return;

        if (autoCompleteString) {
            onClick(autoCompleteString, ingredients || "");
        }


    }
    useEffect(() => {
        if (valueToSearch && valueToSearch.length > 3) {
            fetchSuggestions();
        }

        if (valueToSearch.length < 3) {
            setAutoCompleteString(placeholder);
        }
    }, [valueToSearch])

    return (
        <AutoCompleteContainer onClick={handleOnClick}>
            <p>{autoCompleteString}</p>
        </AutoCompleteContainer>
    )
}