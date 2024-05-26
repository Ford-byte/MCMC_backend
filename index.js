const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { connection } = require('./configuration/database');
const { router: adminRoute } = require('./routes/adminRoute');
const { router: loginRoute } = require('./routes/loginRoute');
const { router: keeperRoute } = require('./routes/keeperRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use(adminRoute);
app.use(loginRoute);
app.use(keeperRoute);

const port = process.env.PORT;

const startServer = async () => {
    try {
        await connection;
        console.log('Database connected successfully');

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
};

startServer();
