import { useEffect, useRef, useState } from "react";
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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


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
    const queryClient = useQueryClient();

    const { id } = useParams();

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const controller = Controller.getInstance();

    const onChangeDateFromCalendar = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start!);
        setEndDate(end!);
        mutationAggiornaTimeSpan.mutate({ from: start!, to: end! });
    };

    const queryUtenti = useQuery(["utenti", "cucina"], async () => {
        if (id === undefined) return [];
        const utenti = await controller.getUtenti(+id);
        return utenti.filter(utente => utente.ruolo != RUOLI.ADDETTO_CUCINA);
    });

    const queryOrdiniEvasi = useQuery(["ordini", "evasi", selectedEmailUser], async () => {
        const result = await controller.getNumeroOrdiniEvasiPerUtente(selectedEmailUser, startDate, endDate!);
        return result;
    },
        {
            enabled: selectedEmailUser !== "" && selectedEmailUser !== "0",
        }
    );

    const mutationAggiornaTimeSpan = useMutation((newTimeSpan: { from: Date, to: Date }) => {
        return controller.getNumeroOrdiniEvasiPerUtente(selectedEmailUser, newTimeSpan.from, newTimeSpan.to);
    },
        {
            onSettled: () => {
                queryClient.invalidateQueries(["ordini", "evasi", selectedEmailUser]);
            },
            onSuccess: (data) => {
                queryClient.setQueryData(["ordini", "evasi", selectedEmailUser], data);

            },
            onError: (error) => {
                console.log(error);
                toast.error("Errore nel caricamento dei dati");
            }
        }
    );

    const aggiornaTimeSpan = async (newTimeSpan: { from: Date, to: Date }) => {
        setStartDate(newTimeSpan.from);
        setEndDate(newTimeSpan.to);
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
                            <DatePicker
                                selected={startDate}
                                startDate={startDate}
                                onChange={onChangeDateFromCalendar}
                                endDate={endDate}
                                selectsRange
                            />
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