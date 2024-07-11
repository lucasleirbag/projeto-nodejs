const connection = require('../database');
const Produto = require('../../domain/Produto');

class ProdutoRepository {
  async getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Produtos', (err, results) => {
        if (err) {
          return reject(err);
        }
        const produtos = results.map(row => new Produto(row.id, row.nome, row.descricao, row.preco, row.data_criacao));
        resolve(produtos);
      });
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Produtos WHERE id = ?', [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) {
          return resolve(null);
        }
        const row = results[0];
        const produto = new Produto(row.id, row.nome, row.descricao, row.preco, row.data_criacao);
        resolve(produto);
      });
    });
  }

  async create(produto) {
    return new Promise((resolve, reject) => {
      const { nome, descricao, preco } = produto;
      connection.query('INSERT INTO Produtos (nome, descricao, preco) VALUES (?, ?, ?)', [nome, descricao, preco], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  }

  async update(id, produto) {
    return new Promise((resolve, reject) => {
      const { nome, descricao, preco } = produto;
      connection.query('UPDATE Produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?', [nome, descricao, preco, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.affectedRows);
      });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Produtos WHERE id = ?', [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.affectedRows);
      });
    });
  }
}

module.exports = ProdutoRepository;
