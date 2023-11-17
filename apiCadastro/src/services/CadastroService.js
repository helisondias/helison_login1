const db = require("../db");

module.exports = {
  searchAll: async () => {
    return new Promise((accept, reject) => {
      const query = 'SELECT * FROM alunosCadastrados';
      db.query(query, (error, results) => {
        if (error) {
          console.error('Erro ao obter todos os alunos do banco de dados:', error);
          reject(error);
      } else {
          accept(results);
      }
      });
    });
  },

  insert: async (email, senha, nomeUsuario, nome) => {
    return new Promise((accept, reject) => {
      console.log('Parâmetros recebidos no serviço:', email, senha, nomeUsuario, nome);

      const query = "INSERT INTO alunosCadastrados (email, senha, nomeUsuario, nome) VALUES (?, ?, ?, ?)";
      console.log('Query SQL:', query);
      db.query(query, [email, senha, nomeUsuario, nome], (error, results) => {
        if (error) {
          console.error('Erro ao inserir aluno no banco de dados:', error);
          reject(error);
        } else {
          accept(results.insertId);
        }
      });
    });
  },

  delete: (codigo) => {
    return new Promise((accept, reject) => {
      db.query("DELETE FROM alunosCadastrados WHERE codigo = ?", [codigo], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        accept(results);
      });
    });
  },
};
