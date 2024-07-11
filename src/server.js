const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configuração do Helmet para ajustar a CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://projeto-nodejs-kw74.vercel.app"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

app.use(cors());
app.use(express.json());

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// Suas rotas aqui

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
