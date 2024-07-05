import { config } from "../config"
import { populateOptsFromACloud } from "../models/address"

export const fetchAddressDetails = async (/* screenDefinition: any, formDataManager: any */selectedAcloudId: string | null) => {
  try {
    if (selectedAcloudId) {

      const response = await fetch(`${config.url.addressDetails}/${selectedAcloudId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config.acloud.key,
          "x-client-id": config.acloud.clientId
        }
      })

      const parsedResponse = await response.json()

      console.log('parsedResponse', parsedResponse)
      console.log('response', response)

      if (response?.ok && parsedResponse) {

        return parsedResponse
      }

      return {
        error: true,
        messsage: parsedResponse.error?.message ?? 'An error occurred',
        errorCode: parsedResponse.error?.code ?? 'No status code was returned.'
      }
    }
  } catch (error) {
    console.error(error)

    return {
      error: true,
      message: error ?? 'An error occurred',
    }
  }
}

// export const fetchAddresses = async () => {

//   // disable form if user submits a new postcode
//   dispatch({type: 'SET_AE_SELECTED_ACLOUD_ID', payload: {selectedAcloudId: null}})

//   try {
//       const postcode = state.postcode?.replace(/\s/g, '')

//       const response = await fetch(`${ config.url.postcodeAddreses }/${postcode}?buildingNameOrNumber=${state.houseNum}`, {
//           method: "GET",
//           headers: {
//               "Content-Type": "application/json"
//           }
//       })

//       if (response.ok) {

//           const data = await response.json()

//           const addresses = data.data

//           dispatch({type: 'SET_AE_ADDRESS_ARR', payload: {addresses: addresses}})

//       }
//   } catch (error) {
//       console.error(error)
//   }
// }