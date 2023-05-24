import { Link, Outlet } from "react-router-dom";
import styled from "styled-components"
import { NavbarFactory } from "../components/NavBar"
import SoftButton from "../components/SoftButton";
import { useCheckFirstAccessPassword } from "../utils/hooks";
import { Suspense } from "react";
import LoadingCircle from "../components/LoadingCircle";
import ResettaPasswordPopup from "../components/ResettaPasswordPopup";
import WelcomePanel from "../components/WelcomePanel";
import { Controller } from "../entities/controller";
import { useQuery } from "react-query";

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

    const [isUsingFirstAccessPassword, cambiaPassword] = useCheckFirstAccessPassword();
    const controller = Controller.getInstance();

    const idRistoranteQuery = useQuery("idRistorante", async () => {
        const ristorante = await controller.getRistoranteAttuale();
        return ristorante.id;
    })

    return (
        <Container>
            {NavbarFactory.generateNavbarOnlyMenu()}
            {(isUsingFirstAccessPassword.data === false) && (
                <Suspense fallback={<LoadingCircle />}>
                    <ResettaPasswordPopup onConfirm={(pwd) => { cambiaPassword(pwd) }} />
                </Suspense>
            )}
            <Content>
                <WelcomePanel title="Benvenuto" subtitle="Supervisore" />
                {
                    idRistoranteQuery.data &&
                    <Link to={`/dashboard/${idRistoranteQuery.data}/menu`} >
                        <SoftButton text="Gestisci Menu" />
                    </Link>
                }
                <Link to={`/supervisore/cassa`}>
                    <SoftButton text="Gestisci Conti" />
                </Link>
            </Content>
            <Outlet />
        </Container>
    )
}