import { TxtTitleSection, TxtTitleSub } from "@/components/util/txt";

interface Props {
    title: string;
    icons: {
        title: string | null;
        action: string | null;
    } | null;
    onAction: null | (() => void);
    expanded: boolean;
    children: any;
    onClick ?: () => void;
    active ?: boolean;
    policyPill?: boolean;
    testid?: string;
}

export const PillComponent = ({title, icons, onAction, expanded, children, active, onClick, policyPill, testid }: Props) => {

    const cname = `pill-widget${ expanded ? ' expanded' : '' }${ onClick ? ' clickable' : '' }${ active ? ' active' : '' } ${ policyPill ? 'policy-pill' : '' }`

    return <div
        data-testid={ testid ?? undefined }
        className={ cname }
        onClick={ onClick ? onClick : () => void 0 }
    >
        <div className={ `pill-title${icons?.action ? ' fxrow' : '' }` }>
            <TxtTitleSub txt={ title } icon={ icons?.title ?? null } />
            {
                icons?.action && onAction ?
                <div className="pill-icon">
                    <i
                        className={  expanded ? 'fa fa-times' : icons.action }
                        onClick={ onAction }
                    />
                </div>: null
            }
        </div>
        {
            expanded ? null : children
        }
    </div>
}