export const TipComponent = ({ tipTxt, uiClear }: { tipTxt: string; uiClear?: boolean; }) => {
    return <span className={ uiClear ? 'tip-widget ui-clear' : 'tip-widget'}>{ tipTxt }</span>
}