const express = require('express');
const router = express.Router();
const CadastroController = require('./controllers/CadastroController');

router.get('/alunosCadastrados', CadastroController.searchAll);
router.post('/alunosCadastrados', CadastroController.insert);
router.delete('/alunosCadastrados/:codigo', CadastroController.delete);

module.exports = router;
