const { validationResult } = require('express-validator');
const ProdutoRepository = require('../../infrastructure/repositories/ProdutoRepository.js');
const Produto = require('../../domain/Produto');
const { validateProduto } = require('../validators/produtoValidator');

const produtoRepository = new ProdutoRepository();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Controlador para obter todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await produtoRepository.getAll();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controlador para obter um produto por ID
exports.getProdutoById = async (req, res) => {
  try {
    const produto = await produtoRepository.getById(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controlador para criar um novo produto
exports.createProduto = [
  validateProduto,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { nome, descricao, preco } = req.body;
      const novoProduto = new Produto(null, nome, descricao, preco);
      const produtoId = await produtoRepository.create(novoProduto);
      res.status(201).json({ id: produtoId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Controlador para atualizar um produto existente
exports.updateProduto = [
  validateProduto,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { nome, descricao, preco } = req.body;
      const produto = new Produto(null, nome, descricao, preco);
      const rowsAffected = await produtoRepository.update(req.params.id, produto);
      if (rowsAffected === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.status(200).json({ message: 'Produto atualizado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Controlador para deletar um produto
exports.deleteProduto = async (req, res) => {
  try {
    const rowsAffected = await produtoRepository.delete(req.params.id);
    if (rowsAffected === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
