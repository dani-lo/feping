'use client'

import { useContext, useEffect, useState } from "react"

import { QuoteScreen, QuoteOpt } from "@/src/stores/staticQuoteJourneyDefinition"

import { twNote, twParagraph } from "@/src/styles/text.tailwind"

import { Checkbox, CheckboxGroup, Progress, Spinner } from "@nextui-org/react"
import Image from "next/image"
import { ProgressBarComponent } from "@/components/quote/widgets/progress"
import { TxtListItem, TxtNoteEvidence, TxtPara, TxtTitlePage, TxtTitleSub, TxtTitleUmbrlJumbo } from "@/components/util/txt"
import { Checkmark } from "../../widgets/checkmark"
import { LoadingSection } from "../../widgets/loadingSection"

export const QuoteScreenResultLoadingComponent = ({ screenDefinition }: { screenDefinition: QuoteScreen }) => {
    
    return <div className="screen">
        <TxtTitleUmbrlJumbo txt="UMBRL" />
        <div style={{ margin: '2rem 0',textAlign: 'center' }}>
            <Spinner color="primary" labelColor="foreground" size="lg" />
        </div>
        <TxtTitleSub isCentered={ true } txt="To work out your quote, we’re quickly getting information about your:" />
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
            <div style={{ display: 'inline-block' }}>
            <ul className="list-check">
                <TxtListItem txt="Property Data" icon="fa-solid fa-circle-check" />
                <TxtListItem txt="Contents claims history"  icon="fa-solid fa-circle-check" />
                <TxtListItem txt="Buildings claims history" icon="fa-solid fa-circle-check" />
            </ul>
            </div>
        </div>
    </div>     
}