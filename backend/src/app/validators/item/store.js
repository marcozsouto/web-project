import yup from 'yup'

const itemStoreRequest = yup.object({
    name: yup.string().trim().required().min(6).max(128),
    description: yup.string().trim().required().min(2).max(128),
    price: yup.number().required().positive(),
    image: yup.string().optional(),
})

export default itemStoreRequest
