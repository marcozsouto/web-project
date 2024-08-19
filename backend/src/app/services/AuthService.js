import jwt from 'jsonwebtoken'
import User from '#models/User.js'

export default class AuthService {
    async getToken(email, password) {
        const user = await User.findOne({
            where: { email },
        })

        if (!user || !(await user.checkPassword(password))) {
            throw { message: 'Authentication failed', code: 401 }
        }

        const accessToken = jwt.sign(
            {id: user.id},
            String(process.env.ACCESS_TOKEN_PRIVATE_KEY),
            { expiresIn: '12h', algorithm: 'HS256' }
        )

        return { accessToken, expiresIn:  43200}
    }

    async create(data) {
        const user = await User.create(data)
        return user
    }
}
