// create a zustand store

import { create } from "zustand";
import { dummyAdmin } from "../entities/dummyObjects";
import { Utente } from "../entities/utente";

interface Store {
	user: Utente | null;
	token: string | null;
	idRistorante: number | null;
	setUser: (user: Utente) => void;
	setToken: (token: string) => void;
	setIdRistorante: (idRistorante: number) => void;
}

export const useStore = create<Store>((set, get) => ({
	user: dummyAdmin,
	token: null,
	idRistorante: null,
	setUser: (user: Utente) => set({ user }),
	setToken: (token: string) => set({ token }),
	setIdRistorante: (idRistorante: number) => set({ idRistorante }),
}));
