const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: {
        message: 'Ocorreu um erro interno no servidor',
      },
    });
  };
  
  module.exports = errorHandler;
  