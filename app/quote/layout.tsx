'use client'

import { DesktopSidebar } from "@/components/quote/widgets/desktopSidebar";
import { AppHeaderComponent } from "@/components/quote/widgets/header";
import { QQResponseStateContext } from "@/src/stores/contexts/quickQuoteStateContext";
import { QuoteScreenIdToUrl, quickQuoteDesktopSidebarSteps, refineQuoteDesktopSidebarStepsAll, refineQuoteDesktopSidebarStepsBuildings, refineQuoteDesktopSidebarStepsContents } from "@/src/stores/staticQuoteJourneyDefinition";
import { usePathname } from "next/navigation";
import { ReactNode, useContext, useEffect, useState } from "react";

export default function QuoteLayout({ children }: { children: ReactNode }) {
  const pathName = usePathname()
  const { currentStep, isQuickQuoteSidebar, refineSteps } = useSidebarSetup(pathName)


  return (
    <>
      {
        pathName !== QuoteScreenIdToUrl.QUICK_QUOTE_LOADING ?
          pathName !== QuoteScreenIdToUrl.QUICK_QUOTE_POLICY ?
            <AppHeaderComponent logoTxt="mini" />
            : <AppHeaderComponent logoTxt="full" withBackBtn={false} />
          : null
      }
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        {
          isQuickQuoteSidebar !== null &&
          <DesktopSidebar
            steps={
              isQuickQuoteSidebar ?
                quickQuoteDesktopSidebarSteps
                : refineSteps
            }
            currentStep={currentStep}
          />
        }
        {children}
        {
          isQuickQuoteSidebar !== null &&
          <div className='screen-sidebar right' />
        }
      </div>

    </>
  )
}


const useSidebarSetup = (pathName: string) => {

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isQuickQuoteSidebar, setIsQuickQuoteSidebar] = useState<boolean | null>(null)
  const [refineSteps, setRefineSteps] = useState<{ title: string; number: number; }[] | null>(null)


  const ctx = useContext(QQResponseStateContext)

  // @ts-ignore
  const coverage_type = ctx?.state?.policy?.coverage_type as string

  useEffect(() => {
    switch (coverage_type) {

      case 'Buildings':
        setRefineSteps(refineQuoteDesktopSidebarStepsBuildings);
        break;

      case 'Contents':
        setRefineSteps(refineQuoteDesktopSidebarStepsContents);
        break;

      case 'Buildings and Contents':
        setRefineSteps(refineQuoteDesktopSidebarStepsAll);
        break;

      default:
        setRefineSteps(null)
        break;

    }
  }, [coverage_type])

  useEffect(() => {
    switch (pathName) {

      case QuoteScreenIdToUrl.QUICK_QUOTE_PERSONAL:
        setCurrentStep(1)
        setIsQuickQuoteSidebar(true)
        break
      case QuoteScreenIdToUrl.QUICK_QUOTE_PROPERTY:
        setCurrentStep(2)
        setIsQuickQuoteSidebar(true)
        break
      case QuoteScreenIdToUrl.QUICK_QUOTE_STARTDATE:
        setCurrentStep(3)
        setIsQuickQuoteSidebar(true)
        break
      case QuoteScreenIdToUrl.REFINE_QUOTE_PERSONS:
        setCurrentStep(1)
        setIsQuickQuoteSidebar(false)
        break
      case QuoteScreenIdToUrl.REFINE_QUOTE_BUILDING:
        setCurrentStep(2)
        setIsQuickQuoteSidebar(false)
        break
      case QuoteScreenIdToUrl.REFINE_QUOTE_CONTENTS:
        setCurrentStep(3)
        setIsQuickQuoteSidebar(false)
        break
      case QuoteScreenIdToUrl.PAYMENT:
        setCurrentStep(4)
        setIsQuickQuoteSidebar(false)
        break

      default:
        setCurrentStep(0)
        setIsQuickQuoteSidebar(null)
        break
    }
  }, [pathName])

  return { currentStep, isQuickQuoteSidebar, refineSteps }
}