import { BtnComponent, BtnComponentB, UmbrlButton } from "@/components/libForm/btn"
import { TxtPara, TxtTitleUmbrl } from "@/components/util/txt";
import { QuoteScreen, QuoteScreenId, QuoteScreenIdToUrl } from "@/src/stores/staticQuoteJourneyDefinition";

export enum FooterMode {
    FIXED = 'FIXED',
    FLOATING = 'FLOATING',
}

export const ScreenFooterComponent = ({ sidNextOverride, textnextOverride, screenDefinition, screenValid, onNext, noRouting }: {
    screenDefinition: QuoteScreen;
    screenValid: boolean;
    onNext: () => void;
    noRouting ?: boolean;
    sidNextOverride ?: QuoteScreenId;
    textnextOverride ?: string;
}) => {

    const nextScreen = sidNextOverride ?? screenDefinition.sidnext

    if (!nextScreen) {
        return null
    }

    // const cname = mode === FooterMode.FIXED ? "screen-footer no-cancel" : "screen-footer no-cancel floating block-generic"

    return <div className="block-footer fxrow foo">
        <BtnComponentB
            label={  textnextOverride ?? screenDefinition.textnext ?? 'continue' }
            onClick={ onNext }
            disabled={ !screenValid }
            type={ UmbrlButton.CONTINUE }
            data-testid={ `${ screenDefinition.sid }-btn-next` }
            link={ noRouting ? undefined : QuoteScreenIdToUrl[nextScreen] }
            // size="lg"
            // radius="md"
            grow={ true }
        />
    </div>

}

export const ScreenFloatingFooterActionComponent = ({ screenDefinition, screenValid, onNext, disabled }: {
    screenDefinition: QuoteScreen;
    screenValid: boolean;
    onNext: () => void;
    disabled?: boolean;
}) => {

    return <div className="block-footer fxrow">
        <BtnComponent
                label="Update Details"
                onClick={ onNext }
                type={ UmbrlButton.UPDATE }
                size="md"
                radius="full"
                testid={ `${ screenDefinition.sid }-btn-update` }
                disabled={disabled}
            />
    </div>
}

