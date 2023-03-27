import BigButton from "../components/BigButton";
import InputBox from "../components/InputBox";
import { NavbarFactory } from "../components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const PrendiOrdinazioneContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;
`;

const QRCodePlaceholder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 15rem;
    padding: 0.5rem;
    width: 15rem;
    border: 4px dashed white;
    border-radius: 1rem;    
    
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
    height: 100%;
    padding-bottom: 1rem;
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
					<QRCodePlaceholder>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
							/>
						</svg>
						Scansiona il QR Code presente sul tavolo
					</QRCodePlaceholder>
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
