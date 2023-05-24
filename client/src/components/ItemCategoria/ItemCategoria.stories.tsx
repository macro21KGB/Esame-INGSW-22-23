import { Meta } from "@storybook/react";
import ItemCategoria from ".";
import { dummyCategoria } from "../../entities/dummyObjects";
import { RouterProvider, createMemoryRouter } from "react-router";

const meta: Meta = {
    title: "Components/ItemCategoria",
    tags: ['autodocs'],
    component: ItemCategoria,
    args: {
        categoria: dummyCategoria
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


export const Primary = {}