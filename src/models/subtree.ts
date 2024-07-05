import { QuoteOpt } from "../stores/staticQuoteJourneyDefinition";
import jiff from 'jiff'
import { frontendToBackendSectionSubSectionApikey } from "./mapping";
import { MdNoStroller } from "react-icons/md";
import { isObject } from "../util/is";


export const documentSubtreeFromOpts = (docOriginal: any, apisection: string, opts: QuoteOpt[]) => {

    let stree: any = {}

    let doc = JSON.parse(JSON.stringify(docOriginal))

    // console.log(opts)

    opts.forEach((opt) => {

        let mapped = frontendToBackendSectionSubSectionApikey(apisection, opt.apisubsection ?? null, opt.apikey)

        // console.log(mapped)

        if (mapped.section && mapped.subsection) {
            
            const docSection = doc[mapped.section]
            const docSubSection = docSection ? doc[mapped.section][mapped.subsection] : null

            if (docSection !== null && docSection !== undefined) {

                stree[mapped.section] =  stree[mapped.section] === undefined ? {} : stree[mapped.section]

                if (docSubSection !== null && docSubSection !== undefined) {
                    stree[mapped.section][mapped.subsection] = stree[mapped.section][mapped.subsection] === undefined ? {} : stree[mapped.section][mapped.subsection]
                } else {
                    stree[mapped.section][mapped.subsection] = null
                }
            } else {
                stree[mapped.section] = null
            }

            if (doc[mapped.section] && doc[mapped.section][mapped.subsection] && ![null, undefined].includes(doc[mapped.section][mapped.subsection][opt.apikey])) {
                stree[mapped.section][mapped.subsection][opt.apikey] = doc[mapped.section][mapped.subsection][opt.apikey]
            } 

        } else if (mapped.section) {

            // stree[mapped.section] =  stree[mapped.section] === undefined ? {} : stree[mapped.section]
            
            // if (doc[mapped.section] && ![null, undefined].includes(doc[mapped.section][opt.apikey])) {
            //     stree[mapped.section][opt.apikey] = doc[mapped.section][opt.apikey]
            // }

            const docSection = doc[mapped.section]

            // console.log('docSection >>>', docSection)

            if (docSection !== null && docSection !== undefined) {
                stree[mapped.section] =  stree[mapped.section] === undefined ? {} : stree[mapped.section]

                 
            } else {
                stree[mapped.section] = null
            }

            if (doc[mapped.section] && ![null, undefined].includes(doc[mapped.section][opt.apikey])) {
                stree[mapped.section][opt.apikey] = doc[mapped.section][opt.apikey]
            }
            
        } else {
            stree[mapped.apikey] = doc[mapped.apikey]
        }
    })

    return stree
}

export const treePatch = (fromDoc: any, toDoc: any) => {

    if (toDoc && Object.keys(toDoc ?? {}).length) {
        
        const patched =  jiff.diff(fromDoc, toDoc) ?? []

        return patched.filter(p => p.op !== 'test')
    } 

    return []
}

export const mergeSubtrees = (strees: any[]) => {

    const merged: any = {}

    const subtrees = strees.filter(st => !!Object.keys(st)?.length)
    
    subtrees.forEach(st => {
        
   
        // i.e 'main_policy__holder'
        const entry = Object.keys(st)[0]

        if (!merged.hasOwnProperty(entry)) {
            
            merged[entry] = st[entry] !== null ? { ...st[entry] } : null

        } else {

            const newKeys = Object.keys(st[entry])

            newKeys.forEach(d => {

                const t = typeof st[entry][d]

                if (['number', 'boolean', 'string'].includes(t)) {
                    
                    merged[entry][d] = st[entry][d]
                } else if (isObject(st[entry][d])) {

                    merged[entry][d] = {
                        ...merged[entry][d],
                        ...st[entry][d]
                    }
                } else if (Array.isArray(st[entry][d])) {

                    merged[entry][d] = [
                        ...merged[entry][d],
                        ...st[entry][d]
                    ]
                }
            })
        }
    })

    return merged
}