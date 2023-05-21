import { Meta } from "@storybook/react";
import DropDownItem from ".";

const meta: Meta = {
    title: "Components/DropDownItem",
    component: DropDownItem,
    tags: ['autodocs'],
    args: {
        children: (
            <>
                <option value="-1">Selezion Ruolo</option>
                <option value="ADDETTO_CUCINA">Addetto Cucina</option>
                <option value="CAMERIERE">Cameriere</option>
            </>
        ),
        onClick: (suggestion: string, ingredients: string) => {
            console.log(suggestion, ingredients);
        }
    }
}

export default meta;

export const Default = {};