import { Meta } from "@storybook/react";
import AutoCompleteComponent from ".";


const meta: Meta = {
    title: "Components/AutoCompleteComponent",
    component: AutoCompleteComponent,
    args: {
        placeholder: "Cerca un elemento",
        valueToSearch: "fettuc",
    }
}

export default meta;

export const Default = {};
