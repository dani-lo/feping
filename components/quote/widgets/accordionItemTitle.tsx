import { TxtPara, TxtTitleAccordion, TxtTitleSub } from "@/components/util/txt"
import { PillComponent } from "./pill";

export const AccordionItemTitleComponent = ({ textArr, uid }: { textArr: string[], uid: string; }) => {

    return  <div data-testid={ `review-screen-${ uid }` }>
        {
            textArr.map((txt: string, i) => {
                if (i === 0) {
                    return <TxtTitleAccordion key={ txt } txt={ txt?.replace(/-/g, ' ') || '' } />
                }
                return <TxtPara key={ txt } txt={ txt?.replace(/-/g, ' ') || '' } />
            })
        }
    </div>
}

export const AccordionItemPillComponent = ({ textArr, uid, onSelect }: { 
    textArr: string[];
    uid: string; 
    onSelect: () => void;
}) => {

    const title = textArr[0]

    return <PillComponent
        title={ title?.replace(/-/g, ' ') || '' }
        icons={{
            title: 'fa fa-check-circle',
            action: 'fa fa-pen'
        }}
        onAction={ () => void 0 }
        expanded={ false }
    >
        {
            textArr.map((txt: string, i) => {
                return i > 0 ? <TxtPara key={ txt } txt={ txt?.replace(/-/g, ' ') || '' } /> : null
            })
        }
    </PillComponent>

    // return  <div data-testid={ `review-screen-${ uid }` } className="pill-widget accordion-title-widget">
    //     {
    //         textArr.map((txt: string, i) => {
    //             if (i === 0) {
    //                 // return <TxtTitleSection key={ txt } txt={ txt?.replace(/-/g, ' ') || '' }  />
    //                 return <div className="resume-title fxrow">
    //                     <TxtTitleSub
    //                         txt={ txt?.replace(/-/g, ' ') || '' }
    //                         icon="fa fa-check-circle"
    //                     />
    //                     <div className="action-icon">
    //                         <i 
    //                             className="fa fa-pen" 
    //                             aria-hidden
    //                             onClick={ onSelect }
    //                         />
    //                     </div>                       
    //                 </div>
    //             }
    //             return <TxtPara key={ txt } txt={ txt?.replace(/-/g, ' ') || '' } />
    //         })
    //     }
    // </div>
}