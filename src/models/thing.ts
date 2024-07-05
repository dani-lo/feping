import { isSameArray } from "../util/is";
import { StorableCollection } from "./form";

export interface ThingDoc {
    category: string;
    insideAndOutside: boolean;
    description? : string;
    value ?: number;
}

const storableKeys = [
    'category',
    'insideAndOutside', 
    'description', 
    'value',  
]

export class Thing extends StorableCollection {
    category: string;
    insideAndOutside: boolean;
    description? : string;
    value ?: number;
    uid: string;

    constructor (doc: ThingDoc) {

        super(storableKeys)

        this.category = doc.category
        this.insideAndOutside = doc.insideAndOutside
        this.description = doc.description
        this.value = doc.value

        this.uid = `
            ${ this.category }-
            ${ this.insideAndOutside }-
            ${ this.value ? this.value : '' }-
            ${ this.description ? this.description.replace(/\s/g, '') : '' }
        `.replace(/\s/g, '')
    }

    setInsideAndOutside (v: boolean) {
        this.insideAndOutside = v
    }

    setValue = (v: number) => {
        this.value = v
    }

    setDescription (v: string) {
        this.description = v
    }

    public toStorable () {
        return super.toStorable(this.uid)
    }
}

export const sameThing = (oneThing: ThingDoc | Thing, anotherThing: ThingDoc | Thing) => {
    return thingId(oneThing) === thingId(anotherThing)
}

export const thingId = (thing: Thing | ThingDoc) => {
    return `${thing.description?.replace(/\s/g, '')}-${ thing.value }-${ thing.category}-`
}