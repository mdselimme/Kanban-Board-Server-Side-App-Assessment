const app = require('./src/app/app');
const PORT = process.env.PORT || 5000;



let server;

const bootstrap = async () => {
    server = app.listen(PORT, () => {
        console.log(`Server running is port number http://localhost:${PORT}`);
    })
};

bootstrap();