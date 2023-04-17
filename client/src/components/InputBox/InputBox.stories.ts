import { Meta } from "@storybook/react";
import InputBox from ".";

const meta: Meta = {
    title: "Components/InputBox",
    component: InputBox,
    args: {
        placeholder: "Placeholder",
        type: "text",
        name: "name",
    }
}

export default meta;

export const Default = {}

export const WithText = {
    args: {
        value: "Text"
    }
}

export const OnlyNumber = {
    args: {
        type: "number",
        value: 1
    }
}