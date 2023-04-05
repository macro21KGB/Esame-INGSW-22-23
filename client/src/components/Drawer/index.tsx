import styled from "styled-components";
import { animated, useSpring } from "@react-spring/web";
import { COLORS } from "../../utils/constants";
import { useStore } from "../../stores/store";
import { useNavigate } from "react-router";
import { rimuoviTokenDaCookie } from "../../utils/utils";
import { toast } from "react-toastify";

const DrawerBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
`;

const DrawerContainer = styled(animated.div)`
    position: fixed;
    top: 0;
    right: 0;

    width: 80%;
    height: 100%;
    
    color: white;
    background-color: #465375;
    z-index: 101;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    transform: translateX(100%);

    @media (min-width: 768px) {
        width: 30%;
    }
`;

const CloseModalButton = styled.button`
  all: unset;
  cursor: pointer;

  border: none;
  color: white;
  outline: none;

  font-size: 3rem;
  font-weight: 100;
`;

const DrawerHeader = styled.div`
    width: 95%;

    display: flex;
    flex-direction: row;
    align-items: center;
    
    padding: 0.5rem;
    background-color: #394668;
    justify-content: space-between;
`;

const DrawerButton = styled.button`
    all: unset;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    margin-left: 1rem;
    gap: 1rem;
    cursor: pointer;
    border: none;
    color: white;
    outline: none;

    font-size: 1.5rem;
    font-weight: 400;

    &:hover {
        color: ${COLORS.primaryColor};
    }
`;

const LogoutButton = styled.button`
    all: unset;

    width: auto;
    border: 4px solid red;
    color: red;
    margin: 1rem;
    margin-top: auto;

    font-weight: 700;
    font-size: 1.5rem;

    padding: 0.5rem 1rem;
    border-radius: 0.5rem;

    cursor: pointer;
    outline: none;

    &:hover {
        background-color: red;
        color: white;
    }
`;

interface DrawerProps {
	onClose: () => void;
}

function Drawer(props: DrawerProps): JSX.Element {
	const { onClose } = props;

	const setUserInStore = useStore((state) => state.setUser);
	const navigate = useNavigate();

	const logout = () => {

		// rimuovo l'utente dallo store
		// rimuovo il token dal cookie
		// navigo al login	
		setUserInStore(null);
		rimuoviTokenDaCookie();
		navigate("/");

		toast.success("Logout effettuato con successo");
	};

	const [animation, set] = useSpring(
		() => ({
			from: { opacity: 0, transform: "translateX(100%)" },
			to: { opacity: 1, transform: "translateX(0%)" },
		}),
		[],
	);

	return (
		<DrawerBackground onClick={onClose}>
			<DrawerContainer style={animation}>
				<DrawerHeader>
					<CloseModalButton onClick={onClose}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="white"
							style={{
								width: "2rem",
								height: "2rem",
								fontWeight: 700,
							}}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
							/>
						</svg>
					</CloseModalButton>
				</DrawerHeader>

				<DrawerButton>
					<svg
						width="40"
						height="40"
						viewBox="0 0 40 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clipPath="url(#clip0_138_1912)">
							<path
								d="M35 2.5C35.663 2.5 36.2989 2.76339 36.7678 3.23223C37.2366 3.70107 37.5 4.33696 37.5 5V35C37.5 35.663 37.2366 36.2989 36.7678 36.7678C36.2989 37.2366 35.663 37.5 35 37.5H5C4.33696 37.5 3.70107 37.2366 3.23223 36.7678C2.76339 36.2989 2.5 35.663 2.5 35V5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5H35ZM5 0C3.67392 0 2.40215 0.526784 1.46447 1.46447C0.526784 2.40215 0 3.67392 0 5L0 35C0 36.3261 0.526784 37.5979 1.46447 38.5355C2.40215 39.4732 3.67392 40 5 40H35C36.3261 40 37.5979 39.4732 38.5355 38.5355C39.4732 37.5979 40 36.3261 40 35V5C40 3.67392 39.4732 2.40215 38.5355 1.46447C37.5979 0.526784 36.3261 0 35 0L5 0Z"
								fill="white"
							/>
							<path
								d="M22.325 16.47L16.6 17.1875L16.395 18.1375L17.52 18.345C18.255 18.52 18.4 18.785 18.24 19.5175L16.395 28.1875C15.91 30.43 16.6575 31.485 18.415 31.485C19.7775 31.485 21.36 30.855 22.0775 29.99L22.2975 28.95C21.7975 29.39 21.0675 29.565 20.5825 29.565C19.895 29.565 19.645 29.0825 19.8225 28.2325L22.325 16.47ZM22.5 11.25C22.5 11.913 22.2366 12.5489 21.7678 13.0178C21.2989 13.4866 20.663 13.75 20 13.75C19.337 13.75 18.7011 13.4866 18.2322 13.0178C17.7634 12.5489 17.5 11.913 17.5 11.25C17.5 10.587 17.7634 9.95107 18.2322 9.48223C18.7011 9.01339 19.337 8.75 20 8.75C20.663 8.75 21.2989 9.01339 21.7678 9.48223C22.2366 9.95107 22.5 10.587 22.5 11.25Z"
								fill="white"
							/>
						</g>
						<defs>
							<clipPath id="clip0_138_1912">
								<rect width="40" height="40" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<p>Informazioni</p>
				</DrawerButton>
				<DrawerButton>
					<svg
						width="40"
						height="36"
						viewBox="0 0 40 36"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M38 18.44C38 7.46 29.48 0 20 0C10.62 0 2 7.3 2 18.56C0.8 19.24 0 20.52 0 22V26C0 28.2 1.8 30 4 30H6V17.8C6 10.06 12.26 3.8 20 3.8C27.74 3.8 34 10.06 34 17.8V32H18V36H34C36.2 36 38 34.2 38 32V29.56C39.18 28.94 40 27.72 40 26.28V21.68C40 20.28 39.18 19.06 38 18.44Z"
							fill="white"
						/>
						<path
							d="M14 22C15.1046 22 16 21.1046 16 20C16 18.8954 15.1046 18 14 18C12.8954 18 12 18.8954 12 20C12 21.1046 12.8954 22 14 22Z"
							fill="white"
						/>
						<path
							d="M26 22C27.1046 22 28 21.1046 28 20C28 18.8954 27.1046 18 26 18C24.8954 18 24 18.8954 24 20C24 21.1046 24.8954 22 26 22Z"
							fill="white"
						/>
						<path
							d="M31.9999 16.06C31.5231 13.2483 30.0668 10.6959 27.8888 8.85476C25.7109 7.01359 22.9518 6.00234 20.0999 6C14.0399 6 7.51994 11.02 8.03994 18.9C10.5062 17.8908 12.6844 16.287 14.3804 14.2316C16.0764 12.1762 17.2374 9.73303 17.7599 7.12C20.3799 12.38 25.7599 16 31.9999 16.06Z"
							fill="white"
						/>
					</svg>

					<p>Supporto</p>
				</DrawerButton>
				<LogoutButton onClick={logout}>Logout</LogoutButton>
			</DrawerContainer>
		</DrawerBackground>
	);
}

export default Drawer;
