const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para obter todos os produtos
router.get('/produtos', produtoController.getAllProdutos);

// Rota para obter um produto por ID
router.get('/produtos/:id', produtoController.getProdutoById);

// Rota para criar um novo produto
router.post('/produtos', produtoController.createProduto);

// Rota para atualizar um produto existente
router.put('/produtos/:id', produtoController.updateProduto);

// Rota para deletar um produto
router.delete('/produtos/:id', produtoController.deleteProduto);

module.exports = router;
