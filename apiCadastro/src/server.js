require('dotenv').config({ path: 'variaveis.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swagger = require('./swagger');

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes');
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em: https://localhost:${PORT}`);
});

swagger(app);
