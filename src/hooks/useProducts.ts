import { useContext, useEffect, useState } from 'react'

import { fetchProducts } from '../api/products'
import { ProductDoc } from '../models/product'
import { MetadataStateContext } from '../stores/contexts/metadataStateContext'

import { PRODUCTS } from '@/fixtures/products'

const useProducts = () => {

    const ctx = useContext(MetadataStateContext)

    useEffect(() => {
        if (!ctx?.state?.products) {

            fetchProducts().then((res) => {
            
                if (!res.hasOwnProperty('error')) {
                    
                    ctx?.dispatch({ type: "SET_PRODUCTS", payload: res as ProductDoc[] })
                    
                    return
                } else {
                    console.error(res)
                }
            })
        }

    }, [])

    return ctx?.state?.products ?? null

    // @ts-ignore
    // return PRODUCTS as ProductDoc[]
}

export { useProducts }
