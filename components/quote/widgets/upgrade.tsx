// import { TxtLinePara, TxtListItem, TxtNoteEvidence, TxtPara, TxtTitleSection, TxtTitleUmbrl } from "@/components/util/txt"
// import { ExpandableSection } from "./expandableSection"
// import { formatCurrency } from "@/src/util/currency"
// import { UatData } from "@/src/hooks/useUat"
// import { ProductId } from "@/src/models/product"
// import { UmbrlForm } from "@/src/models/form"
// import { useAtom } from "jotai"
// import { uiStateRefreshAtom } from "@/src/stores/jotai/uiState"
// import { useContext } from "react"
// import { LocalStateContext } from "@/src/stores/contexts/localStateContext"

// export const UpgradeToFlexComponentInside =  ({ udata }: { udata: UatData}) => {

//     const localCtx = useContext(LocalStateContext)

//     const currCoverages = CurrUserCover_UAT(udata)

//     const [refresh, setRefresh] = useAtom(uiStateRefreshAtom)

//     return <div className="upgrade-widget">
//         <TxtNoteEvidence 
//             txt="Sorry, you’re over your cover limit" 
//             icon="fa fa-exclamation" 
//             isError={ true }
//         />
//         <TxtTitleSection 
//             txt="High-risk items cover limit"
//         />
//         <TxtPara txt={ `Your high-risk items are insured for up to ${ formatCurrency(currCoverages.highRiskItems) }. To cover everything, you need to boost your high-risk items limit.` } />
//         <div 
//             className="upgrade-widget-btn fxrow"
//             onClick={ () => {
//                 if (localCtx?.dispatch) {
//                     UmbrlForm.manualSave(localCtx?.dispatch, 'toogles', null, 'CONTENTS_LIMIT_BOOST', true)
//                     setRefresh(refresh + 1)
//                 }
//             }}
//         >
//             <TxtNoteEvidence txt={ `Boost your high-risk items cover limit to ${ formatCurrency(CoverInsideLimit[ProductId.FLEX]) }` } />
//             <TxtNoteEvidence txt={ `${ formatCurrency(15.95) }` } />
//         </div>
//         <ExpandableSection 
//             aria_label=""
//             title="See all features"
//             subtitle={ null }
//             body={[]}
//             >
//                 <ul className="list-check">
//                     <TxtListItem txt="Unlimited building cover;" icon="fa fa-check-circle" />
//                     <TxtListItem txt={`Contents ver up to${  formatCurrency(CoverInsideLimit[ProductId.FLEX]) } `} icon="fa fa-check-circle" />
//                     <TxtListItem txt="24/7 Claims emergency support" icon="fa fa-check-circle" />
//                 </ul>
//         </ExpandableSection>
//     </div>
// }

// export const UpgradeToFlexComponentOutside =  ({ udata }: { udata: UatData}) => {

//     const currCoverages = CurrUserCover_UAT(udata)

//     const [refresh, setRefresh] = useAtom(uiStateRefreshAtom)

//     const localCtx = useContext(LocalStateContext)

//     return <div className="upgrade-widget">
//         <TxtNoteEvidence 
//             txt="Sorry, you’re over your cover limit" 
//             icon="fa fa-exclamation" 
//             isError={ true }
//         />
//         <TxtTitleSection 
//             txt="Personal possessions limit"
//         />
//         <TxtPara txt={ ` Right now, your personal possessions are covered for up to ${ currCoverages.personalPossessions } when you’re away from home. Boost your limit to get cover for up to ${ CoverOutsideLimit[ProductId.FLEX] }. ` } />
//         <div 
//             className="upgrade-widget-btn fxrow"
//             onClick={ () => {

//                 if (localCtx?.dispatch) {
//                     UmbrlForm.manualSave(localCtx?.dispatch, 'toogles', null, 'CONTENTS_LIMIT_BOOST', true)
//                     setRefresh(refresh + 1)
//                 }
//             }}
//         >
//             <TxtNoteEvidence txt={ `Boost your high-risk items cover limit to ${ CoverOutsideLimit[ProductId.FLEX] }.` } />
//             <TxtNoteEvidence txt={ `${ formatCurrency(15.95) }` } />
//         </div>
//         <TxtPara txt="You’ll also get 40 days’ unoccupancy period cover, plus other great benefits." />
//         <ExpandableSection 
//             aria_label=""
//             title="See all features"
//             subtitle={ null }
//             body={[]}
//             >
//                 <ul className="list-check">
//                     <TxtListItem txt="Unlimited building cover;" icon="fa fa-check-circle" />
//                     <TxtListItem txt={`Contents ver up to${ CoverOutsideLimit[ProductId.FLEX] } `} icon="fa fa-check-circle" />
//                     <TxtListItem txt="24/7 Claims emergency support" icon="fa fa-check-circle" />
//                 </ul>
//         </ExpandableSection>
//     </div>

// }

// export const UpgradeToMaxComponentInside = ({ udata }: { udata: UatData}) => {
    

//     const currCoverages = CurrUserCover_UAT(udata)

//     const [refresh, setRefresh] = useAtom(uiStateRefreshAtom)

//     const localCtx = useContext(LocalStateContext)

//     return <div className="upgrade-widget">
//         <TxtNoteEvidence 
//             txt="Some of your items aren’t protected." 
//             icon="fa fa-exclamation" 
//             isError={ true }
//         />
//         <TxtLinePara txt={ `Right now, your High Risk Items are covered for up to ${ formatCurrency(currCoverages.highRiskItems) }. Boost your limit to get cover for up to ${ formatCurrency(CoverInsideLimit[ProductId.MAX]) }.` } />
//         <div>
//             <TxtTitleUmbrl txt="UMBRL Max" />
//             <TxtPara txt="Get our maximum, all-round protection." />
//             <TxtNoteEvidence txt={ `Up to  ${ formatCurrency(CoverInsideLimit[ProductId.MAX]) } high risk items cover, plus:` } />
//             <ul className="list-check">
//                     <TxtListItem txt="Unlimited building cover;" icon="fa fa-check-circle" />
//                     <TxtListItem txt={ `Contents cover up to  ${ formatCurrency(CoverOutsideLimit[ProductId.MAX]) }`} icon="fa fa-check-circle" />
//                     <TxtListItem txt="24/7 Claims emergency support" icon="fa fa-check-circle" />
//             </ul>
//             <div 
//                 className="btn-para-widget"
//                 onClick={ () => {

//                     if (localCtx?.dispatch) {
//                         UmbrlForm.manualSave(localCtx?.dispatch, 'uat', null, 'flexOrMax', 'max')
//                         setRefresh(refresh + 1)
//                     }
//                 }}
//             >
//                 <TxtNoteEvidence txt={ `Boost your high-risk items cover limit to ${ formatCurrency(CoverInsideLimit[ProductId.MAX]) }` } />
//                 <TxtNoteEvidence txt={ `${ formatCurrency(15.95) }` } />
//             </div>
            

//         </div>
//     </div>
// }

// export const UpgradeToMaxComponentOutside = ({ udata }: { udata: UatData}) => {
    

//     const currCoverages = CurrUserCover_UAT(udata)

//     const [refresh, setRefresh] = useAtom(uiStateRefreshAtom)
    
//     const localCtx = useContext(LocalStateContext)

//     return <div className="upgrade-widget">
//         <TxtNoteEvidence 
//             txt="Some of your items aren’t protected." 
//             icon="fa fa-exclamation" 
//             isError={ true }
//         />
//         <TxtLinePara txt={ `Right now, your high-risk items are covered for up to  ${ formatCurrency(currCoverages.personalPossessions) } when you’re away from home. Switch to umbrl max to get cover for up to${formatCurrency(CoverOutsideLimit[ProductId.MAX]) }.` } />
//         <div>
//             <TxtTitleUmbrl txt="UMBRL Max" />
//             <TxtPara txt="Get our maximum, all-round protection." />
//             <TxtNoteEvidence txt={ `Up to ${ formatCurrency(CoverOutsideLimit[ProductId.MAX]) } away-from-home cover, plus:` } />
//             <ul className="list-check">
//                     <TxtListItem txt="Unlimited building cover;" icon="fa fa-check-circle" />
//                     <TxtListItem txt={`Contents cover up to ${ formatCurrency(CoverOutsideLimit[ProductId.MAX]) }`} icon="fa fa-check-circle" />
//                     <TxtListItem txt="24/7 Claims emergency support" icon="fa fa-check-circle" />
//             </ul>
//             <div 
//                 className="btn-para-widget"
//                 onClick={ () => {

//                     if (localCtx?.dispatch) {
//                         UmbrlForm.manualSave(localCtx?.dispatch, 'uat', null, 'flexOrMax', 'max')
//                         setRefresh(refresh + 1)
//                     }
//                 }}
//             >
//                 <TxtNoteEvidence txt={ `Boost your high-risk items cover limit to ${ CoverOutsideLimit[ProductId.MAX] }` } />
//                 <TxtNoteEvidence txt={ `${ formatCurrency(15.95) }` } />
//             </div>
            

//         </div>
//     </div>
// }

// export const UpgradeRefusalComponent = ({ forValuables }: { forValuables: 'outside' | 'inside' }) => {
//     return <div className="upgrade-widget non-upgradable">
//         <TxtNoteEvidence txt={
//             forValuables === 'outside' ?
//                 'We are sorry but your high risk items total is too high for any of our policies':
//                 'We are sorry but your personal possessions total is too high for any of our policie'
//         } />
//     </div>
// }