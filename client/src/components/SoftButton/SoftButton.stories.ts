import { Meta } from "@storybook/react";
import SoftButton from ".";

const meta: Meta = {
    title: "Components/SoftButton",
    component: SoftButton,
    args: {
        text: "Button",
        onClick: () => {
            console.log("Clicked");
        }
    }
}


export default meta;

export const Default = {}