import React, { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import WelcomePanel from "../components/WelcomePanel";
import ItemRistorante from "../components/ItemRistorante";

const AppContainer = styled.div`
display: flex;
flex-direction: column;
margin: 0;
padding: 0;

#start_list_ristoranti {
	color: #465375;
	font-size: 2.5rem;
	font-weight: 300;
	padding: 0.5rem;
`;

const ListaRistorantiContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	align-items: center;
	padding: 1rem;
`;

function App() {
	return (
		<AppContainer>
			<NavBar
				addFunc={() => {
					console.log("ADD");
				}}
			/>
			<WelcomePanel title="Benvenuto," subtitle="Mario" />

			<p id="start_list_ristoranti">I Miei Ristoranti</p>
			<ListaRistorantiContainer>
				<ItemRistorante />
			</ListaRistorantiContainer>
		</AppContainer>
	);
}

export default App;
