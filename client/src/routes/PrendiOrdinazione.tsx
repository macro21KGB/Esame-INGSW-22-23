import BigButton from "../components/BigButton";
import InputBox from "../components/InputBox";
import { NavbarFactory } from "../components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import QRCodeScanner from "../components/QRCodeScanner";

const PrendiOrdinazioneContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
	text-align: center;
    margin-top: 2rem;
    height: 100%;
    padding-bottom: 1rem;

	#html5qr-code-full-region {
		border:none; !important;
	}

	div {
		width: 100%;
	}
`;

export default function PrendiOrdinazioneRoute() {
	const [codiceTavolo, setCodiceTavolo] = useState("");
	const navigate = useNavigate();

	const iniziaOrdinazione = () => {
		console.log("Inizia ordinazione");
		navigate(`/ordinazione/${codiceTavolo}`);
	};

	return (
		<PrendiOrdinazioneContainer>
			{NavbarFactory.generateNavbarAddAndMenu(() => {})}
			<Content>
				<div>
					{codiceTavolo === "" && (
						<QRCodeScanner
							fps={30}
							qrCodeSuccessCallback={(message) => {
								console.log(message);
								setCodiceTavolo(message);
							}}
							qrCodeErrorCallback={() => {}}
						/>
					)}
					<InputBox
						type="text"
						value={codiceTavolo}
						onChange={(e) => setCodiceTavolo(e.target.value)}
						placeholder="Codice Tavolo/Posto/Spazio"
					/>
				</div>

				<BigButton text="Inizia Ordinazione" onClick={iniziaOrdinazione} />
			</Content>
		</PrendiOrdinazioneContainer>
	);
}
