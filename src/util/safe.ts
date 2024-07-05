import { isNumericString } from "@/src/util/is"

export const safeType = (inVal: any)  => {

    let resVal = inVal

    if (inVal === 'false') {
        resVal = false 
    } else if (inVal === 'true') {
        resVal = true
    } else if ( typeof inVal === 'string' && isNumericString(inVal)) {
        resVal = Number(inVal)
    }

    return resVal
}