import { Meta, StoryObj } from "@storybook/react";
import ItemRistorante from ".";
import { dummyResturant } from "../../entities/dummyObjects";

const meta: Meta<typeof ItemRistorante> = {
    title: "Components/ItemRistorante",
    component: ItemRistorante,
    tags: ['autodocs'],

    args: {
        ristorante: dummyResturant,
        onClick: () => {
            console.log("Clicked on " + dummyResturant.nome)
        }
    }
}

export default meta;


type Story = StoryObj<typeof ItemRistorante>

export const Default: Story = {}

export const ConNomeMoltoLungo: Story = {
    args: {
        ristorante: {
            ...dummyResturant,
            nome: "Ristorante con un nome molto lungo che non dovrebbe essere mai usato"
        }
    }
}