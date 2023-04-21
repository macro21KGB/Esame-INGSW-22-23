import { Meta } from "@storybook/react";
import ItemRistorante from ".";
import { dummyResturant } from "../../entities/dummyObjects";

const meta: Meta = {
    title: "Components/ItemRistorante",
    component: ItemRistorante,
    args: {
        ristorante: dummyResturant
    }
}

export default meta;


export const Default = {}

export const ConNomeMoltoLungo = {
    args: {
        ristorante: {
            ...dummyResturant,
            nome: "Ristorante con un nome molto lungo che non dovrebbe essere mai usato"
        }
    }
}