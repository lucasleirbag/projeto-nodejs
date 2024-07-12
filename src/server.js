const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const produtoRoutes = require('./api/routes/produtoRoutes');
const errorHandler = require('./api/middlewares/errorHandler');

const app = express();

// Configurar CORS
app.use(cors());

app.use(bodyParser.json());
app.use('/api', produtoRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
