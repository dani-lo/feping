import {
    QuoteOpt
} from "@/src/stores/staticQuoteJourneyDefinition"

import { load } from "../util/storage"
import { FormOrchestratorState } from "@/components/quote/orchestrators/formOrchestrator"
import { ThingDoc } from "./thing" 
import { frontendToBackendSectionSubSectionApikey } from "./mapping"
import { LocalState, LocalStateDispatch } from "../stores/contexts/localStateContext"
import { safeType } from "../util/safe"

export type AnyDefined = number | string | boolean

export type FormDataItem = number | 
    string | 
    boolean | 
    { [k: string] : AnyDefined } | 
    { [k: string] : AnyDefined }[] |
     ThingDoc[]

export interface StorableObj { apikey: string, subsection?: string; val: FormDataItem | null }

export const stateFromOpts = (opts: QuoteOpt[], formDataManager: UmbrlForm): FormOrchestratorState => {
    
    return opts?.reduce((acc: FormOrchestratorState, curr) => {

        if (curr.apikey) {

            const v = formDataManager.keyVal(curr.apikey)

            acc[curr.apikey] = [null, undefined].includes(v) ? null : v
        }
        return acc
    }, {}) ?? {}
}

export class UmbrlForm {

    public opts: QuoteOpt[]

    private syncd: boolean
    private dispatcher: LocalStateDispatch | null

    private apisection: string
    private matchOptPredicate = (optA: QuoteOpt, optB: QuoteOpt) => {
        if (optA.apisubsection && optB.apisubsection) {
            return optA.apikey === optB.apikey && optA.apisubsection === optB.apisubsection
        }
        return optA.apikey === optB.apikey
    }

    private data: LocalState

    constructor(
        opts: QuoteOpt[], 
        apisection: string, 
        state: LocalState | null,
        dispatcher: LocalStateDispatch | null
    ) {

        this.apisection = apisection
        this.opts = opts
        this.dispatcher = dispatcher
                
        if (state && state[this.apisection]) {
            
            const d = state[this.apisection] as LocalState

            this.data = { ...d }

        } else {
            this.data = {}
        }

        this.syncd = false
    }

    ready (checkSyncd ?: boolean) {

        if (checkSyncd && !this.syncd) {
            return false
        }

        return this.data && !!Object.keys(this.data).length
    }

    static manualRead (section: string, subsection: string | null, apikey: string) {
        
        const d = load(section)

        if (!d) {
            return null
        }
        
        if (subsection) {
            return d[subsection] ? d[subsection][apikey] : null
        }
        
        return d[apikey] ?? null
    }

    static manualSave (
            dispatcher: LocalStateDispatch,
            section: string, 
            subsection: string | null, 
            apikey: string, 
            val: FormDataItem | null,
            skipStorage ?: 'SKIP_STORAGE') {

        const existing = load(section)
        const newData = existing ? { ...existing } : {}

        if (subsection) {
            // @ts-ignore
            newData[subsection] = newData[subsection] ?? {}
            newData[subsection][apikey] = val
        } else {
            newData[apikey] = val
        }
        
        dispatcher ({
            type: 'SAVE_DATA',
            payload: {
                key: section,
                dataTree: newData,
                skipStorage
            }
        })
    }

    static hasFormChanged (
            formDataManager: UmbrlForm, 
            currentData: { apikey: string; val: FormDataItem | null; }[] | null) {
     
        for (const opt of formDataManager.opts) {
            const matchingField = currentData?.find(field => field.apikey === opt.apikey)

            if (matchingField?.val !== formDataManager.keyVal(opt.apikey)){
                return true;
            }
        }
        return false;
    }

    get storageKey () {
        return this.apisection
    }


    dump () {
        return this.data
    }

    stateIsNotNull () {
        return !!(Object.values(this.data) || []).find(d => d !== null)
    }

    dumpScreenData (): StorableObj[] {

        return this.opts.map(opt => {

            const d: StorableObj = {
                apikey: opt.apikey,
                val: this.keyVal(opt.apikey, opt.apisubsection)
            }

            return opt.apisubsection ? { ...d, subsection: opt.apisubsection } : d
        })
    }

    dumpTreeWithMapping (dbg ?: boolean) {

        const tree = {} 

        // console.log(this.data)

        for (const opt of this.opts) {

            // console.log(opt)
            // console.log(this.keyVal(opt.apikey, opt.apisubsection))

            const val = this.keyVal(opt.apikey, opt.apisubsection)

            if (dbg) {
                console.log(opt.apikey, val)
            }

            if (val === null) {
                continue
            }

            const mapped = frontendToBackendSectionSubSectionApikey(this.storageKey, opt.apisubsection ?? null, opt.apikey)

            if (mapped.section) {

                // @ts-ignore
                tree[mapped.section] = tree[mapped.section] ?? {}

                if (mapped.subsection) {
                    // @ts-ignore
                    tree[mapped.section][mapped.subsection] = tree[mapped.section][mapped.subsection] ?? {}

                    // @ts-ignore
                    tree[mapped.section][mapped.subsection][mapped.apikey] = safeType(val)
                } else {
                    // @ts-ignore
                    tree[mapped.section][mapped.apikey] = safeType(val)
                }
            } else {
                // @ts-ignore
                tree[mapped.apikey] = safeType(val)
            }
            
        }

        return tree
    }

    saveScreenData (formData: StorableObj[], preserveExisting: boolean, skipStorage ?: 'SKIP_STORAGE') {

        const storageKey = this.storageKey
        const optsDefinition = this.opts
        
        // return 
        if (storageKey && optsDefinition) {

            const obj = preserveExisting ? { ...this.data } : {}

            optsDefinition.forEach((opt: QuoteOpt) => {

                const valToSave = formData.find(d => {
                    if (d.subsection && opt.apisubsection) {
                        return opt.apikey === d.apikey && opt.apisubsection === d.subsection
                    }
                    return opt.apikey === d.apikey
                })

                if (valToSave) {

                    if (opt.apisubsection) {

                        // @ts-ignore
                        obj[opt.apisubsection] = obj[opt.apisubsection] || {}
                        // @ts-ignore
                        obj[opt.apisubsection][opt.apikey] = valToSave.val

                    } else {

                        // @ts-ignore
                        obj[opt.apikey] = valToSave.val
                    }
                }
            })

            this.data = { ...obj }

            if (this.dispatcher) {
                this.dispatcher ({
                    type: 'SAVE_DATA',
                    payload: {
                        key: storageKey,
                        dataTree: obj,
                        skipStorage
                    }
                })
            }
        }
    }

    keyVal(apikey: string, subsection ?: string) {

        const opt = this.opts.find(opt => {

            if (subsection) {
                return opt.apikey === apikey && opt.apisubsection === subsection
            }
            return opt.apikey === apikey 
        })

        if (!opt) {
            return null
        }

        const root = opt.apisubsection && this.data[opt.apisubsection] ? this.data[ opt.apisubsection] : this.data

        // @ts-ignore
        return  root && ![null, undefined].includes(root[opt.apikey]) ? root[opt.apikey] : null
    }

    syncQuoteDataOpts (populatedOpts: QuoteOpt[], overwriteStoredValue ?: boolean) {

        
        for (const opt of (populatedOpts || [])) {

            // if (opt.value === null) {
            //     continue
            // }

            const hasStoredValue = !!this.keyVal(opt.apikey, opt.apisubsection ?? undefined)

            if (hasStoredValue && !overwriteStoredValue) {
                continue
            }

            if (!this.opts.find(o => this.matchOptPredicate(o, opt))) {
                this.opts.push(opt)
            } else {
                const idx = this.opts.findIndex(o => this.matchOptPredicate(o, opt))

                this.opts[idx] = opt
            }
            
            if (opt.hasOwnProperty('value') || opt.hasOwnProperty('assumed')) {

                if (opt.apisubsection) {

                    this.data[ opt.apisubsection] = this.data[ opt.apisubsection] ?? {}

                    // @ts-ignore
                    this.data[opt.apisubsection][opt.apikey] = opt.hasOwnProperty('assumed') ? opt.assumed : opt.value
                } else  {
                    // @ts-ignore
                    this.data[opt.apikey] = opt.hasOwnProperty('assumed') ? opt.assumed : opt.value
                }
            }
        }

        this.syncd = true
    }

    hasAllRequiredData (formState ?: FormOrchestratorState | null) {

        const requiredKeys = this.opts.filter(opt => opt.required).map(opt => opt.apikey)

        return requiredKeys.reduce((acc, key) => {
            
            if (acc) {

                if (formState) {
                    
                    const valFromFormState = formState[key]

                    return valFromFormState !== undefined && valFromFormState !== null && valFromFormState !== ''

                } else {
                    // read from storage
                    const valFromFormStorage = this.keyVal(key)

                    return valFromFormStorage !== undefined && valFromFormStorage !== null
                }
            }

            return false
        }, true)
    }

    hasAllRequiredDataInStorableFormat (screenData: StorableObj[] | null) {

        const requiredKeys = this.opts.filter(opt => opt.required).map(opt => opt.apikey)

        if (!screenData) {
            return false
        }

        return screenData.reduce((acc: boolean, curr: StorableObj) => {
            
            if (acc) {

                    if (requiredKeys.includes(curr.apikey)) {
                        
                        const currVal = this.keyVal(curr.apikey)

                        return  currVal !== undefined && currVal !== null &&  currVal !== ''

                    } else {
                        return acc
                    }
            }

            return false
        }, true)
    }

}

export class StorableCollection  {

    private storageKeys: string[] = []
    private mappings: { [localKey: string] : string }

    constructor (keys: string[], mappings ?: { [localKey: string] : string }) {
        this.storageKeys = keys
        this.mappings = mappings ?? {}
    }

    static itemsArrayFromStorage<T>(
            storageKeys: string[],
            apisection: string,
            apisubsection: string | null,
            apikey: string): T[] {

        const d =  UmbrlForm.manualRead(apisection, apisubsection, apikey) ?? [] as T[]

        return d.map((item: any) => {

            return storageKeys.reduce((acc: T, curr)=> {

                const val = item[curr]

                // @ts-ignore
                acc[curr] = val ?? null

                return acc
            }, {} as T)
        })

    }

    public toStorable (uid ?: string | null) : {[k: string] : string | number | boolean } {

        const saveable = this.storageKeys.reduce((acc: any, curr) => {

            // @ts-ignore
            const d = this[curr]

            acc[curr] = d

            return acc
        }, {})

        if (uid) {

            // @ts-ignore
            saveable.uid = uid
        }

        return saveable
    }
}