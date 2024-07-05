import { Button } from "@nextui-org/react";
import Link from "next/link";

export enum UmbrlButton {
    CONFIRM = 'confirm',
    CANCEL = 'cancel',
    CONTINUE = 'continue',
    UPDATE = 'update',
    GENERIC = 'generic',
    SAVE = 'save',
}


export const BtnComponent = ({ type, size, onClick, label, testid, disabled, link, radius, grow, icon, isSecondary }: {
    type: UmbrlButton;
    onClick : () => void;
    label: string;
    disabled ?: boolean;
    size ?: 'sm' | 'md' | 'lg';
    testid ?: string;
    link ?: string;
    radius ?: 'sm' | 'md' | 'lg' | 'full';
    grow ?: boolean;
    icon ?: string;
    isSecondary ?: boolean;
}) => {

    let dynIcon = icon

    let variant = 'solid' as 'solid' | 'bordered'
    let color = (isSecondary ? 'secondary' :  'primary') as 'primary' | 'secondary'

    switch (true) {

        case type === UmbrlButton.CONFIRM:
            dynIcon = 'fa fa-check'
            // color = 'primary'
            variant = 'solid'

            break

        case type === UmbrlButton.CANCEL:
            dynIcon = 'fa fa-times'
            // color = 'primary'
            variant = 'bordered'
            break

        case type === UmbrlButton.CONTINUE:
            dynIcon = 'fa fa-chevron-circle-right'
            // color = 'primary'
            variant = 'solid'

            break

        case type === UmbrlButton.UPDATE:
            dynIcon = 'fa fa-repeat'
            // color = 'primary'
            variant = 'bordered'

            break

        case type === UmbrlButton.SAVE:
            dynIcon = 'fa fa-save'
            // color = 'primary'
            variant = 'solid'

            break
    }

    let cName = 'umbrl-btn'

    if (grow) {
        cName = `${ cName } grow`
    }

    if (disabled) {
        cName = `${ cName } disabled`
    }

    if (isSecondary) {
        cName = `${ cName } secondary`
    }

    return <Button
        size={ size ?? 'md' }
        as={ link ? Link : undefined }
        href={ link ? link : undefined }
        radius={ radius ?? 'md' }
        onClick={ onClick }
        variant={ variant }
        color={ color }
        isDisabled={ disabled }
        endContent={ dynIcon ? <i aria-hidden className={ dynIcon } /> : null }
        data-testid={ testid ?? null }
        className={ cName }
    >
        { label }
    </Button>
}


export const BtnComponentB = ({ type, size, onClick, label, testid, disabled, link, grow, asSecondary, icon, className }: {
    type: UmbrlButton;
    onClick : () => void;
    label: string;
    disabled ?: boolean;
    size ?: 'sm' | 'md' | 'lg';
    testid ?: string;
    link ?: string;
    grow ?: boolean;
    asSecondary ?: boolean;
    icon ?: string;
    className ?: string;
}) => {

    let dynIcon = null
    let variant = 'solid' as 'solid' | 'bordered'
    let color = 'primary' as 'primary' | 'secondary'
    let iconPos = 'before' as 'before' | 'after'

    switch(true) {

        case type === UmbrlButton.CONFIRM:
            dynIcon = 'fa fa-check'
            color = asSecondary ? 'secondary' : 'primary'
            variant = 'solid'
            iconPos = 'before'
            break

        case type === UmbrlButton.CANCEL:
            dynIcon = 'fa fa-times'
            color = 'secondary'
            variant = 'bordered'
            iconPos = 'before'
            break

        case type === UmbrlButton.CONTINUE:
            dynIcon = 'fa fa-chevron-circle-right'
            color = asSecondary ? 'secondary' : 'primary'
            variant = 'solid'
            iconPos = 'after'
            break

        case type === UmbrlButton.UPDATE:
            dynIcon = 'fa fa-pen'
            color = 'secondary'
            variant = 'bordered'
            iconPos = 'before'


            break

        case type === UmbrlButton.GENERIC:
            dynIcon = null
            color = 'secondary'
            variant = 'bordered'
            break

        // case type === UmbrlButton.EDIT:
        //     dynIcon = 'fa fa-save'
        //     // color = 'primary'
        //     variant = 'solid'

        //     break
    }

    let cName = `${className} umbrl-btn`

    if (grow) {
        cName = `${ cName } grow`
    }

    if (disabled) {
        cName = `${ cName } disabled`
    }

    if (color === 'secondary') {
        cName = `${ cName } secondary`
    }

    if (type === UmbrlButton.GENERIC) {
        cName = `${ cName } generic`
    }

    if (asSecondary) {
        cName = `${ cName } as-secondary`
    }

    const useIcon = icon ?? dynIcon

    return <Button
        size={ size ?? 'lg' }
        as={ link ? Link : undefined }
        href={ link ? link : undefined }
        radius={ 'md' }
        onClick={ onClick }
        variant={ variant }
        color={ color }
        isDisabled={ disabled }
        startContent={ useIcon && iconPos === 'before' ? <i aria-hidden className={ useIcon } /> : null }
        endContent={ useIcon && iconPos === 'after' ? <i aria-hidden className={ useIcon } /> : null }
        data-testid={ testid ?? null }
        className={ cName }
    >
        { label }
    </Button>
}