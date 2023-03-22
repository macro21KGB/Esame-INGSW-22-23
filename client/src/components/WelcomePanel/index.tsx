import React from "react";
import styled from "styled-components";

interface WelcomePanelProps {
	title: string;
	subtitle: string;
}

const WelcomePanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0.5rem;
    color: white;
    overflow: ellipsis;

    h1, h2 {
        margin: 0;
    }

    h1 {
        font-size: 4rem;
        font-weight: bold;
    }


    h2 {
        font-size: 2.5rem;
        font-weight: 100;
        filter: opacity(0.8);
    }
    `;

export default function WelcomePanel(props: WelcomePanelProps) {
	const { title, subtitle } = props;

	return (
		<WelcomePanelContainer>
			<h1>{title}</h1>
			<h2>{subtitle}</h2>
		</WelcomePanelContainer>
	);
}
