import {
    QuoteScreen,
    QuoteScreenId,
    StaticQuoteJourneyDefinition
} from "@/src/stores/staticQuoteJourneyDefinition"

import { QuoteScreenStartComponent } from "@/components/quote/screens/quick/quoteScreenPolicy"
import { QuoteScreenPersonalComponent } from "@/components/quote/screens/quick/quoteScreenPersonal"
import { QuoteScreenPropertyComponent } from "@/components/quote/screens/quick/quoteScreenProperty"

import { ScreenMode } from "@/src/types"

import { UmbrlForm } from "@/src/models/form"
import { Accordion, AccordionItem } from "@nextui-org/react"
import { AccordionItemPillComponent, AccordionItemTitleComponent } from "./accordionItemTitle"
import { useContext, useState } from "react"
import { Patterns } from "@/src/util/validators"
import { LocalState, LocalStateContext, LocalStateDispatch } from "@/src/stores/contexts/localStateContext"
import { SkeletonsComponent } from "./ghost"
import { QuoteScreenCoverStartDateComponent } from "../screens/quick/quoteScreenStartDate"
import { TxtPara, TxtTitleSection } from "@/components/util/txt"
import { PillComponent } from "./pill"

const loadReviewScreenComponent = (
    screenId: QuoteScreenId,
    titleKeys: string[],
    localState: LocalState | null,
    localDispatch: LocalStateDispatch | null) => {

    switch (screenId) {
        case QuoteScreenId.QUICK_QUOTE_POLICY:

            const screenDefinitionPolicy = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_POLICY) as QuoteScreen

            const dataManagerPolicy = new UmbrlForm(
                screenDefinitionPolicy.opts,
                screenDefinitionPolicy.apisection,
                localState,
                localDispatch
            )

            const titleArrPolicy = titleKeys.map(k => {

                if (screenDefinitionPolicy.opts) {
                    const opt = screenDefinitionPolicy.opts.find(o => o.apikey === k)

                    if (opt) {
                        return dataManagerPolicy.keyVal(opt.apikey)
                    }
                }
                return null
            })

            // titleArrPolicy.unshift('Cover', 'type')

            return {
                component: <QuoteScreenStartComponent
                    screenDefinition={screenDefinitionPolicy}
                    mode={ScreenMode.REVIEW}
                />,
                title: titleArrPolicy,
                expandedTitle: 'What type of cover do you need?'
            }
        case QuoteScreenId.QUICK_QUOTE_PERSONAL:

            const screenDefinitionPersonal = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_PERSONAL) as QuoteScreen

            const dataManagerPersonal = new UmbrlForm(
                screenDefinitionPersonal.opts,
                screenDefinitionPersonal.apisection,
                localState,
                localDispatch
            )

            const titleArrPersonal = titleKeys.map(k => {

                if (screenDefinitionPersonal.opts) {

                    const opt = screenDefinitionPersonal.opts.find(o => o.apikey === k)

                    if (opt) {
                        return dataManagerPersonal.keyVal(opt.apikey)
                    }
                }
                return null
            })
            const titleArrPersonalDateFormatted = titleArrPersonal.map(t => {
                if (Patterns.fullDate.test(t)) {
                    const formatted = t.split('-').reverse().join('/')
                    return formatted
                }
                return t;
            })

            return {
                component: <QuoteScreenPersonalComponent
                    screenDefinition={screenDefinitionPersonal}
                    mode={ScreenMode.REVIEW}
                />,
                title: titleArrPersonalDateFormatted,
                expandedTitle: 'Tell us about yourself.'
            }

        case QuoteScreenId.QUICK_QUOTE_PROPERTY:

            const screenDefinitionProperty = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_PROPERTY) as QuoteScreen

            const dataManagerProperty = new UmbrlForm(
                screenDefinitionProperty.opts,
                screenDefinitionProperty.apisection,
                localState,
                localDispatch
            )

            const titleArrProperty = titleKeys.map(k => {

                if (screenDefinitionProperty.opts) {
                    const opt = screenDefinitionProperty.opts.find(o => o.apikey === k)

                    if (opt) {
                        return dataManagerProperty.keyVal(opt.apikey)
                    }
                }
                return null
            })

            return {
                component: <QuoteScreenPropertyComponent
                    screenDefinition={screenDefinitionProperty}
                    mode={ScreenMode.REVIEW}
                />,
                title: titleArrProperty,
                expandedTitle: 'Where is your home?'
            }

        case QuoteScreenId.QUICK_QUOTE_STARTDATE:

            const screenDefinitionStartdate = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_STARTDATE) as QuoteScreen

            const dataManagerStartdate = new UmbrlForm(
                screenDefinitionStartdate.opts,
                screenDefinitionStartdate.apisection,
                localState,
                localDispatch
            )

            const titleArrStartdate = titleKeys.map(k => {

                if (screenDefinitionStartdate.opts) {
                    const opt = screenDefinitionStartdate.opts.find(o => o.apikey === k)

                    if (opt) {
                        return dataManagerStartdate.keyVal(opt.apikey)
                    }
                }
                return null
            })
            titleArrStartdate.unshift('Cover', 'Start Date')

            const titleArrStartDateFormatted = titleArrStartdate.map(t => {
                if (Patterns.fullDate.test(t)) {
                    const formatted = t.split('-').reverse().join('/')
                    return formatted
                }
                return t;
            })

            return {
                component: <QuoteScreenCoverStartDateComponent
                    screenDefinition={screenDefinitionStartdate}
                    mode={ScreenMode.REVIEW}
                />,
                title: titleArrStartDateFormatted,
                expandedTitle: 'When should your cover start?'
            }
    }
}

export const ReviewAccordionComponent = ({ reviewscreens, disableAnimation }: {
    reviewscreens: {
        sid: QuoteScreenId;
        titleKeys: string[];
    }[];
    disableAnimation?: boolean;
}) => {

    const localCtx = useContext(LocalStateContext)

    const [reviewed, setReviewed] = useState<string | null>(null)

    return <div className="review-accordion">
        <SkeletonsComponent on={!localCtx?.state}>
            {/* <Accordion disableAnimation={disableAnimation}> */}
                {
                    reviewscreens.map(rs => {

                        const loadedComponentAndText = loadReviewScreenComponent(
                            rs.sid,
                            rs.titleKeys,
                            localCtx?.state ?? null,
                            localCtx?.dispatch ?? null
                        )

                        const textArr = loadedComponentAndText?.title.reduce((acc, curr, i) => {

                            if (i === 1) {
                                acc[0] = acc[0] + ' ' + curr
                            } else {
                                acc.push(curr)
                            }
                            return acc
                        }, [])

                        return <>
                            <PillComponent
                                key={ rs.sid  }
                                title={ textArr[0]?.replace(/-/g, ' ') || '' }
                                icons={{
                                    title: 'fa fa-check-circle',
                                    action: 'fa fa-pen'
                                }}
                                onAction={ () => setReviewed(reviewed === rs.sid ? null : rs.sid) }
                                expanded={  reviewed === rs.sid }
                            >
                            {
                                textArr.map((txt: string, i: number) => {
                                    return i > 0 ? <TxtPara key={ txt } txt={ txt?.replace(/-/g, ' ') || '' } /> : null
                                })
                            }
                            </PillComponent>
                            {
                                reviewed === rs.sid && loadedComponentAndText ? loadedComponentAndText.component : null
                            }
                        </>

                        // return reviewed === rs.sid && loadedComponentAndText ? loadedComponentAndText.component : null
                        //     <div
                        //         className="block-accordion-edit"
                        //         data-testid={`review-screen-edit-block-${rs.sid}`}
                        //     >
                        //         <div className="fxrow">
                        //             <TxtTitleSection 
                        //                 txt={ loadedComponentAndText?.expandedTitle } 
                        //             />
                        //             <div className="action-icon">
                        //                 <i className="fa fa-times" onClick={ () => setReviewed(reviewed === rs.sid ? null : rs.sid)} />
                        //             </div>
                        //         </div>
                                
                        //         {
                        //             loadedComponentAndText?.component
                        //         }
                        //     </div>:
                        //     <AccordionItemPillComponent
                        //         textArr={textArr}
                        //         uid={rs.sid}
                        //         onSelect={ () => setReviewed(reviewed === rs.sid ? null : rs.sid)}
                        //     />

                            
                            // return <AccordionItem
                            //     key={rs.sid}
                            //     indicator={<i aria-hidden className="fa fa-chevron-right" />}
                            //     startContent={
                            //         <AccordionItemTitleComponent
                            //             textArr={textArr}
                            //             uid={rs.sid}
                            //         />
                            //     }>
                            //     <div
                            //         className="edit-block"
                            //         data-testid={`review-screen-edit-block-${rs.sid}`}
                            //     >
                            //         {
                            //             loadedComponentAndText?.component
                            //         }
                            //     </div>
                            // </AccordionItem>
                    })
                }
            {/* </Accordion> */}
        </SkeletonsComponent>
    </div>
}

