const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Encerrando servidor...');
    server.close(() => process.exit(0));
});