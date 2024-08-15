import yup from 'yup'

const loginRequest = yup.object({
    username: yup.string().trim().required().min(6).max(32),
    password: yup.string().trim().required().min(6).max(32),
})

export default loginRequest
