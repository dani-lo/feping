import { useContext, useEffect, useState } from 'react'
import { MetadataStateContext } from '@/src/stores/contexts/metadataStateContext'
import { config } from '@/src/config'
import { useQuery } from '@tanstack/react-query'
import { fetchEnums } from '../api/metadata'

const useMetadata = () => {

    // const ctx = useContext(MetadataStateContext)

    const { data } = useQuery({
        queryKey: ['metadata'],
        queryFn: fetchEnums,
        staleTime: Infinity
    })

    const metadata = data && !('error' in data) ? data : null

    console.log(metadata)
    // useEffect(() => {

    //     const fetchEnums = async() => {

    //         try {
    //             const response = await fetch(config.url.metadata, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             })

    //             if (response.ok) {
    //                 const data = await response.json()
    //                 ctx?.dispatch({ type: "SET_ENUMS", payload: data.data})

    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     if (!ctx?.state?.enums) {
    //         fetchEnums()
    //     }
    // }, [])

    // return ctx?.state?.enums ?? null
    return metadata
}

export { useMetadata }
