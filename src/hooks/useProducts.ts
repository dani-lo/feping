import { useContext, useEffect, useState } from 'react'

import { fetchProducts } from '../api/products'
import { Product, ProductDoc } from '../models/product'
import { MetadataStateContext } from '../stores/contexts/metadataStateContext'

import { PRODUCTS } from '@/fixtures/products'
import { useQuery } from '@tanstack/react-query'

const useProducts = () => {

    // const ctx = useContext(MetadataStateContext)

    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: Infinity
    })

    const products = data && !('error' in data) ? data.map(p => new Product(p)) : null

    console.log('products', products)

    // useEffect(() => {
    //     if (!ctx?.state?.products) {

    //         fetchProducts().then((res) => {

    //             if (!res.hasOwnProperty('error')) {

    //                 ctx?.dispatch({ type: "SET_PRODUCTS", payload: res as ProductDoc[] })

    //                 return
    //             } else {
    //                 console.error(res)
    //             }
    //         })
    //     }

    // }, [])
    // return PRODUCTS
    return products /* as unknown as Product[] */


    // return products ?? null

    // @ts-ignore
    // return PRODUCTS as ProductDoc[]
}

export { useProducts }
