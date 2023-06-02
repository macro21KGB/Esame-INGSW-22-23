import { Meta, StoryObj } from "@storybook/react";
import SoftButton from ".";

const meta: Meta<typeof SoftButton> = {
    title: "Components/SoftButton",
    component: SoftButton,
    tags: ['autodocs'],
    args: {
        text: "Button",
        onClick: () => {
            console.log("Clicked");
        }
    }
}
export default meta;

type Story = StoryObj<typeof SoftButton>

export const Default: Story = {}