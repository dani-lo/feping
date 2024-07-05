import React, { useContext, useEffect, useState } from "react"
import { Input, Checkbox, Select, SelectItem, Switch } from "@nextui-org/react"
import { useForm } from "react-hook-form"

import { QuoteOpt, QuoteOptType } from "@/src/stores/staticQuoteJourneyDefinition"
import { capitalise } from "@/src/util/txt"
import { FormDataItem, stateFromOpts, StorableObj, UmbrlForm } from "@/src/models/form"
import { isTruthy } from "@/src/util/is"
import { NumericIncrementComponent } from "@/components/libForm/numericIncrement"
import { Patterns, validAlphaString, validString } from "@/src/util/validators"

import { DateInputComponent } from '@/components/libForm/dateInputComponent'
import { TxtLabel, TxtTitleSection } from "@/components/util/txt"
import { formatCurrency } from "@/src/util/currency"
import { ThingDoc } from "@/src/models/thing"
import { InfoBlockComponent } from "../widgets/infoBlock"
import { MetadataStateContext } from "@/src/stores/contexts/metadataStateContext"
import { ScreenContainerComponent } from "../widgets/screenContainer"

export type FormOrchestratorState = { [k: string]: FormDataItem | ThingDoc[] }

export const FormOrchestrator = ({ opts, onValid, formDataManager, withFade, onUnvalid }: {
    opts: QuoteOpt[];
    onValid: (data: StorableObj[]) => void;
    onUnvalid: () => void;
    formDataManager: UmbrlForm;
    saveOnEdit?: boolean;
    withFade ?: boolean;
}) => {


    const metadataCtx = useContext(MetadataStateContext)

    const [lastedit, setLastedit] = useState<number>(0)

    const [formOrchestratorState, setFormOrchestratorState] = useState<FormOrchestratorState | null>(null)

    const {
        register,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm({
        mode: "onBlur"
    })

    const propagateValid = (state: FormOrchestratorState) => {

        if (state) {
            
            const toSave = Object.keys(state).map(apikey => {
                return {
                    apikey,
                    val: state[apikey]
                }
            })

            onValid(toSave)
        }
    }

    /*
    * Form initialisation effect
    */
    useEffect(() => {

        const fromOptsState = stateFromOpts(opts, formDataManager) 

        setFormOrchestratorState(fromOptsState)

        if (formDataManager.hasAllRequiredData(fromOptsState ?? formOrchestratorState ?? null)) {
            propagateValid(fromOptsState)
        } else {
            onUnvalid()
        }

    }, [formDataManager.stateIsNotNull()])

    /*
    * Form changes effect
    // */
    useEffect(() => {

        if (formOrchestratorState) {

            const hasAllData = formDataManager.hasAllRequiredData(formOrchestratorState)

            if (errors && Object.keys(errors)?.length) {
                onUnvalid && onUnvalid()
            } else if (hasAllData) {
                propagateValid(formOrchestratorState)
            } else if (!hasAllData) {
                onUnvalid()
            }

        } 
        
    }, [Object.keys(errors ?? {}).length, lastedit])

    const onInputChange = (value: string, apikey: string) => {

        const newState = { ...formOrchestratorState, [apikey]: value }

        setFormOrchestratorState(newState)
        setLastedit(lastedit + 1)
    }

    const optionallyRegister = (opt: QuoteOpt, registrationObj: any) => {

        if (opt.required) {
            return register(opt.apikey, registrationObj)
        }

        return { name: opt.apikey }
    }

    const fieldValueStr = (v: FormDataItem) => {

        if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
            return String(v)
        }

        return undefined
    }

    const inputStyle = (isError: boolean) => {
        return {
            label: isError ? 'bold ' : 'bold',
            inputWrapper: isError ? "border bg-white input-not-valid" : "border bg-white",
        }
    }

    if (formOrchestratorState === null || !metadataCtx?.state) {
        return null
    }

    return <ScreenContainerComponent to={ withFade ? 100 : undefined }>
        <form className="">
        {
            opts.map(opt => {

                if (!opt.apikey) {
                    return null
                }

                let fieldValue = fieldValueStr(formOrchestratorState[opt.apikey])

                switch (opt.type) {
                    case QuoteOptType.HIDDEN:
                        return null

                    case QuoteOptType.EMAIL:

                        return <div className="block-field" key={opt.apikey} data-testid={ `form-field-EMAIL-${ opt.apikey }` }>
                            <TxtLabel txt={capitalise(opt.title ?? '')} />
                            <Input
                                {...optionallyRegister(opt,
                                    {
                                        required: "This field is required.",
                                        pattern: { value: Patterns.email, message: 'Invalid email' },
                                    }
                                )}
                                type="email"
                                onChange={(e) => opt.apikey ? onInputChange(e.target.value, opt.apikey) : void 0}
                                value={fieldValue}
                                isRequired={opt.required}
                                size="lg"
                                style={{ borderColor: errors?.[opt.apikey] ? 'red' : 'initial' }}
                                classNames={inputStyle(!!errors?.[opt.apikey])}
                                // variant="bordered"
                            />
                        </div>

                    case QuoteOptType.TEXT:
                        return <div className="block-field" key={opt.apikey}  data-testid={ `form-field-TEXT-${ opt.apikey }` }>
                            <TxtLabel txt={capitalise(opt.title ?? '')} />
                            <Input
                                {...optionallyRegister(opt,
                                    {
                                        required: "This field is required.",
                                        validate: (a: string) => {
                                            if (validAlphaString(a)) {
                                                setLastedit(lastedit + 1)
                                            }
                                        }
                                    }
                                )}
                                type="text"
                                onChange={(e) => opt.apikey ? onInputChange(e.target.value, opt.apikey) : void 0}
                                value={fieldValue}
                                isRequired={opt.required}
                                size="lg"
                                classNames={inputStyle(!!errors?.[opt.apikey])}
                                data-testid={`form-input-${opt.apikey}`}
                                isDisabled={opt.disabled}
                                // variant="bordered"
                            />
                        </div>

                    case QuoteOptType.ALPHA_TEXT:
                        return <div className="block-field" key={opt.apikey} data-testid={ `form-field-ALPHA_TEXT-${ opt.apikey }` }>
                            <TxtLabel txt={capitalise(opt.title ?? '')} />
                            <Input
                                {...optionallyRegister(opt,
                                    {
                                        required: "This field is required.",
                                        pattern: { value: Patterns.alphaText },
                                        validate: (a: string) => {
                                            if (validAlphaString(a)) {
                                                setLastedit(lastedit + 1)
                                            }
                                        }
                                    }
                                )}
                                type="text"
                                onChange={(e) => opt.apikey ? onInputChange(e.target.value, opt.apikey) : void 0}
                                value={fieldValue}
                                isRequired={opt.required}
                                size="lg"
                                classNames={inputStyle(!!errors?.[opt.apikey])}
                                data-testid={`form-input-${opt.apikey}`}
                                isDisabled={opt.disabled}
                                // variant="bordered"
                            />
                        </div>

                    case QuoteOptType.NUMERIC:
                    case QuoteOptType.NUMERIC_CURRENCY:

                        const testIdType = opt.type === QuoteOptType.NUMERIC ? 'NUMERIC' : 'NUMERIC_CURRENCY'
                        return <div className="block-field" key={opt.apikey} data-testid={ `form-field-${ testIdType }-${ opt.apikey }` }>
                            {
                                opt.blocktitle ? <TxtTitleSection txt={opt.blocktitle} /> : null
                            }
                            <TxtLabel txt={capitalise(opt.title ?? '')} />
                            <Input
                                {...optionallyRegister(opt,
                                    {
                                        required: "This field is required.",
                                        validate: (a: string) => {
                                            if (validString(a)) {
                                                setLastedit(lastedit + 1)
                                            }
                                        }
                                    }
                                )}
                                type="number"
                                onChange={(e) => opt.apikey ? onInputChange(e.target.value, opt.apikey) : void 0}
                                value={!isNaN(Number(fieldValue)) ? fieldValue : undefined}
                                isRequired={opt.required}
                                size="lg"
                                classNames={inputStyle(!!errors?.[opt.apikey])}
                                startContent={
                                    opt.type === QuoteOptType.NUMERIC_CURRENCY ?
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">&pound;</span>
                                        </div> :
                                        null
                                }
                                // variant="bordered"
                            />
                            {
                                opt.tip ? <InfoBlockComponent
                                    // @ts-ignore
                                    info={opt.tip.replace('__VAL__', `${formatCurrency(parseInt(opt.value ?? '0'))}`)}
                                />
                                    : null
                            }
                        </div>

                    case QuoteOptType.NUMERIC_INCREMENT:

                        return <div className="block-field" key={opt.apikey} data-testid={ `form-field-NUMERIC_INCREMENT-${ opt.apikey }` }>
                            <NumericIncrementComponent
                                allowNegative={false}
                                label={opt.title || ''}
                                onNumChanged={(n) => {

                                    opt.apikey ?
                                        onInputChange(String(n), opt.apikey) :
                                        void 0

                                    setLastedit(lastedit + 1)
                                }}
                                val={Number(fieldValue ?? 0)}
                            />
                        </div>

                    case QuoteOptType.DOB:

                        return <div className="block-field" key={opt.apikey} data-testid={ `form-field-DOB-${ opt.apikey }` }>
                            <DateInputComponent
                                validationRule={opt.validationRule!}
                                selectedDate={fieldValue}
                                register={register}
                                setError={setError}
                                errors={ errors }
                                clearErrors={clearErrors}
                                onDateChange={(dateStr: string) => {
                                    if (opt.apikey) {
                                        onInputChange(dateStr, opt.apikey)
                                        setLastedit(lastedit + 1)
                                    }
                                }}
                                label={opt.title ?? ''}
                            />
                        </div>

                    case QuoteOptType.BOOL:

                        return <div className="block-field" key={opt.apikey} data-testid={ `form-field-BOOL-${ opt.apikey }` }>
                            <Switch
                                defaultSelected={ false }
                                isSelected={isTruthy(fieldValue)}
                                onChange={(e) => {

                                    const boolVal = isTruthy(e.target.checked) ? 'true' : 'false'

                                    opt.apikey ? onInputChange(boolVal, opt.apikey) : void 0

                                    setLastedit(lastedit + 1)
                                }}
                                // isRequired={opt.required}
                                size="sm"
                            >
                            {opt.question ?? capitalise(opt.title ?? '')}
                        </Switch>

                        </div>

                    case QuoteOptType.BOOL_INVERTED:

                        return <div className="block-field" key={opt.apikey}  data-testid={ `form-field-BOOL_INVERTED-${ opt.apikey }` }>

                            <Switch
                                defaultSelected={ false }
                                isSelected={!isTruthy(fieldValue)}
                                value={fieldValue}
                                onChange={(e) => {

                                    const boolVal = isTruthy(e.target.checked) ? 'false' : 'true'

                                    opt.apikey ? onInputChange(boolVal, opt.apikey) : void 0

                                    setLastedit(lastedit + 1)
                                }}
                                // isRequired={opt.required}
                                size="sm"
                            >
                            {opt.question ?? capitalise(opt.title ?? '')}
                        </Switch>
                        </div>

                    case QuoteOptType.SELECT:

                                // @ts-ignore
                        const values = (opt.enumkey && metadataCtx.state?.enums) ? metadataCtx.state?.enums[opt.enumkey] : []

                        const optionVals = Object.keys(values).map((key: string) => {
                            return  {
                                // @ts-ignore
                                label: values[key],
                                //@ts-ignore
                                val: values[key]
                            }
                        })

                        return <div className="block-field" key={opt.apikey}  data-testid={ `form-field-SELECT-${ opt.apikey }` }>
                            <TxtLabel txt={capitalise(opt.title ?? '')} />
                            <Select
                                {...optionallyRegister(opt,
                                    {
                                        required: "This field is required.",
                                    }
                                )}
                                items={optionVals}
                                defaultSelectedKeys={fieldValue ? [String(fieldValue)] : []}
                                placeholder={opt.text}
                                onChange={(e) => {
                                    onInputChange(e.target.value, opt.apikey ?? '')
                                    setLastedit(lastedit + 1)
                                }}
                                isRequired={opt.required}
                                size="lg"
                            >
                                {
                                    (optionVals ?? []).map((optVal) => {
                                        return <SelectItem
                                            key={optVal.val}
                                            value={optVal.val}
                                            data-selected={fieldValue === optVal.val}
                                            data-testid={ `select-option-${ optVal.val }` }
                                        >
                                            {optVal.label}
                                        </SelectItem>
                                    })
                                }
                            </Select>
                        </div>

                    case QuoteOptType.CUSTOM:
                        return null
                }
            })
        }
    </form>
    </ScreenContainerComponent>
}
