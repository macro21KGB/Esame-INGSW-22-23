import styled from "styled-components";

interface WelcomePanelProps {
    title: string;
    subtitle: string;
}

const WelcomePanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem 0.5rem;
    color: white;
    overflow: ellipsis;
    line-height: 2rem;

    p, sub {
        margin: 0;
        padding: 0;
    }

    p {
        font-weight: 700;
        font-size: 2.5rem;
    }

    sub {
        font-weight: 100;
        font-size: 1.5rem;
        font-style: italic;
    }

    `;

export default function WelcomePanel({ title, subtitle }: WelcomePanelProps) {

    return (
        <WelcomePanelContainer>
            <p>{title}</p>
            <sub>{subtitle}</sub>
        </WelcomePanelContainer>
    );
}
