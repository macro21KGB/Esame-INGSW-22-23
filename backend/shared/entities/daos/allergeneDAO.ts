import { Allergene } from "../allergene";

interface IAllergeneDAO {
    getAllergeni(id_elemento: number): Promise<Allergene[]>;
    addAllergene(allergene: Allergene): Promise<Boolean>;
    deleteAllergene(id : number): Promise<Boolean>;
}

export { IAllergeneDAO };