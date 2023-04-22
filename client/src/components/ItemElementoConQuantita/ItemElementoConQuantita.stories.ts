import { Meta } from "@storybook/react";
import ItemElementoConQuantita from ".";
import { dummyElementoConQuantita } from "../../entities/dummyObjects";

const meta: Meta = {
    title: "Components/ItemElementoConQuantita",
    component: ItemElementoConQuantita,
    args: {
        elemento: dummyElementoConQuantita,
        quantita: 0
    }
}

export default meta;

export const Default = {}