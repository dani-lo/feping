// import { useEffect, useState } from "react"
// import { UmbrlForm } from "../models/form"
// import { load } from "../util/storage"
// import { recalculatePremiumUat } from "../models/offer"

// export const useQuotePremiumBoost = (premium: number, refresh ?: number) => {

//     const [boosted, setBoosted] = useState(premium)
    
//     useEffect(() => {

//         const toggles = load('toogles') ?? {}
//         const numToggles = (Object.values(toggles).filter(d => !!d) ?? []).length
//         const voluntaryExcessInside  = UmbrlForm.manualRead('policy', 'buildings_coverage', 'voluntary_excess') ?? null
//         const voluntaryExcessOutside   = UmbrlForm.manualRead('policy', 'contents_coverage', 'voluntary_excess') ?? null
//         const insurances = UmbrlForm.manualRead('uat', null, 'insurances') ?? {}
//         const insurancesLoaded = {
//             ACCIDENTAL_DAMAGE_LIMITED: insurances.ACCIDENTAL_DAMAGE_LIMITED ?? false,
//             ACCIDENTAL_DAMAGE_FULL: insurances.ACCIDENTAL_DAMAGE_FULL ?? false,
//             HOME_EMERGENCY: insurances.HOME_EMERGENCY ?? false,
//             LEGAL_EXPENSES: insurances.LEGAL_EXPENSES ?? false
//         }

//         const newPremium = recalculatePremiumUat(
//             premium,
//             numToggles,
//             voluntaryExcessInside,
//             voluntaryExcessOutside,
//             insurancesLoaded
//         )
        
//         setBoosted(newPremium)
        
//     }, [refresh, premium])
    
//     return boosted
// }