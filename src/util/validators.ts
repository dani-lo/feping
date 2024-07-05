import { QuoteOptValidationRule } from "../stores/staticQuoteJourneyDefinition";

export const Patterns = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    date: /[0-9]{2}-[0-9]{2}-[0-9]{4}/g,
    postcode: /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/g,
    houseOrFlatAlphnum: /^\d+[a-z]?$/i,
    alphaText: /^([a-z]+(-(?!-)|\s|[a-z]+)+[a-z\s]+)$/i,
    dateDay: /^(0[1-9]|[12]\d|3[01]|[1-9])$/,
    dateMonth: /^(0[1-9]|1[0-2]|[1-9])$/,
    dateYear: /^(19\d{2}|20\d{2})$/,
    fullDate: /^(19\d{2}|20\d{2})-(0[1-9]|1[0-2]|[1-9])-(0[1-9]|[12]\d|3[01]|[1-9])$/
}

export const validDateDay = (day: string | null) => {
    if (day == null) return false;
    const re = new RegExp(Patterns.dateDay)

    return re.test(day)
}

export const validDateMonth = (month: string | null) => {
    if (month === null) return false
    const re = new RegExp(Patterns.dateMonth)

    return re.test(month)
}

export const validDateYear = (year: string | null) => {
    if (year === null) return false
    const re = new RegExp(Patterns.dateYear)

    return re.test(year)
}

export const validEmail = (email: string) => {
    const re = new RegExp(Patterns.email)

    return re.test(email)
}

export const validJsDate = (dateStr: string) => {

    const date = new Date(dateStr)

    return date.getTime() === date.getTime()
}

export const validPostcode = (postcode: string) => {

    const re = new RegExp(Patterns.postcode)

    return !!re.test(postcode.replace(/\s/g, ''))
}

export const validString = (str: string) => {
    return str?.length > 0
}

export const validAlphaString = (str: string) => {
    // return str?.length > 0
    const re = new RegExp(Patterns.alphaText)

    return !!re.test(str)
}

export const validNumber = (num: number | string) => {
    const parsed = parseFloat(`${num}`)

    return !isNaN(parsed)
}

export const customDateComponentValidation = (
    date: Date,
    validationRule: QuoteOptValidationRule,

) => {
    if (validationRule === QuoteOptValidationRule.NEXT_30_DAYS) {
        const oneMonth = 30 * 24 * 60 * 60 * 1000
        const next30Days = new Date(Date.now() + oneMonth).getTime()
        const selectedDateTime = date.getTime()

        const validTime = ((next30Days - selectedDateTime) < oneMonth && next30Days >= selectedDateTime)

        return validTime


    } else if (validationRule === QuoteOptValidationRule.DOB) {

        //TODO: Add validation for DOB
        return true;
    }
}