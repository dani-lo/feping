import { boldify } from "@/src/util/txt";
import Image from "next/image";

interface TxtProps {
    txt ?: string;
    icon ?: string | null;
    isCentered?: boolean;
    isError?: boolean;
    isBorder ?: boolean;
    onAbout?: () => void;
    capitalize ?: boolean;
}

const TxtIcon = ({ icon, }: { icon: string }) => {
    return icon.includes('svg') ? <Image
        src={ icon }
        width="43"
        height="43"
        alt="icon"
     /> : <i aria-hidden className={ icon }  />
}

export const TxtTitleUmbrl = (props: TxtProps) => {

    return <h1 className={`umbrl ${ props.isCentered ? ' centered': '' }`}>{ props.txt ?? ''  }</h1>
}

export const TxtTitleUmbrlLarge = (props: TxtProps) => {

    return <h1 className={`umbrl big-logo${ props.isCentered ? ' centered': '' }`}>{ props.txt ?? ''  }</h1>
}

export const TxtTitleUmbrlJumbo = (props: TxtProps) => {

    return <h1 className={`umbrl jumbo-logo${ props.isCentered ? ' centered': '' }`}>{ props.txt ?? ''  }</h1>
}

export const TxtTitlePage = (props: TxtProps) => {

    return props.icon ?
        <h2 className={`_tw_text-2xl with-icon${ props.isCentered ? ' centered': '' }`}>
            <TxtIcon icon={ props.icon } />
            <span>{ props.txt ?? ''  }</span>
        </h2> :
        <h2 className={`_tw_text-2xl${ props.isCentered ? ' centered': '' }`}>{ props.txt ?? ''  }</h2>
}

export const TxtTitleSub = (props: TxtProps) => {

    const cname = `_tw_text-xl${ props.capitalize ? ' capital ' : ''}${ props.isCentered ? ' centered ': '' }${ props.onAbout ? ' with-about ' : '' }${ props.icon ? ' with-icon ' : '' }`
    
    if (props.icon) {
        return <h3 className={ cname }>
            <TxtIcon icon={ props.icon } />
            <span>{ props.txt ?? ''  }</span>
        </h3>
    } else if (props.onAbout) {
        return <h3
            className={ cname }>
            <span>{ props.txt ?? ''  }</span>
            <i className="about-icon fa fa-question-circle" />
        </h3>
    }

    return <h3 className={ cname }>{ props.txt ?? ''  }</h3>
}

export const TxtTitleSection = (props: TxtProps) => {

    const theText = `${ props.txt }`
    const bolded = boldify(theText ?? '')

    return props.icon ?
        <h4 className={`_tw_text-lg with-icon${ props.capitalize ? ' capital ' : ''}${ props.isCentered ? ' centered': '' }${ props.isError ? ' txt-error': '' }`}>
            <TxtIcon icon={ props.icon } />
            <span>{ bolded ?? ''  }</span>
        </h4> :
        <h4 className={`_tw_text-lg${ props.isCentered ? ' centered': '' }${ props.capitalize ? ' capital ' : ''}`}>{ bolded ?? ''  }</h4>

}

export const TxtTitlePremium = (props: TxtProps) => {
    return <h1 className="_tw_text-3xl with-top-label font-bold">{ props.txt ?? ''  }</h1>
}

export const TxtTitleAccordion = (props: TxtProps) => {

    return <h4 className="_tw_text-lg block align-left font-medium">{ props.txt ?? ''  }</h4>
}

export const TxtTitleError = (props: TxtProps) => {
    return <h3 className="_tw_text-2xl my-6 centered capital">{ props.txt ?? ''  }</h3>
}

export const TxtTitleList = (props: TxtProps) => {

    const cname = props.isBorder ? 'bordered _tw_text-lg' : '_tw_text-lg'

    return props.icon ?
        <h4 className={ cname }>
            <TxtIcon icon={ props.icon} />
            <span>{ props.txt ?? ''  }</span>

        </h4> :
        <h4 className={ cname }>{ props.txt ?? ''  }</h4>
}

export const TxtPara = (props: TxtProps) => {

    const theText = `${ props.txt }`
    const bolded = boldify(theText ?? '')

    return <p className="_tw_text-base">{ bolded }</p>
}



export const TxtLinePara = (props: TxtProps) => {

    return props.icon ? <p className={ `iconed _tw_text-base` }>
        <TxtIcon icon={ props.icon } />
        <span>{ props.txt ?? ''  }</span>
    </p> :
    <p className="_tw_text-base">{ props.txt ?? ''  }</p>
}


export const TxtNoteEvidence = (props: TxtProps) => {

    return props.icon ?
        <p className={`_tw_text-lg bolded with-icon${ props.isCentered ? ' centered': '' }${ props.isError ? ' txt-error': '' }`}>
            <TxtIcon icon={ props.icon } />
            <span>{ props.txt ?? ''  }</span>
        </p> :
        <p className={`_tw_text-lg${ props.isCentered ? ' centered bolded': ' bolded' }`}>{ props.txt ?? ''  }</p>

    // return <h4 className="_tw_text-base">{ props.txt ?? ''  }</h4>
}

export const TxtListItem = (props: TxtProps) => {

    // return props.icon ?
    //     <h4 className={`_tw_text-lg  with-icon${ props.isCentered ? ' centered': '' }${ props.isError ? ' txt-error': '' }`}>
    //         <TxtIcon icon={ props.icon } />
    //         <span>{ props.txt ?? ''  }</span>
    //     </h4> :
    //     <h4 className={`_tw_text-lg${ props.isCentered ? ' centered': '' }`}>{ props.txt ?? ''  }</h4>


    return props.icon ?
        <li className="_tw_text-base with-icon">
            <TxtIcon icon={ props.icon } />
            <span>{ props.txt ?? ''  }</span>
        </li>:
        <li className="_tw_text-base">{ props.txt ?? ''  }</li>
}

export const TxtOfferListItem = (props: TxtProps) => {
    return props.icon ?
        <li className="_tw_text-base tracking-tight">
            <TxtIcon icon={ props.icon } />
            <span>{ props.txt ?? ''  }</span>
        </li>:
        <li className="_tw_text-base tracking-tight">{ props.txt ?? ''  }</li>
}

export const TxtLabel = (props: TxtProps) => {
    return <label className="_tw_text-base">{ props.txt ?? ''  }</label>
}
