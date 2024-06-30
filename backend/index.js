const express = require('express');
const app = express();

app.use(express.json());

const { router: userRouter } = require('./router/userRouter');
const { adminDefault } = require('./controller/defaultAdminController');
const { router: loginRouter } = require('./router/loginRouter');

app.use(userRouter);
app.use(loginRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    adminDefault();
});
