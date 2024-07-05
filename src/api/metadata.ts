import { config } from "../config"

export const fetchEnums = async () => {

  try {
    const response = await fetch(config.url.metadata, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const parsedResponse = await response.json()
    if (response.ok && parsedResponse.data) {
      // ctx?.dispatch({ type: "SET_ENUMS", payload: data.data })
      return parsedResponse.data
    }

    return {
      error: true,
      message: parsedResponse.error?.message ?? 'An error occurred',
      errorCode: parsedResponse.error?.code ?? 'No status code was returned.'
    }

  } catch (error) {
    console.error(error)

    return {
      error: true,
      message: error ?? 'An error occurred',
    }
  }
}
