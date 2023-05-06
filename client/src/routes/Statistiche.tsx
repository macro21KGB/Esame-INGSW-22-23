import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell, Bar, Tooltip } from "recharts";
import styled from "styled-components"
import DropDownItem from "../components/DropDownItem";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SoftButton from "../components/SoftButton";
import WelcomePanel from "../components/WelcomePanel";
import { Controller } from "../entities/controller";
import { prendiInizioEFine as prendiLassoTemporale } from "../utils/utils";
import { useParams } from "react-router";
import { RUOLI } from "../entities/utente";
import { toast } from "react-toastify";
import { logEventToFirebase } from "../firebase";
import { AppEvents } from "../utils/constants";


const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;


    height: 100%;
    margin: 0;
    padding: 0 0.5rem;

    #options {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        margin: 0.5rem 0;

        #buttons {
            display: flex;
            flex-direction: row;
        }

        #time-control {
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
            justify-content: center;
            align-items: center;
        }
    }
`;

const OptionDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 0.5rem;
`;


export default function StatisticheRoute() {

    const [selectedEmailUser, setSelected] = useState("");

    const { id } = useParams();
    const queryClient = useQueryClient();

    const [startDate, setStartDate] = useState<string>(new Date().toISOString());
    const [endDate, setEndDate] = useState<string>(new Date().toISOString());

    const controller = Controller.getInstance();

    const queryUtenti = useQuery(["utenti", "cucina"], async () => {
        if (id === undefined) return [];
        const utenti = await controller.getUtenti(+id);
        return utenti.filter(utente => utente.ruolo === RUOLI.ADDETTO_CUCINA);
    });

    const queryOrdiniEvasi = useQuery(["ordini", "evasi", selectedEmailUser], () => {
        logEventToFirebase(AppEvents.OPEN_STATISTICS)
        return controller.getNumeroOrdiniEvasiPerUtente(selectedEmailUser, new Date(startDate), new Date(endDate!));
    },
        {
            enabled: selectedEmailUser !== "" && selectedEmailUser !== "0",
        }
    );

    const mutationAggiornaRangeDate = useMutation((newRange: { from: string, to: string }) => {
        const fromDate = new Date(newRange.from);
        const toDate = new Date(newRange.to);

        return controller.getNumeroOrdiniEvasiPerUtente(selectedEmailUser, fromDate, toDate);
    }, {
        onSuccess: (data) => {
            queryClient.setQueryData(["ordini", "evasi", selectedEmailUser], data);
        },
        onError: (err) => {
            toast.error("Errore durante l'aggiornamento del range di date");
        }
    });

    const aggiornaTimeSpan = (newRange: { from: string, to: string }) => {
        setStartDate(newRange.from);
        setEndDate(newRange.to);
    }

    const onChangeInputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "startDate") {
            setStartDate(value);
        } else {
            setEndDate(value);
        }
    }

    return (
        <DashboardContainer>
            <>
                {NavbarFactory.generateNavbarBackAndMenu()}
                <WelcomePanel title="Visualizza" subtitle="Statistiche" />
                {queryUtenti.isLoading ? <LoadingCircle loaderPosition="absolute" /> : (
                    <OptionDiv>
                        <DropDownItem onChange={(e) => { setSelected(e.target.value) }}>
                            <option value="0">Seleziona Addetto alla cucina</option>
                            {queryUtenti.data?.map((utente) =>
                                <option key={utente.email} value={utente.email}>{utente.nome} {utente.cognome}</option>
                            )}
                        </DropDownItem >

                    </OptionDiv>
                )
                }

                {queryOrdiniEvasi.isLoading && <LoadingCircle loaderPosition="absolute" />}

                {queryOrdiniEvasi.data &&
                    <>
                        <div id="options">
                            <div id="buttons">
                                <SoftButton onClick={() => { aggiornaTimeSpan(prendiLassoTemporale("today")) }} text="Oggi" />
                                <SoftButton onClick={() => { aggiornaTimeSpan(prendiLassoTemporale("week")) }} text="Questa settimana" />
                                <SoftButton onClick={() => { aggiornaTimeSpan(prendiLassoTemporale("month")) }} text="Questo mese" />
                                <SoftButton onClick={() => { aggiornaTimeSpan(prendiLassoTemporale("year")) }} text="Questo anno" />
                            </div>
                            <div id="time-control">
                                <input type="date" name="startDate" value={startDate.split("T")[0]} onChange={onChangeInputDate} />
                                <input type="date" name="endDate" value={endDate?.split("T")[0]} onChange={onChangeInputDate} />
                                <button onClick={() => {
                                    const newRange = { from: startDate, to: endDate };
                                    mutationAggiornaRangeDate.mutate(newRange);
                                }}>Cerca</button>
                            </div>
                        </div>
                        <ResponsiveContainer width="95%" >
                            <BarChart width={730} height={250} data={queryOrdiniEvasi.data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="giorno" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="numero_ordinazioni" name="Numero Ordini" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </>
                }

            </>
        </DashboardContainer>
    )
}