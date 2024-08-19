import jwt from 'jsonwebtoken'
import User from '#models/User.js'

class Auth {
    static getToken(req) {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
            return req.headers.authorization.split(' ')[1]
        }
        return null
    }

    async authenticated(req, res, next) {
        try {
            const token = Auth.getToken(req)

            if (!token)
                return res.status(401).json({
                    auth: false,
                    message: 'No token provided.',
                })

            let uncoded = jwt.verify(
                token,
                String(process.env.ACCESS_TOKEN_PRIVATE_KEY),
                {
                    algorithms: ['HS256'],
                }
            )

            req.user = await User.findByPk(uncoded.id)
            next()
        } catch (err) {
            return res.status(401).json({
                auth: false,
                message: 'Failed to authenticate token.',
            })
        }
    }
}

export default new Auth()
