import { LocalState } from "../stores/contexts/localStateContext";

export const propertyDescConfirm = (localState: LocalState | null, isResident: boolean) => {

    if (!localState) {
        return ''
    }

    return `${ propertyString(localState) } is ${ isResident ? '' : 'NOT' } your main address.`
}

export const propertyString = (localState: LocalState | null) => {

    if (!localState) {
        return ''
    }
    // @ts-ignore
    const propertyAddress = localState?.property?.address

    return `${ propertyAddress.premise_number } ${ propertyAddress.street}, ${ propertyAddress.town } `
}