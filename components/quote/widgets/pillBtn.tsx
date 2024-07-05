import { TxtPara, TxtTitleSub } from "@/components/util/txt";

export const PillBtnComponent = ({ id, icon, title, text, onSelect}: { 
    id: string;
    icon: string; 
    title: string; 
    text: string;
    onSelect: (id: string) => void;
}) => {
    return <div className="pill-widget pill-btn-widget">
        <div className="fxrow">
            <div className="pill-btn-widget-icon">
                <i className={ icon } />
            </div>
            <div className="pill-btn-widget-title">
                <TxtTitleSub txt={ title } />
                <TxtPara txt={ text } />
            </div>
            <div  className="pill-btn-widget-action">
                <i className="fa fa-plus-circle" onClick={ () => onSelect(id) } />
            </div>
        </div>
    </div>
}