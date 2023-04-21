import React from 'react';
import { Meta } from "@storybook/react";
import SlideUpModal from ".";
import BigButton from '../BigButton';



const meta: Meta = {
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
            <div>
                <h1>Test</h1>
                <p>Bottone</p>
            </div>
        ),
        setShowModal: () => {
            console.log("Clicked close")
        }
    }
}
