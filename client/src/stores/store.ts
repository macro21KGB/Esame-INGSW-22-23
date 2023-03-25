// create a zustand store

import { create } from "zustand";
import { Utente } from "../entities/utente";

interface Store {
	user: Utente | null;
	token: string | null;
	setUser: (user: Utente) => void;
}

export const useStore = create<Store>((set, get) => ({
	user: null,
	token: null,
	setUser: (user: Utente) => set({ user }),
}));
