import express, { Request, Response, NextFunction, Router } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Utente,Ruolo } from './classi-ts/utente'
const app = express();
const router = Router();
const port = 3000;

const secret = 'ilMioSegretoSegretissimo';

interface Credentials {
  username : string,
  password : string
}

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


function verifyToken(token: string): Promise<TokenPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }

      const payload = decoded as TokenPayload;
      resolve(payload);
    });
  });
}

// Middleware
app.use('/api', router);
router.use(express.json());


router.post('/login', (req: Request, res: Response) => {
  if (!req.headers.authorization)
    return res.status(400).send({ message: 'Credentials not provided.' });

  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')
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

  res.json(response);
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
router.get('/secure', verifyToken, (req: Request, res: Response) => {
  res.send({ message: 'Secure Hello World' });
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
