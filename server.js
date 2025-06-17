const { default: mongoose } = require('mongoose');
const app = require('./src/app/app');
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();

let server;

const mainRunningServer = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8z1noya.mongodb.net/kanban-board?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Database Connected');
        server = app.listen(PORT, () => {
            console.log(`Server running is port number http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
};

mainRunningServer();