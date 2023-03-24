import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const ErrorPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: white;
	background-color: #263657;
	height: 100vh;

	div {
		line-height: 1.5rem;
	}

	div > p {
		font-size: 1.2rem;
	}
	i {
		font-size: 2rem;
		font-weight: 600;
		color: #ff0000;
	}
`;

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<ErrorPageContainer>
			<h1>Oops!</h1>
			<div>
				<p>E' stato rilevato un errore sconosciuto</p>
				<p>la preghiamo di riprovare più tardi</p>
			</div>

			<i>
				{/* @ts-ignore */}
				{error.statusText || error.message}
			</i>
		</ErrorPageContainer>
	);
}
