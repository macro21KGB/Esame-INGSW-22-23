import { Link, Outlet } from "react-router-dom";
import styled from "styled-components"
import { NavbarFactory } from "../components/NavBar"
import SoftButton from "../components/SoftButton";
import { useStore } from "../stores/store";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    height: 100%;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    height: 100%;
    padding: 1rem;
`;

export default function DashboardSupervisore() {

    const idRistorante = useStore(state => state.idRistorante);

    return (
        <Container>
            {NavbarFactory.generateNavbarOnlyMenu()}
            <Content>
                <Link to={`/dashboard/${idRistorante}/menu`} >
                    <SoftButton text="Gestisci Menu" />
                </Link>
                <Link to={`/supevisore/conti`}>
                    <SoftButton text="Gestisci Conti" />
                </Link>
            </Content>
            <Outlet />
        </Container>
    )
}