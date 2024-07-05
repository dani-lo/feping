// import { Thing } from './thing'
// import { QuoteOffer } from "./offer"
// import { ProductId } from "./product"
// import { UatData } from '../hooks/useUat'

// export const CurrUserCover_UAT = (uatData: UatData) => {

//     let highRiskItems = 12000
//     let personalPossessions = 2000

//     if (uatData.choosenPolicy === 'max') {
//         highRiskItems = CoverInsideLimit[ProductId.MAX]
//         personalPossessions = CoverOutsideLimit[ProductId.MAX]
//     } else if (uatData.contentsBoost) {
//         highRiskItems = CoverInsideLimit[ProductId.FLEX]
//         personalPossessions = CoverOutsideLimit[ProductId.FLEX]
//     } 

//     return {
//         highRiskItems,
//         personalPossessions
//     }
    
// }
    

// export const CoverInsideLimit = {
//     [ProductId.FLEX]: 20000,
//     [ProductId.MAX]: 40000,
// }

// export const CoverOutsideLimit = {
//     [ProductId.FLEX]: 5000,
//     [ProductId.MAX]: 10000,
// }

// export const OverallCtValUpgrade = 100000

// export class CoverageInspector {

//     currInsideCoverLimit: number
//     currOutsideCoverLimit: number
//     things: Thing[] = []

//     constructor (
//         currInsideCoverLimit: number, 
//         currOutsideCoverLimit: number
//     ) {
//         this.currInsideCoverLimit = currInsideCoverLimit
//         this.currOutsideCoverLimit = currOutsideCoverLimit
//     }

//     setThings (t: Thing[]) {
//         this.things = t
//     }

//     thingsTotal (outside: boolean) {

//         const tot = this.things.reduce((acc, curr) => {

//             if (outside && !curr.insideAndOutside) {
//                 return acc
//             }

//             return acc + (curr.value ?? 0)
//         }, 0)

//         return tot
//     }

//     isOverCurrInside () {
//         return this.thingsTotal(false) > this.currInsideCoverLimit
//     }

//     isOverCurrOutside () {
//         return this.thingsTotal(true) > this.currOutsideCoverLimit
//     }

//     upgradeInsideTo () {

//         const tot = this.thingsTotal(false)

//         if (tot <= CoverInsideLimit[ProductId.FLEX]) {
//             return ProductId.FLEX
//         } else if (tot <= CoverInsideLimit[ProductId.MAX]) {
//             return ProductId.MAX
//         }

//         return null
//     }

//     upgradeOutsideTo () {

//         const tot = this.thingsTotal(true)

//         if (tot <= CoverOutsideLimit[ProductId.FLEX]) {
//             return ProductId.FLEX
//         } else if (tot <= CoverOutsideLimit[ProductId.MAX]) {
//             return ProductId.MAX
//         }

//         return null
//     }

// }