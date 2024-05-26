const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);

    const [scheme, token] = authHeader.split(' ');

    if (scheme && scheme.toLowerCase() === 'bearer' && token) {
        jwt.verify(token, 'secret_key', (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {

        return res.sendStatus(401);
    }
}

module.exports = { authenticateToken };
