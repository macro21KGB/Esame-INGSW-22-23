import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import offlineJSONautocomplete from './offline-autocomplete.json'
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

interface ElementSuggestion {
    name : string;
    ingredients: string[]
}

export default function AutoCompleteComponent({ placeholder, onClick, valueToSearch }: AutoCompleteProps) {

    const [autoCompleteString, setAutoCompleteString] = useState<string>(placeholder);
    const [ingredients, setIngredients] = useState<string>("");

    async function fetchOnlineSuggestion() : Promise<ElementSuggestion> {
        const response = await axios.get<{ meals: any[] }>(`http://www.themealdb.com/api/json/v1/1/search.php?s=${valueToSearch.replace(" ", "_")}`);

        const data = response.data;
        let suggestion : ElementSuggestion = {
            name:"",
            ingredients : []
        };

        if (data["meals"]) {
            const ingredients = [];
            for (let i = 1; i < 20; i++) {
                if (data["meals"][0][`strIngredient${i}`] !== "" && data["meals"][0][`strIngredient${i}`] !== null) {
                    ingredients.push(data["meals"][0][`strIngredient${i}`]);
                }
            }
            suggestion.name = data["meals"][0]["strMeal"];
            suggestion.ingredients = ingredients;
        }
        return suggestion;
    }
    function stringSimilarity(str1: string, str2: string): number {
        const set1 = new Set(str1.split(""));
        const set2 = new Set(str2.split(""));
        const intersection = new Set([...set1].filter(char => set2.has(char)));
        const union = new Set([...set1, ...set2]);
        return intersection.size / union.size;
    }
    function fetchOfflineSuggestion() : ElementSuggestion{
        let suggestion : ElementSuggestion = {
            name:"",
            ingredients : []
        };
        let maxScore = -1;
        offlineJSONautocomplete.forEach(element => {
            const score = stringSimilarity(valueToSearch.toLowerCase(),element.name.toLowerCase())
            if(score>=.5 && score > maxScore)
            {
                maxScore = score;
                suggestion.ingredients = element.ingredients;
                suggestion.name = element.name
            }   
        });
        return suggestion;
    }

    const fetchSuggestion = async () => {
        let suggestion : ElementSuggestion = await fetchOnlineSuggestion();
        
        if(suggestion.ingredients.length==0)
            suggestion = fetchOfflineSuggestion();

        if(suggestion.ingredients.length!=0)
        {
            setAutoCompleteString(suggestion.name);
            setIngredients(suggestion.ingredients.join(", "));  
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
            fetchSuggestion();
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