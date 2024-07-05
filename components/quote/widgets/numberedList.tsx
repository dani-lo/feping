import { TxtNoteEvidence, TxtPara, TxtTitleList, TxtTitlePage, TxtTitleSub } from "@/components/util/txt";
import { twNote, twNoteLg, twParagraph, twTitleSection } from "@/src/styles/text.tailwind";

type NumberedTextItem = { title: string; text: string | null; } | null;

export const NumberedListComponent = ({ textItems, role }: { textItems: NumberedTextItem[], role?: string; }) => {

    return <ul className={`${role ? role : ''} numbered-list`}>
        {
            textItems.map((txtItem, i) => {
                return txtItem === null ?
                    null :
                    <li key={i} className="fxrow">
                        {/* <span>{i + 1}</span> */}
                        <div>
                            <TxtTitlePage txt={txtItem.title} />
                            {txtItem.text ? <TxtPara txt={txtItem.text} /> : null}
                        </div>
                    </li>
            })
        }
    </ul>
}