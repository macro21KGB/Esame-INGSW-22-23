import React, { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import styled from "styled-components";
import NavBar from "../components/NavBar";

import "../App.css";

function App() {
	const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
  `;

	return (
		<AppContainer>
			<NavBar
				addFunc={() => {
					console.log("ADD");
				}}
				backFunc={() => {
					console.log("BACK");
				}}
			/>
			<InputBox placeholder="hello" />
		</AppContainer>
	);
}

export default App;
