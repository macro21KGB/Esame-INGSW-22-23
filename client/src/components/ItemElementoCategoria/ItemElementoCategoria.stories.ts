import { Meta } from "@storybook/react";
import ItemElementoCategoria from ".";
import { dummyElemento } from "../../entities/dummyObjects";

const meta: Meta = {
    title: "Components/ItemElementoCategoria",
    component: ItemElementoCategoria,
};

export default meta;

export const Default = {
    args: {
        elemento: dummyElemento
    }
};

export const NessunOrdine = {
    args: {
        elemento: null
    }
};

