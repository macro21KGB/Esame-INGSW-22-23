import styled from "styled-components";
import { ICanBeSupervisor, RUOLI, Utente } from "../../entities/utente";
import StarBadge from "./StarBadge";

export const UtenzaItemContainer = styled.div`
    position: relative;    
    display: flex;
    
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    padding: 0.5rem;
    margin: 1rem;
    border-radius: 0.5rem;
    
    color: white;
    background-color: #465375;

    #buttons {
        display: flex;
        flex-direction: row;
        padding: 0.5rem;
        gap: 0.5rem;
    }

    button, a {
        all: unset;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		outline: none;
	}

    #info {
        line-height: 0rem;
        overflow: hidden;
        text-overflow: ellipsis;

        & > h3 {
            font-size: 1.5rem;
            font-weight: 600;
        }

        & > p {
            font-size: 1rem;
            font-weight: 400;
            font-style: italic;
        }

`;


interface UtenzaItemProps {
	utente: ICanBeSupervisor;
	onModifica: () => void;
}

export default function UtenzaItem({ utente, onModifica }: UtenzaItemProps) {
	return (
		<UtenzaItemContainer>
			<div id="info">
				<h3>{utente.nome}</h3>
				<p>{utente.ruolo}</p>
			</div>

			<div id="buttons">
				<button
					disabled={utente.ruolo === RUOLI.ADMIN}
					onClick={onModifica}
					type="button"
				>
					<svg
						width="46"
						height="46"
						viewBox="0 0 46 46"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="46" height="46" rx="8" fill="#EEBB08" />
						<g filter="url(#filter0_d_311_562)">
							<path
								d="M30.3565 10C29.8028 10 29.2634 10.2132 28.8375 10.6253L25.8281 13.6379L33.3517 21.1837L36.3612 18.1995C37.2129 17.3326 37.2129 15.9826 36.3612 15.1584L31.8612 10.6253C31.4353 10.2132 30.8959 10 30.3565 10ZM24.8202 14.6468L13.3218 26.1716L16.9558 26.5695L17.2114 29.8237L20.4479 30.0653L20.8596 33.7032L32.358 22.1784M12.4842 27.4932L10 37L19.511 34.4563L19.1703 31.3868L15.8912 31.1453L15.6356 27.8484"
								fill="white"
							/>
						</g>
						<defs>
							<filter
								id="filter0_d_311_562"
								x="8"
								y="10"
								width="31"
								height="33"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood floodOpacity="0" result="BackgroundImageFix" />
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="4" />
								<feGaussianBlur stdDeviation="1" />
								<feComposite in2="hardAlpha" operator="out" />
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
								/>
								<feBlend
									mode="normal"
									in2="BackgroundImageFix"
									result="effect1_dropShadow_311_562"
								/>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="effect1_dropShadow_311_562"
									result="shape"
								/>
							</filter>
						</defs>
					</svg>
				</button>
				<a href={`tel:${utente.telefono}`}>
					<svg
						width="46"
						height="46"
						viewBox="0 0 46 46"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
					>
						<rect width="46" height="46" rx="8" fill="#2D2727" />
						<rect
							width="35.027"
							height="41.0662"
							rx="3"
							transform="matrix(-0.0155924 -0.999878 -0.999878 0.0155924 43.7637 40.054)"
							fill="url(#pattern0)"
						/>
						<defs>
							<pattern
								id="pattern0"
								patternContentUnits="objectBoundingBox"
								width="1"
								height="1"
							>
								<use
									xlinkHref="#image0_311_559"
									transform="matrix(0.00228987 0 0 0.00195312 -0.0862069 0)"
								/>
							</pattern>
							<image
								id="image0_311_559"
								width="512"
								height="512"
								xlinkHref="data:image/png;base64,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"
							/>
						</defs>
					</svg>
				</a>
			</div>
			{utente.ruolo !== RUOLI.ADMIN && <StarBadge isOn={utente.supervisore} />}
		</UtenzaItemContainer>
	);
}
