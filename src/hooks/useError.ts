import { useEffect, useState } from 'react'
import {
    ErrorGenericError,
    ErrorMalformedError,
    ErrorTooManyRooms,
    ErrorUserUnderage,
    ErrorAddressNotFound,
    ErrorBadRequest,
    ErrorBusinessRuleValidation,
    ErrorInternalServerError,
    ErrorNotFound,
    ErrorUnauthorized,
    ErrorUnderwritingGuideline,
    UmbrlError
} from '../util/customError';

const useError = () => {

    // err is the error status code
    const [err, setErr] = useState<{ code: string; message: string } | null>(null)

    useEffect(() => {

        if (err !== null) {

            const errCode = isNaN(parseInt(`${ err.code }`)) ? '404' : `${ err.code }`
            // throw new ErrorUserUnderage()
            setErr(null)

            switch (errCode) {
                case '400' :
                    throw new ErrorBadRequest(err.message)
                case '401' :
                    throw new ErrorUnauthorized(err.message)
                case '404' :
                    throw new ErrorNotFound(err.message)
                case '412' :
                    throw new ErrorUserUnderage(err.message)
                case '412' :
                    throw new ErrorBusinessRuleValidation(err.message)
                case '412' :
                    throw new ErrorUnderwritingGuideline(err.message)
                case '422' :
                    throw new ErrorTooManyRooms(err.message)
                case '422' :
                    throw new ErrorMalformedError(err.message)
                case '500' :
                    throw new ErrorInternalServerError(err.message)
                case '503' :
                    throw new ErrorInternalServerError(err.message)
            }

            throw new ErrorGenericError()
        }
    }, [err, setErr])

    return [err, setErr]
}

export { useError }
