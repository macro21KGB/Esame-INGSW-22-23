import { Meta } from "@storybook/react";
import ItemCategoria from ".";
import { dummyCategoria } from "../../entities/dummyObjects";

const categoria = dummyCategoria;

const meta: Meta = {
    title: "Components/ItemCategoria",
    component: ItemCategoria,
    args: {
        categoria
    }
}

export default meta;


export const Primary = {}