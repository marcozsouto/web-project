import yup from 'yup'

const tableUpdateRequest = yup.object({
    name: yup.string().optional().trim().min(6).max(128),
})

export default tableUpdateRequest
