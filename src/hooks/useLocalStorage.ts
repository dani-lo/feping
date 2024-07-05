import { useContext, useEffect } from 'react'
import { LocalStateContext } from '../stores/contexts/localStateContext'
import { load } from '../util/storage'

const keys = [
    'policy',
    'property',
    'property_details',
    'risk_factors',
    'quote',
    'toogles',
    'main_policy_holder',
    'joint_policy_holder',
    'uat',
    'offer',
]

export const useLocalStorage = () => {

    const ctx = useContext(LocalStateContext)

    useEffect(() => {

        if (!ctx?.state && ctx?.dispatch) {

            const payload = keys.map(key => {
                return {
                    key,
                    dataTree: load(key) ?? {}
                }
            })

            ctx.dispatch({
                type: 'INIT_DATA',
                payload
            })
        }
    }, [])
}