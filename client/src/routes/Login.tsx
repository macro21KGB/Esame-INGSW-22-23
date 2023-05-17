import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import BigButton from "../components/BigButton";
import InputBox from "../components/InputBox";
import { Controller } from "../entities/controller";
import "../App.css";

//@ts-ignore
import logoIcon from "../public/logo.svg";
import { salvaTokenInCookie, verificaEmail } from "../utils/utils";
import { RUOLI } from "../entities/utente";
import { logEventToFirebase } from "../firebase";

const LoginPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 95%;    
    color: white;
	


	div {
		width: 100%;
		text-align: center;
	}
	#submit_container {
		overflow: hidden;	


		p {
			text-align: right;
			margin-right: 1rem;
			color: #44c9ea;
			cursor: pointer;
		}
	}
    `;

interface LoginInfo {
	email: string;
	password: string;
	confirmPassword?: string;
}

export default function Login() {
	const [loginInfo, setLoginInfo] = React.useState<LoginInfo>({
		email: "",
		password: "",
	});

	const controller = Controller.getInstance();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = React.useState(false);
	const [isLogging, setIsLogging] = React.useState(true);
	const handleInfoLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginInfo({
			...loginInfo,
			[e.target.name]: e.target.value,
		});
	};

	const handleLoginRegister = async (email: string, password: string, passwordVerifica: string) => {
		if (!verificaEmail(email)) {
			toast.error("Email non valida");
			return;
		}

		if (email === "" || password === "") {
			toast.error("Inserisci email e password");
			return;
		}

		setIsLoading(true);

		// se è in fase di REGISTRZIONE
		if (!isLogging) {

			if (password !== passwordVerifica) {
				toast.error("Le password non coincidono");
				setIsLoading(false);
				return;
			}

			const isUserCreatedSuccessfully = await controller.registraUtente(
				email,
				password,
			);

			if (isUserCreatedSuccessfully) {
				toast.success("Utente creato con successo");
				logEventToFirebase("register", { email })
				setIsLoading(false);
				setIsLogging(true);
				return;
			}

			toast.error("Utente già esistente");
			// se è in fase di LOGIN
		} else {
			const result = await controller.accediUtente(
				email,
				password,
			);

			if (result.success) {
				toast.success("Accesso eseguito con successo");
				logEventToFirebase("login", { email })
				salvaTokenInCookie(result.data.token, 3600);

				// route per il supervisore
				if (result.data.supervisore) {
					navigate("/supervisore", { replace: true });
					return;
				}

				switch (result.data.ruolo) {
					case RUOLI.ADMIN:
						navigate("/dashboard", { replace: true });
						break;
					case RUOLI.CAMERIERE:
						navigate("/ordinazione", { replace: true });
						break;
					case RUOLI.ADDETTO_CUCINA:
						navigate("/cucina", { replace: true });
						break;
				}

			} else {
				setIsLoading(false);
				toast.error("Email o password errati");
			}
		}
	};

	return (
		<LoginPageContainer>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "100%",
					zIndex: 1,
					marginTop: "2rem",
				}}
			>
				{/* make this blob appear on all the screen */}
				<svg
					style={{
						position: "absolute",
						top: "-20%",
						right: "-20%",
						zIndex: -1,
					}}
					width="611"
					height="546"
					viewBox="0 0 611 546"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M334.295 0.968921C441.101 7.01408 516.515 82.6143 555.004 174.377C603.528 290.065 655.039 435.145 548.119 510.756C436.463 589.715 285.71 522.006 172.623 444.786C64.4314 370.909 -32.4386 261.014 10.3508 143.55C52.3719 28.1944 202.179 -6.50873 334.295 0.968921Z"
						fill="#FCA311"
					/>
				</svg>

				<img style={{ textAlign: "center" }} src={logoIcon} alt="" />
				<InputBox
					value={loginInfo.email}
					placeholder="Email"
					onChange={handleInfoLogin}
					name="email"
				/>
				<InputBox
					placeholder="Password"
					value={loginInfo.password}
					onChange={handleInfoLogin}
					type="password"
					name="password"
					onKeyDown={(e) => {
						if (e.key === "Enter" && isLogging) {
							handleLoginRegister(loginInfo.email, loginInfo.password, loginInfo.confirmPassword || "");
						}
					}}
				/>
				{!isLogging && (
					<InputBox
						placeholder="Password"
						value={loginInfo.confirmPassword}
						onChange={handleInfoLogin}
						type="password"
						name="confirmPassword"

					/>
				)}
			</div>

			<div id="submit_container">
				<BigButton
					onClick={() => {
						handleLoginRegister(loginInfo.email, loginInfo.password, loginInfo.confirmPassword || "");
					}}
					disabled={isLoading}
					text={isLogging ? "Login" : "Registrati"}
				/>

				<br />
				<p
					onClick={() => {
						setIsLogging(!isLogging);
					}}
				>
					{isLogging
						? "Non hai un account? Clicca qui"
						: "Hai già un account? Clicca qui"}
				</p>
			</div>
		</LoginPageContainer>
	);
}
