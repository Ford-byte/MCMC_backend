const express = require('express');
const app = express();

app.use(express.json());

const { router: userRouter } = require('./router/userRouter');

app.use(userRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
