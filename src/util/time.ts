import { PricingFormat } from "@/src/models/product"
import { validJsDate } from "./validators"

export const UmbrlDateFormat = 'YYYY-MM-DD'

export const jsDateToUmbrlString = (d: Date) => {

    if (d.toString() == 'Invalid Date' ) {
        return ''
    }
    return padDateString(d.toLocaleDateString('en-GB').split('/').reverse().join('-'))
}

export const umbrlStringToJsDate = (str: string) => {
    return new Date(str)
}

export const strDateToDayMonthYear = (str: string) => {

    if (!validJsDate(str)) {
        return null
    }
    const d = new Date(str).toISOString().split('T')[0]
    const dSplit = unpadDateString(d).split('-')

    return {
        strYear: dSplit[0],
        strMonth: dSplit[1],
        strDay: dSplit[2],
    }
}


export const padDateString = (dateString: string) => {

    const split = dateString.split('-')

    const year = split[0]
    const month = split[1].length === 1 ? `0${ split[1] }` : split[1]
    const day = split[2].length === 1 ? `0${ split[2] }` : split[2]

    return `${ year }-${ month }-${ day }`
}

export const unpadDateString = (dateString: string) => {

    const split = dateString.split('-')

    const year = split[0]
    const month = split[1][0] === '0' ? split[1].replace('0', '') : split[1]
    const day = split[2][0] === '0' ? split[2].replace('0', '') : split[2]

    return `${ year }-${ month }-${ day }`
}

export const pricingFormatDays = (numDays: number, pricingFormat: PricingFormat) => {

    const daysStr = `${ numDays } day${ numDays > 1 ? 's' : '' }`

    if (pricingFormat === 'UP_TO_DATE') {
        return `up to ${ daysStr }`
      } else if (pricingFormat === 'FROM_DATE') {
        return `from ${ daysStr }`
      }

      return daysStr
}