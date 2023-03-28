import { useQuery } from "react-query";
import styled from "styled-components"
import ItemOrdineTavolo from "../components/ItemOrdineTavolo";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import WelcomePanel from "../components/WelcomePanel";
import { Controller } from "../entities/controller";

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

    #start_paragraph {
        font-size: 1.5rem;
        font-weight: 600;
        color: #465375;
    }
`;

export default function GestisciContiRoute() {

    const controller = Controller.getInstance();

    const query = useQuery(["conti"], () => {
        return controller.getContiTavoliUltime24h();
    })

    return (
        <Container>
            {NavbarFactory.generateNavbarBackAndMenu()}
            <WelcomePanel title="Gestione" subtitle="Conti" />
            <Content>
                <p id="start_paragraph">Gestione conti tavoli ultime 24h</p>
                {
                    query.isLoading ? <LoadingCircle position="absolute" /> :
                        (
                            query.data.data?.map((conto) => (<ItemOrdineTavolo conto={conto} chiuso={true} />))
                        )
                }
            </Content>
        </Container>
    )
}
