import { Meta } from "@storybook/react";
import WelcomePanel from ".";


const meta: Meta = {
    title: "Components/WelcomePanel",
    component: WelcomePanel,
    args: {
        title: "Benvenuto,",
        subtitle: "Mario Rossi"
    }
}

export default meta;

export const Default = {};

export const Gestione = {
    args: {
        title: "Gestisci",
        subtitle: "Menu"
    }
};