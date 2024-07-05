import { useContext, useEffect, useState } from 'react'
import { MetadataStateContext } from '@/src/stores/contexts/metadataStateContext'
import { config } from '@/src/config'

const useMetadata = () => {

    const ctx = useContext(MetadataStateContext)

    useEffect(() => {

        const fetchEnums = async() => {

            try {
                const response = await fetch(config.url.metadata, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
    
                if (response.ok) {
                    const data = await response.json()
                    ctx?.dispatch({ type: "SET_ENUMS", payload: data.data})
    
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (!ctx?.state?.enums) {
            fetchEnums()
        }
    }, [])
    
    return ctx?.state?.enums ?? null
}

export { useMetadata }
