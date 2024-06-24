const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { connection } = require('./configuration/database');
const { router: userRoute } = require('./routes/userRoute');
const { router: loginRoute } = require('./routes/loginRoute');
const { adminDefaultController } = require('./controller/adminDefaultController');
const { router: authenticateUsers } = require('./routes/authenticateUsersRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoute);
app.use(loginRoute);
app.use(authenticateUsers);

const port = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connection;
        console.log('Database connected successfully');

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
        adminDefaultController();
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
};

startServer();
