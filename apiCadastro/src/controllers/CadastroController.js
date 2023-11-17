const CadastroService = require('../services/CadastroService');
const cadastroService = require('../services/CadastroService');

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Operações relacionadas a alunos
 */

/**
 * @swagger
 * /api/alunosCadastrados:
 *   get:
 *     summary: Obtém todos os alunos cadastrados
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos recuperada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               error: ''
 *               result:
 *                 - codigo: 1
 *                   nome_de_usuario: "usuario1"
 *                   nome: "Nome do Aluno 1"
 *                   email: "email1@example.com"
 *                   senha: "senha1"
 */


module.exports = {

    searchAll: async(req, res)=> {
        console.log('Chamando searchAll...');
        let json = {error:'', result:[]};

        let alunosCadastrados = await CadastroService.searchAll();

        for(let i in alunosCadastrados){
            json.result.push({
                codigo: alunosCadastrados[i].codigo,
                nome_de_usuario: alunosCadastrados[i].nomeUsuario,
                nome: alunosCadastrados[i].nome,
                email: alunosCadastrados[i].email,
                senha: alunosCadastrados[i].senha

            });
        }
        res.json(json);
    },
    /**
 * @swagger
 * /api/alunosCadastrados:
 *   post:
 *     summary: Cadastra um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "novoaluno@example.com"
 *             senha: "novasenha"
 *             nomeUsuario: "nomeusuario"
 *             nome: "Nome do Novo Aluno"
 *     responses:
 *       200:
 *         description: Aluno criado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               error: ''
 *               result:
 *                 codigo: 2
 *                 email: "novoaluno@example.com"
 *                 senha: "novasenha"
 *                 nomeUsuario: "nomeusuario"
 *                 nome: "Nome do Novo Aluno"
 */
    insert: async (req, res) => {
        let json = { error: '', result: {} };
    
        let { email, senha, nomeUsuario, nome } = req.body;
        console.log('Parâmetros recebidos:', email, senha, nomeUsuario, nome);
    
        if (email && senha && nomeUsuario && nome) {
          let cadastroCodigo = await CadastroService.insert(email, senha, nomeUsuario, nome);
          json.result = {
            codigo: cadastroCodigo,
            email,
            senha,
            nomeUsuario,
            nome,
          };
        } else {
          json.error = 'Campos não enviados';
        }
    
        res.json(json);
      },

    /**
     * @swagger
     * /api/alunosCadastrados/{codigo}:
     *   delete:
     *     summary: Exclui um aluno pelo código
     *     tags: [Alunos]
     *     parameters:
     *       - in: path
     *         name: codigo
     *         required: true
     *         description: Código do aluno a ser excluído
     *     responses:
     *       200:
     *         description: Aluno excluído com sucesso
     *         content:
     *           application/json:
     *             example:
     *               error: ''
     *               result: {}
     */

    delete: async(req, res) =>{
        console.log('Chamando delete...');
        let json = {error:'', result:{}}; 
        await CadastroService.delete(req.params.codigo);

        res.json(json);
    },
};


