import { Meta } from "@storybook/react";
import BigButton from ".";

const meta: Meta = {
    title: "Components/BigButton",
    component: BigButton,
    args: {
        text: "Button",
        disabled: false,
        onClick: () => { },
        color: ""
    }
}

export default meta;

export const Primary = {}

export const Disabled = {
    args: {
        disabled: true
    }
}