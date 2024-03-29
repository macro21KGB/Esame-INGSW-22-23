import { Meta } from "@storybook/react";
import QRCodeScanner from ".";

const meta: Meta = {
    title: "Components/QRCodeScanner",
    tags: ['autodocs'],
    component: QRCodeScanner,
    args: {
        qrCodeSuccessCallback: (data: string) => { console.log(data) },
    }
}

export default meta;

export const Default = {};