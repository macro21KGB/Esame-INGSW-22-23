const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router()
const app = express();
const port = 3000;


const secret = 'ilMioSegretoSegretissimo';


function generateToken(userId) {
  return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
}


function verifyToken(req, res, next) {
  const token = req.headers['token'];
  if (!token) {
    return res.status(401).send({ message: 'Token not provided.' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token.' });
    }

    req.userId = decoded.id;
    next();
  });
}

// Middleware
app.use('/api', router);
router.use(express.json());


// Questa è la rotta API non protetta che genera il token
router.post('/gen', (req, res) => {
  const id = req.body['id'];
  console.log(req.body);
  if(!id){
    return res.status(401).send({ message: 'ID not provided.' });
  }
  const response = { success: true, data: generateToken(id) };

  res.json(response);
});

// rotta non protetta
router.get('/', (req, res) => {
  res.send({ message: 'Server is up and running!' });
});

// rotta protetta
router.get('/secure', verifyToken, (req, res) => {
  res.send({ message: 'Secure Hello World' });
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
