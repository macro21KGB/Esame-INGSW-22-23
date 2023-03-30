import express, { Request, Response, NextFunction, Router } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import cors from 'cors';
import { Utente,RUOLI,UtenteFactory, Admin, Cameriere, AddettoAllaCucina } from './shared/entities/utente'
import { UtenteDAOPostgresDB } from './db_dao/utente';
import { RistoranteDAOPostgresDB } from './db_dao/ristorante';
import { Ristorante } from './shared/entities/ristorante';

const UtenteDAO = new UtenteDAOPostgresDB();
const RistoranteDAO = new RistoranteDAOPostgresDB();

const app = express();
const router = Router();
const port = 3000;

const secret = 'ilMioSegretoSegretissimo';

interface TokenPayload {
  id : number,
  nome : string,
  cognome : string,
  email: string,
  ruolo : RUOLI
}

function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}


function authenticateToken(req : Request, res : Response, next : NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({message:"Token not provided"});
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) return res.status(403).json({message:"Invalid token"});
    console.log(decoded as TokenPayload);
    next()
  })
}

function requiresAdminRole(req : Request, res : Response, next : NextFunction){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({success:false,data:"Token not provided"});
  jwt.verify(token, secret, async(err: any, decoded: any) => {
    if (err) return res.status(403).json({success:false,data:"Invalid token"});
    const ruolo = decoded.ruolo;
    if(ruolo!=RUOLI.ADMIN){
      res.status(403).json({success:false,data:"Non sei autorizzato ad accedere a questa risorsa"});
      return;
    }
    next();
  });
}

function blockAccessToOtherResturantsEmployees(req : Request, res : Response, next : NextFunction) {
  if (req.params.email == null) 
    return res.status(400).json({success:false,data:"Employee email not provided"});
  const emailEmployee = req.params.email;

  // spacchetta il token e controlla che tu sia admin
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({success:false,data:"Token not provided"});
  jwt.verify(token, secret, async(err: any, decoded: any) => {
    if (err) return res.status(403).json({success:false,data:"Invalid token"});
    
    // ottieni l'admin dell'utente che si vuole modificare e controlla che tu sia admin
    const admin = await UtenteDAO.getAdmin(emailEmployee);
    if( admin == null )
    {
      res.status(401).json({success:false, data: 'Non sei autorizzato a modificare questo utente' });
      return;
    }
    else if(admin.email != decoded.email){
      res.status(401).json({success:false, data: 'Non sei autorizzato a modificare questo utente' });
      return;
    }
    next();
  });
}


// Middleware
app.use(cors())
app.use('/api', router);
router.use(express.json());


router.post('/login', async (req: Request, res: Response) => {
  if (!req.body['username'] || !req.body['password'])
    return res.status(400).send({ message: 'Credentials not provided.' });

  const [username, password] = [req.body['username'] as string, req.body['password'] as string]
  
  const user = await UtenteDAO.accediUtente(username,password);
  if (user!=null) { 
    console.log("authorized");
  }
  else {
    console.log("unauthorized");
    return res.status(401).send({ message: 'Invalid credentials.' });
  }
  const id = await UtenteDAO.getIdUtente(username);
  if (id == null) return res.status(400).send({ message: 'Unexpected error' });
  console.log("utente id: "+id);
  const payload: TokenPayload = {
    id: id,
    nome: user.nome,
    cognome : user.cognome,
    email :user.email,
    ruolo :user.ruolo?user.ruolo:RUOLI.ADMIN
  }
  const response = { success: true, data: generateToken(payload) };

  res.status(200).json(response);
});


router.post('/register',async (req: Request, res: Response) => {
  if (!req.body['username'] || !req.body['password'])
    return res.status(400).send({ message: 'Wrong parameters' });

  const [username, password] = [req.body['username'] as string, req.body['password'] as string];

  // verifica che non esista utente
  const utenti = await UtenteDAO.getUtenti();
  if(utenti.find(u => u.email === username))
    return res.status(400).send({ success: false, data: "Utente già registrato" });

  // crea user nel db
  UtenteDAO.registraUtente(username,password);
  res.status(200).send({ success: true, data: "Registrazione avvenuta con successo" });
});

router.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Server is up and running!' });
});

router.get('/testt', (req: Request, res: Response) => {

  res.status(200).send({ message: 'Testt!' });
});

router.get('/resturants', authenticateToken, async (req: Request, res: Response) => {
  // ottieni email dell'utente dal token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({message:"Token not provided"});

  jwt.verify(token, secret, async(err: any, decoded: any) => {
    if (err) return res.status(403).json({message:"Invalid token"});
    const email = decoded.email;
    res.status(200).json(JSON.stringify(await UtenteDAO.getRistoranti(email)));
  })
});

router.get('/resturant/:id', authenticateToken, async(req: Request, res: Response) => {
  const ristorante = await RistoranteDAO.getRistorante(+req.params.id);
  if(ristorante!=null)
    res.status(200).json(JSON.stringify(ristorante));
  else
    res.status(404).json({"message":"nessun ristorante con questo id"});
  
});

router.post('/resturant', authenticateToken, async(req: Request, res: Response) => {
  if (!req.body['nome'] || !req.body['indirizzo'] || !req.body['telefono']){
    res.status(400).json({success:false, data: 'Bad request' });
    return;
  }
  const  sitoweb = req.body['sitoWeb'] || '';
  const ristorante = new Ristorante(0,req.body['nome'],req.body['indirizzo'],req.body['telefono'],sitoweb);
  // ottieni id utente dal token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({message:"Token not provided"});
  jwt.verify(token, secret, async(err: any, decoded: any) => {
    if (err) return res.status(403).json({message:"Invalid token"});
    const id_utente = decoded.id;
    try {
      if(await RistoranteDAO.addRistorante(ristorante,id_utente)) 
        res.status(200).send({success:true, data: 'Ristorante aggiunto' });
      else
        res.status(400).send({success:false, data: 'Ristorante non aggiunto' });
    }
    catch(err) {
      res.status(400).send({success:false, data: 'Ristorante già esistente' });
    }
  });
});

router.post('/edit-utente/:email', authenticateToken,requiresAdminRole,blockAccessToOtherResturantsEmployees, async(req: Request, res: Response) => {
  if (!req.body['nome'] || !req.body['cognome'] || !req.body['telefono']){
    res.status(400).json({success:false, data: 'Bad request' });
    return;
  }
  const emailKey = req.params.email;

  const utente = await UtenteDAO.getUtente(emailKey);
  if(utente==null){
    res.status(400).json({success:false, data: 'Utente non trovato' });
    return;
  }
  utente.nome = req.body['nome'];
  utente.cognome = req.body['cognome'];
  utente.telefono = req.body['telefono'];
  try {
    if(await UtenteDAO.updateUtente(utente,utente.email)) 
      res.status(200).send({success:true, data: 'Utente aggiornato' });
    else
      res.status(400).send({success:false, data: 'Utente non aggiornato' });
  }
  catch(err) {
    res.status(400).send({success:false, data: 'Utente non aggiornato' });
  }

});


router.post('/del-utente/:email', authenticateToken,requiresAdminRole,blockAccessToOtherResturantsEmployees, async(req: Request, res: Response) => {
  const emailKey = req.params.email;
  // ottieni email da token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({message:"Token not provided"});
  jwt.verify(token, secret, async(err: any, decoded: any) => {
    if (err) return res.status(403).json({message:"Invalid token"});
    const email = decoded.email;
    if(email==emailKey){
      res.status(400).json({success:false, data: 'Non puoi cancellare te stesso' });
      return;
    }
  });
  
  const utente = await UtenteDAO.getUtente(emailKey);
  if(utente==null){
    res.status(400).json({success:false, data: 'Utente non trovato' });
    return;
  }
  try {
    if(await UtenteDAO.deleteUtente(utente.email)) 
      res.status(200).send({success:true, data: 'Utente cancellato' });
    else
      res.status(400).send({success:false, data: 'Utente non cancellato' });
  }
  catch(err) {
    res.status(400).send({success:false, data: 'Utente non cancellato' });
  }

});

router.get('/pw-changed', authenticateToken, async(req: Request, res: Response) => {
  // ottieni email dal token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({message:"Token not provided"});
  jwt.verify(token, secret, async(err: any, decoded: any) => {
    if (err) return res.status(403).json({message:"Invalid token"});
    const email = decoded.email;
    res.status(200).json(JSON.stringify(await UtenteDAO.isPasswordChanged(email)));
  }
  )
});

router.post('/pw-change', authenticateToken, async(req: Request, res: Response) => {
  const newPassword = req.body['password'];
  if( newPassword == null){
    res.status(400).json({success:false, data: 'Bad request' });
    return;
  }
  // ottieni email utente dal token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(400).json({message:"Token not provided"});
  jwt.verify(token, secret, async(err: any, decoded: any) => {
    if (err) return res.status(403).json({message:"Invalid token"});
    const email = decoded.email;
    try {
      if(await UtenteDAO.updatePassword(email,newPassword)) 
        res.status(200).send({success:true, data: 'Password cambiata' });
      else
        res.status(400).send({success:false, data: 'Password non cambiata' });
    }
    catch(err) {
      res.status(400).send({success:false, data: 'Password non cambiata' });
    }
  }
  );



});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
