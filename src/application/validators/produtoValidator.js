const { body } = require('express-validator');

exports.validateProduto = [
  body('nome')
    .notEmpty()
    .withMessage('O nome é obrigatório')
    .isString()
    .withMessage('O nome deve ser uma string'),
  body('descricao')
    .optional()
    .isString()
    .withMessage('A descrição deve ser uma string'),
  body('preco')
    .notEmpty()
    .withMessage('O preço é obrigatório')
    .isFloat({ gt: 0 })
    .withMessage('O preço deve ser um número maior que 0'),
];
