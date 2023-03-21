import { Ordinazione } from "../../entities/ordinazione";
import styled from "styled-components";

interface ItemOrdinazioneProps {
	ordinazione: Ordinazione;
    evaso: boolean;
}

const ItemOrdinazioneContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    `;

export default function ItemOrdinazione(props) {
	return (
		<ItemOrdinazioneContainer>
			<
		</ItemOrdinazioneContainer>
	);
}
