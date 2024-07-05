import { TxtLabel, TxtNoteEvidence, TxtPara, TxtTitleSection } from "@/components/util/txt";
import { twTitleSub } from "@/src/styles/text.tailwind";

export const InfoBlockComponent = ({ info, title }: { info: string; title ?: string; }) => {
    return <div className="block-info">
        {
            title ? <TxtTitleSection txt={ title } /> : null
        }
        <div>
            <i className={`fa fa-info-circle info-icon ${ twTitleSub }`} aria-hidden="true"></i>
            <TxtPara  txt={ info } />
        </div>
    </div>
}