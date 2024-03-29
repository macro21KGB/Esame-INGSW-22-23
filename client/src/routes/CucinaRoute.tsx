import { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import ItemOrdinazione from "../components/ItemOrdinazioneCucina";
import { NavbarFactory } from "../components/NavBar";
import { useQueries } from "react-query";
import { Controller } from "../entities/controller";
import { Ordinazione } from "../entities/ordinazione";
import { useCheckFirstAccessPassword } from "../utils/hooks";
import LoadingCircle from "../components/LoadingCircle";
import ResettaPasswordPopup from "../components/ResettaPasswordPopup";

// center popup on center of the screen that tell the user to rotate the device
const WrongOrentation = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #465375;
    border-radius: 1rem;
    padding: 1rem;
    width: 80vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    color: white;
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
`;

const PopupBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const CucinaRouteContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    #sections {
        display: flex;
        flex-direction: row;
        margin: 1rem;
        gap: 1rem;
    }
`;

// create a grid of 2 rows and 2 columns, but the list can scroll
const MacroSection = styled.div<{ bgColor: string }>`
    position: relative;
    display: grid;
    background-color: ${(props) => props.bgColor};
    grid-template-columns: 1fr 1fr;
    padding: 1rem;
    gap: 1rem;
    max-height: 80vh;
    width: 50%;
    padding-top: 2rem;
    overflow-y: auto;

    &:before {
        content: "${(props) => props.title}";
        font-weight: bold;
        position: absolute;
        font-size: 1.2rem;
        top: 0.1rem;
        left: 1rem;
    }

`;

export default function CucinaRoute() {
    const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

    const checkScreenSize = () => {
        if (window.innerWidth < window.innerHeight) setIsScreenTooSmall(true);
        else setIsScreenTooSmall(false);
    };

    const controller = Controller.getInstance();
    useEffect(() => {
        window.addEventListener("resize", checkScreenSize);
    }, [])

    const [isUsingFirstAccessPassword, cambiaPassword] = useCheckFirstAccessPassword();


    const queryOrdinazioni = useQueries([
        {
            queryKey: ["ordinazioni", "cucina", "nonevase"],
            queryFn: () => {
                return controller.getOrdinazioniDaEvadere();
            },
            refetchInterval: 60000,
        },
        {
            queryKey: ["ordinazioni", "cucina", "evase"],
            queryFn: () => {
                return controller.getOrdinazioniEvaseUltime24h();
            },
        }
    ])


    return (
        <CucinaRouteContainer>
            {NavbarFactory.generateNavbarOnlyMenu()}
            {isScreenTooSmall && (
                <PopupBackground>
                    <WrongOrentation>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>
                        Per favore ruota il tuo dispositivo
                    </WrongOrentation>
                </PopupBackground>
            )}

            {(isUsingFirstAccessPassword.data === false) ? (
                <Suspense fallback={<LoadingCircle />}>
                    <ResettaPasswordPopup onConfirm={(pwd) => { cambiaPassword(pwd) }} />
                </Suspense>

            ) : null
            }


            <div id="sections">
                <MacroSection title="Ordinazioni da evadere" bgColor="#bb0000">
                    {queryOrdinazioni[0].isLoading ? (
                        <p>Caricamento...</p>
                    ) : queryOrdinazioni[0].isError ? (
                        <p>Errore nel caricamento delle ordinazioni</p>
                    ) : queryOrdinazioni[0].data ? (
                        queryOrdinazioni[0].data?.data.map((ordinazione: Ordinazione) => {
                            return <ItemOrdinazione ordinazione={ordinazione} key={ordinazione.timestamp.toString()} />
                        })
                    ) : null}
                </MacroSection>
                <MacroSection title="Ordinazioni già evase" bgColor="green">
                    {queryOrdinazioni[1].isLoading ? (
                        <p>Caricamento...</p>
                    ) : queryOrdinazioni[1].isError ? (
                        <p>Errore nel caricamento delle ordinazioni</p>
                    ) : queryOrdinazioni[1].data && (
                        queryOrdinazioni[1].data?.data.map((ordinazione: Ordinazione) => {
                            return <ItemOrdinazione evasa={true} ordinazione={ordinazione} key={ordinazione.timestamp.toString()} />
                        })
                    )}
                </MacroSection>
            </div>
        </CucinaRouteContainer>
    );
}



