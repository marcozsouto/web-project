import yup from 'yup'

const itemUpdateRequest = yup.object({
    name: yup.string().trim().optional().min(6).max(128),
    description: yup.string().trim().optional().min(2).max(128),
    price: yup.number().optional().positive(),
    image: yup.string().optional(),
})

export default itemUpdateRequest
