import { Ordinazione } from "../../entities/ordinazione";
import styled from "styled-components";
import ItemElementoOrdinazione from "../ItemElementoOrdinazione";
import { COLORS } from "../../utils/constants";
import { getDifferenzaInMinuti, getOraMinutiDaDate } from "../../utils/utils";

interface ItemOrdinazioneProps {
	ordinazione: Ordinazione;
}

const ItemOrdinazioneContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    background-color: ${(props) => (props.disabled ? "#838383" : "#4fa447")};
    border: none;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem;
    cursor: pointer;

    `;

const OuterLayer = styled.div`
    max-widt: 40%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #d9d9d9;
    max-width: 40%;
    `;

export default function ItemOrdinazione(props: ItemOrdinazioneProps) {
	const { ordinazione } = props;

	const tempoOrdinazione = ordinazione.timestamp;

	return (
		<OuterLayer>
			<ItemOrdinazioneNavbar>
				<p>Tavolo {ordinazione.codice_tavolo}</p>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<button className="delete_button" onClick={null}>
						🗑️
					</button>
					<DateHolder>
						<p>{getOraMinutiDaDate(tempoOrdinazione)}</p>
						<p className="difference_time">
							+{getDifferenzaInMinuti(tempoOrdinazione, new Date())}
						</p>
					</DateHolder>
				</div>
			</ItemOrdinazioneNavbar>
			<ItemOrdinazioneContainer>
				{ordinazione.elementi.map((elemento) => {
					return (
						<ItemElementoOrdinazione elemento={elemento} key={elemento.nome} />
					);
				})}
			</ItemOrdinazioneContainer>
			<EvadiButton disabled={ordinazione.evaso} onClick={null}>
				Evadi Ordine ➡️
			</EvadiButton>
		</OuterLayer>
	);
}
