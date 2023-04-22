import { Meta } from "@storybook/react";
import NavBar from ".";
import { RouterProvider, createMemoryRouter } from "react-router";


const meta: Meta = {
    title: "Components/NavBar",
    component: NavBar,
    args: {
        state: ["add", "back", "menu"]
    },
    decorators: [
        (Story) => {

            const storyRouter = createMemoryRouter([
                { path: "/", element: <Story /> }
            ])

            return (
                <div>
                    <RouterProvider router={storyRouter} />
                </div>
            )
        }
    ]
}


export default meta;

export const All = {}


export const OnlyBack = {
    args: {
        state: ["back"]
    }
}

export const OnlyAdd = {
    args: {
        state: ["add"]
    }
}

export const OnlyMenu = {
    args: {
        state: ["menu"]
    }
}

export const AddAndBack = {
    args: {
        state: ["add", "back"]
    }
}

export const AddAndMenu = {
    args: {
        state: ["add", "menu"]
    }
}

export const BackAndMenu = {
    args: {
        state: ["back", "menu"]
    }
}

