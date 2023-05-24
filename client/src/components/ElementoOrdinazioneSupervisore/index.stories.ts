import { Meta } from "@storybook/react";
import ElementoOrdinazioneSupervisore from ".";
import { dummyOrdinazione } from "../../entities/dummyObjects";

const meta: Meta = {
    title: "Components/ElementoOrdinazioneSupervisore",
    component: ElementoOrdinazioneSupervisore,
    tags: ['autodocs'],
    args: {
        ordine: dummyOrdinazione
    }
}

export default meta;

export const Default = {};