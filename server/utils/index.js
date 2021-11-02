const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {

    createToken({id, email, role}) {
        return jwt.sign(
            {id, email, role},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
    },

    verifyToken(token) {
        return jwt.verify(
            token,
            process.env.SECRET_KEY,
            {expiresIn: '24h'})
    },

    hashPassword(password) { return bcrypt.hashSync(password, 10) },

    comparePassword(password, hash) { return bcrypt.compareSync(password, hash)}
}


