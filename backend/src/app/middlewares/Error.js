import { ValidationError } from 'yup'

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(422).json({ success: false, errors: err.errors })
    }

    console.log(err);
    return res
        .status(err.status || 500)
        .json({ success: false, error: err.message })

    next(err)
}

export default errorHandler
