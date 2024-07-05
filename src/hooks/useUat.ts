import { useEffect, useState } from "react"
import { UmbrlForm } from "../models/form"

export type UatChosenPolicy = 'flex-base' | 'flex-upgrade' | 'max'  

export interface UatData {
    contentValue: number | null;
    rebuildCost:  number | null;
    contentsBoost: boolean;
    choosenPolicy: UatChosenPolicy;
}

export const useUat = (refresh ?: number) => {

    const [uat, setUat] = useState<UatData>({
        contentValue: null,
        rebuildCost: null,
        choosenPolicy: 'flex-base' as UatChosenPolicy,
        contentsBoost  : false
    })

    useEffect(() => {
        
        const contentsBoost  = UmbrlForm.manualRead('toogles', null, 'CONTENTS_LIMIT_BOOST') ?? {}
        const choosenPolicy = UmbrlForm.manualRead('uat', null, 'flexOrMax') ?? 'flex-base'

        const newUat = {
            contentValue: UmbrlForm.manualRead('policy', 'contents_coverage', 'total_contents_value') ?? null,
            rebuildCost: UmbrlForm.manualRead('policy', 'buildings_coverage', 'estimated_rebuild_cost') ?? null,
            choosenPolicy: choosenPolicy as UatChosenPolicy,
            contentsBoost
        }

        setUat(newUat)
    }, [refresh])

    return uat
}