// create a zustand store

import { create } from "zustand";
import { dummyAdmin } from "../entities/dummyObjects";
import { Utente } from "../entities/utente";

interface Store {
	user: Utente | null;
	token: string | null;
	setUser: (user: Utente) => void;
}

export const useStore = create<Store>((set, get) => ({
	user: dummyAdmin,
	token: null,
	setUser: (user: Utente) => set({ user }),
}));