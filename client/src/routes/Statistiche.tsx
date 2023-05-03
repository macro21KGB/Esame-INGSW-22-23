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
import { convertFullDateStringToDateString, prendiInizioEFine as prendiLassoTemporale } from "../utils/utils";
import { useParams } from "react-router";
import { RUOLI } from "../entities/utente";
import { toast } from "react-toastify";
import dayjs from "dayjs";


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

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const controller = Controller.getInstance();

    const queryUtenti = useQuery(["utenti", "cucina"], async () => {
        if (id === undefined) return [];
        const utenti = await controller.getUtenti(+id);
        return utenti.filter(utente => utente.ruolo === RUOLI.ADDETTO_CUCINA);
    });

    useEffect(() => {
        console.log("StartDate:", startDate);
        console.log("EndDate:", endDate);
    }, [startDate, endDate])

    const queryOrdiniEvasi = useQuery(["ordini", "evasi", selectedEmailUser], () => {
        return controller.getNumeroOrdiniEvasiPerUtente(selectedEmailUser, startDate, endDate!);
    },
        {
            enabled: selectedEmailUser !== "" && selectedEmailUser !== "0",
        }
    );

    const mutationAggiornaRangeDate = useMutation((newRange: { from: Date, to: Date }) => {

        return controller.getNumeroOrdiniEvasiPerUtente(selectedEmailUser, newRange.from, newRange.to);
    }, {
        onSuccess: (data) => {
            queryClient.setQueryData(["ordini", "evasi", selectedEmailUser], data);
        },
        onError: (err) => {
            toast.error("Errore durante l'aggiornamento del range di date");
        }
    });


    const aggiornaTimeSpan = (newTimeSpan: { from: Date, to: Date }) => {
        setStartDate(newTimeSpan.from);
        setEndDate(newTimeSpan.to);
    };

    const onChangeInputDate = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = dayjs(e.target.value).toDate();
        if (e.target.name === "startTime") {
            if (newDate > endDate)
                toast.error("La data di inizio non può essere maggiore della data di fine");

            aggiornaTimeSpan({ from: newDate, to: endDate });
        }
        else {
            if (newDate < startDate)
                toast.error("La data di fine non può essere minore della data di inizio");

            aggiornaTimeSpan({ from: startDate, to: newDate });
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
                                <input type="date" name="startTime" value={convertFullDateStringToDateString(startDate.toISOString())} onChange={onChangeInputDate} />
                                <input type="date" name="endTime" value={convertFullDateStringToDateString(endDate?.toISOString() || new Date().toISOString())} onChange={onChangeInputDate} />
                                <button onClick={async () => {
                                    const newRange = { from: startDate, to: endDate };
                                    await mutationAggiornaRangeDate.mutateAsync(newRange);
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