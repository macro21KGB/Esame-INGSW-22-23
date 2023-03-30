// create a zustand store

import { create } from "zustand";
import { dummyAdmin } from "../entities/dummyObjects";
import { Utente } from "../entities/utente";

interface Store {
	user: Utente | null;
	token: string | null;
	idRistorante: number;
	setUser: (user: Utente | null) => void;
	setToken: (token: string) => void;
	setIdRistorante: (idRistorante: number) => void;
}

export const useStore = create<Store>((set, get) => ({
	user: dummyAdmin,
	token: null,
	idRistorante: -1,
	setUser: (user: Utente | null) => set({ user }),
	setToken: (token: string) => set({ token }),
	setIdRistorante: (idRistorante: number) => set({ idRistorante }),
}));
