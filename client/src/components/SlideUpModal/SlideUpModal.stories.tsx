import { Meta, StoryObj } from "@storybook/react";
import SlideUpModal from ".";
import InputBox from "../InputBox";



const meta: Meta<typeof SlideUpModal> = {
    title: "Components/SlideUpModal",
    component: SlideUpModal,
    args: {
        showModal: true
    },
}
export default meta;


export const Default = {
    args: {
        children: (
            <div style={{ textAlign: "center" }}>
                <h1>Modify Something</h1>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <InputBox placeholder="Email" name="email" />
            </div>
        ),
        setShowModal: () => {
            console.log("Clicked close")
        }
    }
}
