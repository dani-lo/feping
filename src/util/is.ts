import { validJsDate } from "./validators"

export const isTruthy = (val: boolean | string | undefined) => {
    return val !== undefined && ['on', 'true', true].includes(val)
}

export const isSameArray = (arrOne: any[], arrTwo: any[]) => {
    return arrOne.join('') === arrTwo.join('')
}

export const isMissing = (v: any) => {
    if (v === undefined || v === null) {
        return true
    }

    if (typeof v === 'string' && (v === '' || v.replace(/\s/g, '') === '')) {
        return true
    }

    return false
}

export const isNumericString = (value: string) => {
    return /^-?\d+$/.test(value);
}

export const isSameDate = (dateStrOne: string, dateStrTwo: string) => {

    const dateOne = new Date(dateStrOne)
    const dateTwo = new Date(dateStrTwo)

    return validJsDate(dateStrOne) && validJsDate(dateStrTwo) && dateOne.getTime() === dateTwo.getTime()
}

export const isObject = (obj: any) => {
    return obj === Object(obj);
  }
  