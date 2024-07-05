import { config } from "../config"
import { ProductDoc } from "../models/product"
import { UmbrlError } from "../types"

export const fetchProducts = async(): Promise<ProductDoc[] | UmbrlError> => {

  try {
      const response = await fetch(config.url.products, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      })

      const parsedResponse = await response.json()
      if (response.ok) {

        return parsedResponse.data as unknown as ProductDoc[];

      } else {
          return {
              error: true,
              // @ts-ignore
              message: parsedResponse.error?.message ?? 'An error occurred',
              errorCode: parsedResponse.error?.code ?? 'No status code was returned.'
          }

      }
  } catch (error) {

        return {
            error: true,
            message: 'An error occurred',
            errorCode: 'No status code was returned.'
        }
  }
}

const enrichFlexProduct = () => {
    
}