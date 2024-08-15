import AuthService from '#services/AuthService.js'
import loginRequest from '#validators/auth/login.js'
import signupRequest from '#validators/auth/signup.js'

class AuthController {
    authService = new AuthService()

    getToken = async (req, res, next) => {
        try {
            const data = await loginRequest.validate(req.body)
            const result = await this.authService.getToken(
                data.username,
                data.password
            )

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    signup = async (req, res, next) => {
        try {
            const result = await this.authService.create(
                await signupRequest.validate(req.body)
            )

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController()
