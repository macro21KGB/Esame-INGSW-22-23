import express, { Request, Response, NextFunction, Router } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import cors from 'cors';
import { Utente,Ruolo } from './classi-ts/utente'

const app = express();
const router = Router();
const port = 3000;

const secret = 'ilMioSegretoSegretissimo';

interface TokenPayload {
  id : string,
  nome : string,
  cognome : string,
  email: string,
  ruolo : Ruolo
}

function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}


function authenticateToken(req : Request, res : Response, next : NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, secret, (err: any, user: any) => {
    console.log(err)

    if (err) return res.sendStatus(403).json({message:"Invalid token"});

    console.log("TOKEN OK");

    next()
  })
}


// Middleware
app.use(cors())
app.use('/api', router);
router.use(express.json());


router.post('/login', (req: Request, res: Response) => {
  if (!req.body['username'] || !req.body['password'])
    return res.status(400).send({ message: 'Credentials not provided.' });

  const [username, password] = [req.body['username'] as string, req.body['password'] as string]
  console.log("Credentials: "+username + " "+ password);
  // dummy user
  if (username === 'pippo' && password === '123') { 
    console.log("authorized");
  }
  else {
    console.log("unauthorized");
    return res.status(401).send({ message: 'Invalid credentials.' });
  }
  const payload: TokenPayload = {
    id: "6969",
    nome: "pippo",
    cognome : "rossi",
    email :"pippo.rossi@gmail.com",
    ruolo :Ruolo.ADMIN
  }
  const response = { success: true, data: generateToken(payload) };

  res.status(200).json(response);
});


// Esempio di request json
router.post('/json', (req: Request, res: Response) => {
  const param = req.body['par'] as string;
  if(!param){
    return res.status(400).send({ message: 'PARAM not provided.' });
  }
  const response = { success: true, data:"ho ricevuto: ".concat(param) };

  res.json(response);
});


// rotta non protetta
router.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Server is up and running!' });
});

// rotta protetta
router.get('/secure', authenticateToken, (req: Request, res: Response) => {
  res.send({ message: 'Secure Hello World' });
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
