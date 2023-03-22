import { Ordinazione } from './ordinazione';
import { Ristorante } from './ristorante';

const dummyResturant = new Ristorante("Ristorante", "Via Roma", "1234567890", "www.ristorante.it", "img/ristorante.jpg", { camerieri: [], addettiAllaCucina: [] });

const dummyOrdinazione = new Ordinazione(1, new Date(), [], false, []);


export { 
        dummyResturant,
        dummyOrdinazione
        
    };