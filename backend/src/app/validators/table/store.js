import yup from 'yup'

const tableStoreRequest = yup.object({
    name: yup.string().trim().required().min(6).max(128),
})

export default tableStoreRequest
