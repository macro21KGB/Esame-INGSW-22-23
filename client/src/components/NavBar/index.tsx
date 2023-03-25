import React, { useState } from "react";
import FABAddButton from "../FABAddButton";
import styled from "styled-components";
import { COLORS } from "../../utils/constants";
import { createPortal } from "react-dom";
import Drawer from "../Drawer";

// the state variable accept an array of 1 or more of the following strings: "add", "back", "menu"
interface NavBarProps {
	addFunc?: () => void;
	state?: ("add" | "back" | "menu")[];
}

// go back inhistory with react router
const goBack = () => {
	window.history.back();
};

const ButtonsContainer = styled.div`
display: flex;
align-items: center;
gap: 0.7rem;
`;
const NavbarButton = styled.button`
display: flex;
background-color: transparent;
cursor: pointer;
border: none;
`;

const NavBarContainer = styled.div`
	background-color: ${COLORS.accentBackgroundColor};
	color: ${COLORS.primaryTextColor};
	display: flex;
	align-items: center;
	flex-direction: row;
	padding: 0 0.8rem;
	font-size: 1.2rem;
	justify-content: space-between;
	border:none;
	
	h3 {
		margin: 0.8rem;
		font-weight: 500;
	}
`;

class NavbarFactory {
	public static generateNavbarOnlyBack(): JSX.Element {
		return <NavBar state={["back"]} />;
	}

	public static generateNavbarOnlyAdd(): JSX.Element {
		return <NavBar state={["add"]} />;
	}

	public static generateNavbarOnlyMenu(): JSX.Element {
		return <NavBar state={["menu"]} />;
	}

	public static generateNavbarAddAndBack(addFunction: () => void): JSX.Element {
		return <NavBar state={["add", "back"]} addFunc={addFunction} />;
	}

	public static generateNavbarAddAndMenu(addFunction: () => void): JSX.Element {
		return <NavBar state={["add", "menu"]} addFunc={addFunction} />;
	}

	public static generateNavbarBackAndMenu(): JSX.Element {
		return <NavBar state={["back", "menu"]} />;
	}

	public static generateNavbarAll(addFunction: () => void): JSX.Element {
		return <NavBar addFunc={addFunction} />;
	}
}

function NavBar(props: NavBarProps) {
	const DEFAULT_STATE = ["add", "back", "menu"];

	const [drawerOpen, setDrawerOpen] = useState(false);

	const closeDrawer = () => {
		setDrawerOpen(false);
	};

	const handleAddClick = () => {
		if (props.addFunc) props.addFunc();
	};

	const state = props.state || DEFAULT_STATE;

	// TODO da controllare se body va bene
	return (
		<NavBarContainer>
			<h3 style={{ fontFamily: "Pacifico" }}>Ratatouille</h3>
			{drawerOpen &&
				createPortal(<Drawer onClose={closeDrawer} />, document.body)}
			<ButtonsContainer>
				{state.indexOf("add") !== -1 && (
					<FABAddButton onClick={handleAddClick} />
				)}
				{state.indexOf("back") !== -1 && (
					<NavbarButton onClick={goBack}>
						<svg
							width="22"
							height="21"
							viewBox="0 0 22 21"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9.71108 20.5852L0.388443 11.4599C0.247191 11.3216 0.146902 11.1718 0.087576 11.0105C0.0291918 10.8492 0 10.6764 0 10.492C0 10.3077 0.0291918 10.1348 0.087576 9.97354C0.146902 9.81223 0.247191 9.66245 0.388443 9.52418L9.71108 0.398835C9.97004 0.145353 10.2935 0.0126209 10.6815 0.000638139C11.0704 -0.0104229 11.4061 0.122309 11.6886 0.398835C11.9711 0.652317 12.1185 0.968939 12.1307 1.3487C12.142 1.72938 12.0064 2.05799 11.7239 2.33451L4.80257 9.1094H20.5875C20.9877 9.1094 21.3234 9.24167 21.5946 9.50621C21.8649 9.77167 22 10.1003 22 10.492C22 10.8838 21.8649 11.2119 21.5946 11.4765C21.3234 11.7419 20.9877 11.8747 20.5875 11.8747H4.80257L11.7239 18.6495C11.9829 18.903 12.1185 19.2256 12.1307 19.6174C12.142 20.0091 12.0064 20.3317 11.7239 20.5852C11.465 20.8617 11.1354 21 10.7352 21C10.3349 21 9.99358 20.8617 9.71108 20.5852Z"
								fill="white"
							/>
						</svg>
					</NavbarButton>
				)}
				{state.indexOf("menu") !== -1 && (
					<NavbarButton onClick={() => setDrawerOpen(!drawerOpen)}>
						<svg
							width="32"
							height="19"
							viewBox="0 0 32 19"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								y="0.5"
								width="31.3043"
								height="3.91304"
								rx="1.95652"
								fill="white"
							/>
							<rect
								x="3.13043"
								y="7.54348"
								width="28.1739"
								height="3.91304"
								rx="1.95652"
								fill="white"
							/>
							<rect
								x="7.82611"
								y="14.587"
								width="23.4783"
								height="3.91304"
								rx="1.95652"
								fill="white"
							/>
						</svg>
					</NavbarButton>
				)}
			</ButtonsContainer>
		</NavBarContainer>
	);
}

export default NavBar;
export { NavbarFactory };
