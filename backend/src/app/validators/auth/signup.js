import yup from 'yup'

let minDate = new Date()
minDate.setFullYear(minDate.getFullYear() - 18)

const signupRequest = yup.object({
    name: yup.string().trim().required().min(6).max(32),
    email: yup.string().trim().required().email(),
    password: yup.string().trim().required().min(6).max(32),
    birthDate: yup.date().required().max(minDate),
})

export default signupRequest
