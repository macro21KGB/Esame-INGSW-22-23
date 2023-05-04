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

	const queryCambioPassword = useQuery<boolean>(["cambioPassword"], () => controller.isUtenteUsingDefaultPassword());

	const mutationCambiaPassword = useMutation((nuovaPassword: string) => controller.cambiaPasswordDefault(nuovaPassword), {
		onSuccess: () => {
			queryClient.invalidateQueries("cambioPassword");
			toast.success("Password cambiata con successo");
		},
		onError: () => {
			toast.error("Errore nel cambiare la password");
		}
	});

	const iniziaOrdinazione = () => {
		console.log("Inizia ordinazione");

		if (codiceTavolo === "") {
			toast.error("Inserisci un codice tavolo");
			return;
		}

		navigate(`/ordinazione/${codiceTavolo}`);
	};

	return (
		<PrendiOrdinazioneContainer>
			{NavbarFactory.generateNavbarAddAndMenu(() => { })}
			{(queryCambioPassword.isSuccess && !queryCambioPassword.data) && (
				<Suspense fallback={<LoadingCircle />}>
					<ResettaPasswordPopup onConfirm={(pwd) => { mutationCambiaPassword.mutate(pwd) }} />
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
