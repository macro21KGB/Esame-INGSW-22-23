import { Meta } from "@storybook/react";
import ItemOrdinazione from ".";
import { dummyOrdinazione } from "../../entities/dummyObjects";
import { QueryClient, QueryClientProvider } from "react-query";
import { StrictMode } from "react";


const storyQueryClient = new QueryClient();

const meta: Meta = {
    title: "Components/ItemOrdinazione",
    component: ItemOrdinazione,
    args: {
        ordinazione: dummyOrdinazione
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div>
                <StrictMode>
                    <QueryClientProvider client={storyQueryClient}>
                        <Story />
                    </QueryClientProvider>
                </StrictMode>
            </div>
        )
    ]
}

export default meta;

export const Default = {};