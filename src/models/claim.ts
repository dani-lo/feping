import { StorableCollection } from "@/src/models/form"

enum CoverageType {}

enum ClaimPeril {}

export enum ClaimStatus  {
    SETTLED = "settled",
    OPEN = "open",
}

export interface ClaimDoc {
    date: string;
    amount: number;
    coverage_type: string;
    peril: string;
    status: ClaimStatus;
}

const storableKeys = [
    'date', 
    'amount', 
    'coverage_type', 
    'peril', 
    'status', 
]

export const storedClaims = () => {
    return StorableCollection.itemsArrayFromStorage<ClaimDoc>(storableKeys, 'risks', null, 'claims') ?? []
}

export class Claim extends StorableCollection {

    public date: Date | null = null
    public amount: number | null = null
    public coverage_type: string | null = null
    public peril: string | null = null
    public status: ClaimStatus | null = null

    private uid: string;

    constructor (claimDoc: ClaimDoc | null)  {

        super(storableKeys)

        if (claimDoc) {
            this.date = new Date(claimDoc.date)
            this.amount = claimDoc.amount
            this.peril = claimDoc.peril
            this.status = claimDoc.status
            this.coverage_type = claimDoc.coverage_type
        }

        this.uid = `
                ${ (new Date()).getTime() }-
                ${ this.date ? this.date.getTime() : '' }-
                ${ this.status ? this.status.trim() : '' }-
                ${ this.peril ? this.peril.trim() : '' }-
                ${ this.coverage_type ? this.coverage_type.trim() : '' }-
                ${ this.amount ? this.amount : '' }-
        `.replace(/\s/g, '')
    }

    setDate(d: string) {
        this.date = new Date(d)
    }

    setAmount (d: number) {
        this.amount = d
    }

    setCoverage (d: string) {
        this.coverage_type = d
    }

    setPeril (d: string) {
        this.peril = d
    }

    setStatus (d: ClaimStatus) {
        this.status = d
    }

    getUid () {
        return this.uid
    }

    valid () {
        return !!this.date && !!this.status && !!this.amount && !!this.peril && !!this.coverage_type
    }

    public toStorable () {
        return super.toStorable(this.uid)
    }
} 