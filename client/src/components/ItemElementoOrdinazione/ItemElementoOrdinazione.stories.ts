import { Meta } from "@storybook/react";
import ItemElementoOrdinazione from ".";
import { dummyElemento, dummyElementoConQuantita } from "../../entities/dummyObjects";


const meta: Meta = {
    title: "Components/ItemElementoOrdinazione",
    component: ItemElementoOrdinazione,
    args: {
        elemento: dummyElementoConQuantita
    }
};

export default meta;

export const Default = {};