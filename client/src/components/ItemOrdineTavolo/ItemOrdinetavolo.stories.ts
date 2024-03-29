import { Meta } from "@storybook/react";
import ItemOrdineTavolo from ".";
import { dummyConto } from "../../entities/dummyObjects";

const meta: Meta = {
    title: "Components/ItemOrdineTavolo",
    tags: ['autodocs'],
    component: ItemOrdineTavolo,
    args: {
        conto: dummyConto
    }
}

export default meta;


export const Default = {}