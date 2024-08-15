import bcrypt from 'bcrypt'

export default class Encrpyt {
    static async encrypt(value) {
        return new Promise(async (resolve) => {
            const salt = await bcrypt.genSalt(10)
            value = await bcrypt.hash(value, salt)
            resolve(value)
        })
    }

    static async compare(first, second) {
        return new Promise(async (resolve) => {
            const validPassword = await bcrypt.compare(first, second)
            resolve(validPassword)
        })
    }
}
