import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Ristorante } from "../../entities/ristorante";

const ItemRistoranteContainer = styled(Link)`
    
    all:unset;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    color: white;
    border-radius: 0.5rem;
    background: linear-gradient(101.52deg, #263657 5.56%, #465375 93.24%);
    width: 100%;
    overflow: hidden;
    max-height: 5rem;

    cursor: pointer;

    p {
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
        

    }

    sub {
        font-size: 1.2rem;
        font-weight: 100;
        margin: 0;
        font-style: italic;
    }

    #infos {
        padding: 0.5rem;
        line-height: 1.5rem;
    `;

interface ItemRistoranteProps {
	ristorante: Ristorante;
}

export default function ItemRistorante(props: ItemRistoranteProps) {
	const { ristorante } = props;

	return (
		<ItemRistoranteContainer to={`/dashboard/${1}`} type="button">
			<div id="infos">
				<p>{ristorante.nome}</p>
				<sub>{ristorante.indirizzo}</sub>
			</div>
			<img src="https://picsum.photos/100" alt="" />
		</ItemRistoranteContainer>
	);
}
