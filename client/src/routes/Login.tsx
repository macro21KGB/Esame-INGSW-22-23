import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import "../App.css";
import BigButton from "../components/BigButton";
import InputBox from "../components/InputBox";

//@ts-ignore
import logoIcon from "../public/logo.svg";
import { Result } from "../utils/constants";

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

	#submit_container > p {
		text-align: right;
		margin-right: 1rem;
		color: #44c9ea;
		cursor: pointer;
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

	const pulisciCampi = () => {
		setLoginInfo({
			email: "",
			password: "",
			confirmPassword: "",
		});
	};

	const navigate = useNavigate();

	const [isLogging, setIsLogging] = React.useState(true);
	const handleInfoLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginInfo({
			...loginInfo,
			[e.target.name]: e.target.value,
		});
	};

	const handleLoginRegister = async () => {
		let outApi = "login";
		if (loginInfo.email === "" || loginInfo.password === "") {
			toast.error("Inserisci email e password");
			return;
		}

		if (!isLogging) {
			if (loginInfo.password !== loginInfo.confirmPassword) {
				toast.error("Le password non coincidono");
				return;
			}
			outApi = "register";
		}

		// in caso di errore usa un toast
		try {
			const result = await axios.post(`http://localhost:3000/api/${outApi}`, {
				username: loginInfo.email,
				password: loginInfo.password,
			});

			const data: Result = result.data;

			if (data.success) {
				toast.success("Login effettuato con successo");

				// salva data in un cookie chiamato token con scadenza di 1 ora
				document.cookie = `token=${data.data}; max-age=3600`;
				navigate("/app");
			} else {
				toast.error(data.data);
			}
		} catch (error) {
			const errorMessage = error.response.data.data;
			toast.error(errorMessage);
		}
	};

	return (
		<LoginPageContainer>
			{/* Blob */}

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "100%",
					zIndex: 1,
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
						fill-rule="evenodd"
						clip-rule="evenodd"
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
					onClick={handleLoginRegister}
					text={isLogging ? "Login" : "Registrati"}
				/>
				<br />
				{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
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
