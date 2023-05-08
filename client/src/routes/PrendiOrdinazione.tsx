import BigButton from "../components/BigButton";
import InputBox from "../components/InputBox";
import { NavbarFactory } from "../components/NavBar";
import { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import QRCodeScanner from "../components/QRCodeScanner";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Controller } from "../entities/controller";
import LoadingCircle from "../components/LoadingCircle";
import { logEventToFirebase } from "../firebase";
import { AppEvents } from "../utils/constants";
import { useCheckFirstAccessPassword } from "../utils/hooks";
const ResettaPasswordPopup = lazy(() => import("../components/ResettaPasswordPopup"));

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
	const controller = Controller.getInstance();
	const queryClient = useQueryClient();

	const [isUsingFirstAccessPassword, cambiaPassword] = useCheckFirstAccessPassword();

	const iniziaOrdinazione = () => {
		console.log("Inizia ordinazione");

		if (codiceTavolo === "") {
			toast.error("Inserisci un codice tavolo");
			return;
		}
		logEventToFirebase(AppEvents.START_TAKING_ORDER);
		navigate(`/ordinazione/${codiceTavolo}`);
	};

	return (
		<PrendiOrdinazioneContainer>
			{NavbarFactory.generateNavbarOnlyMenu()}
			{(isUsingFirstAccessPassword.data !== true) && (
				<Suspense fallback={<LoadingCircle />}>
					<ResettaPasswordPopup onConfirm={(pwd) => { cambiaPassword(pwd) }} />
				</Suspense>
			)}

			<Content>
				<div>
					{codiceTavolo === "" && (
						<QRCodeScanner
							key={codiceTavolo}
							fps={30}
							qrCodeSuccessCallback={(message) => {
								setCodiceTavolo(message);
							}}
							qrCodeErrorCallback={() => {
							}}
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
