const jwt = require('jsonwebtoken');

async function token(req, res) {
        const token = jwt.sign({}, 'secret_key');
        res.json({ success: true, token });
}

module.exports = {token};