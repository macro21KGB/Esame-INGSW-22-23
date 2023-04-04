import { Ordinazione } from "../../entities/ordinazione";
import styled from "styled-components";
import ItemElementoOrdinazione from "../ItemElementoOrdinazione";
import { getDifferenzaInMinuti, getOraMinutiDaDate } from "../../utils/utils";
import { useState } from "react";
import { COLORS } from "../../utils/constants";
import { useMutation, useQueryClient } from "react-query";
import { Controller } from "../../entities/controller";
import { toast } from "react-toastify";

interface ItemOrdinazioneProps {
	ordinazione: Ordinazione;
	onDelete: (id: string) => void;
	evasa?: boolean;
}

const ItemOrdinazioneContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0.5rem;
    
    min-height: 10rem;
    background-color: #d9d9d9;
    color: #4D4D4D;
    `;

const ItemOrdinazioneNavbar = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin: 0;
color: #4D4D4D;
padding-left: 0.5rem;
background-color: white;

& > p {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
}

.delete_button {
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    color: #c40d0d;
    cursor: pointer;

    & > svg {
        width: 1.5rem;
        height: 1.5rem;
    }
}
`;

const AreYouSureToDeleteDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    text-align: center;
    margin: 0;
    padding: 0.5rem;
    background-color: #e1e1e1;
    color: #4D4D4D;

    span {
        color: ${COLORS.dangerColor};
        font-weight: bold;
    }

    & > button {
        all: unset;


        margin: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer; 
        background-color: ${COLORS.dangerColor};       
        color: white;

        &:hover {
            filter: brightness(0.9);
        }
    }


    & > button:last-child {
        border: 1px solid black;
        background-color: white;
        color: #4D4D4D;
    }

`;
const DateHolder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    margin: 0;
    padding: 0.5rem;
    background-color: #e1e1e1;
    color: #4D4D4D;
    min-width: 3rem;

    & > p {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
    }

    & > p.difference_time {
        font-size: 1rem;
        font-weight: normal;
        color: #c40d0d;
    `;

const EvadiButton = styled.button`
    background-color: #4fa447;
    border: none;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem;
    cursor: pointer;

`;
const InfoOrdinazioneEvasa = styled.div`
    background-color: gray;
    border: none;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem;
    `;

const OuterLayer = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #d9d9d9;
    `;

export default function ItemOrdinazione({
	ordinazione,
	evasa,
	onDelete,
}: ItemOrdinazioneProps) {
	const tempoOrdinazione = ordinazione.timestamp;

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const controller = Controller.getInstance();
	const queryClient = useQueryClient();

	const mutationEvadiOrdine = useMutation((ordinazione: Ordinazione) => {
		return controller.evadiOrdinazione(ordinazione);
	},
		{
			onSuccess: (data) => {
				toast.success("Ordine evaso con successo");
				queryClient.invalidateQueries(["ordinazioni", "cucina"]);
			},
			onError: (error) => {
				console.log("Errore evasione ordine", error);
				toast.error("Si è riscontrato un Errore!");
			}
		}
	);


	const evadiOrdinazione = () => {
		mutationEvadiOrdine.mutate(ordinazione);
	};

	const deleteOrdinazione = () => {
		setShowDeleteModal(true);
	};

	return (
		<OuterLayer>
			<ItemOrdinazioneNavbar>
				<p>Tavolo {ordinazione.codice_tavolo}</p>
				<div style={{ display: "flex", flexDirection: "row" }}>
					{!evasa && (
						<>
							<button className="delete_button" onClick={deleteOrdinazione}>
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
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</button>
							<DateHolder>
								<p>{getOraMinutiDaDate(tempoOrdinazione)}</p>
								<p className="difference_time">
									+{getDifferenzaInMinuti(tempoOrdinazione, new Date())}
								</p>
							</DateHolder>{" "}
						</>
					)}
				</div>
			</ItemOrdinazioneNavbar>
			{showDeleteModal ? (
				<AreYouSureToDeleteDiv>
					<p>
						Sei sicuro di voler <span>cancellare</span> l'ordinazione?
					</p>
					<button
						type="button"
						onClick={() => {
							setShowDeleteModal(false);
							onDelete(ordinazione.codice_tavolo);
							console.log("Cancella");
						}}
					>
						Si, Cancella
					</button>
					<button
						type="button"
						onClick={() => {
							setShowDeleteModal(false);
						}}
					>
						No, Mantieni
					</button>
				</AreYouSureToDeleteDiv>
			) : (
				<>
					<ItemOrdinazioneContainer>
						{ordinazione.elementi?.map((elemento) => {
							return (
								<ItemElementoOrdinazione
									elemento={elemento}
									key={elemento.nome}
								/>
							);
						})}
					</ItemOrdinazioneContainer>
					{evasa ? (
						<InfoOrdinazioneEvasa>
							Ordine evaso da {ordinazione.evasaDa?.nome}{" "}
							{ordinazione.evasaDa?.cognome}
						</InfoOrdinazioneEvasa>
					) : (
						<EvadiButton
							disabled={ordinazione.evaso}
							onClick={evadiOrdinazione}
						>
							Evadi Ordine ➡️
						</EvadiButton>
					)}
				</>
			)}
		</OuterLayer>
	);
}
