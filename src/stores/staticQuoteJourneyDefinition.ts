import { ApiBoostsToggles } from "@/components/quote/widgets/boosts";
import { ThingDoc } from "../models/thing";


export enum QuoteScreenId {
    QUICK_QUOTE_POLICY = 'QUICK_QUOTE_POLICY',
    QUICK_QUOTE_PERSONAL = 'QUICK_QUOTE_PERSONAL',
    QUICK_QUOTE_PROPERTY = 'QUICK_QUOTE_PROPERTY',
    QUICK_QUOTE_STARTDATE = 'QUICK_QUOTE_STARTDATE',
    QUICK_QUOTE_REVIEW = 'QUICK_QUOTE_REVIEW',
    QUICK_QUOTE_COVERS = 'QUICK_QUOTE_COVERS',
    QUICK_QUOTE_LOADING = 'QUICK_QUOTE_LOADING',
    QUICK_QUOTE_BOOSTS = 'QUICK_QUOTE_BOOSTS',
    QUICK_QUOTE_RESULT = 'QUICK_QUOTE_RESULT',
    QUICK_QUOTE_ADDONS = 'QUICK_QUOTE_ADDONS',
    QUOTE_CHOOSE_EXCESS = 'QUOTE_CHOOSE_EXCESS',
    REFINE_QUOTE_LANDING = 'REFINE_QUOTE_LANDING',
    REFINE_QUOTE_PERSONS = 'REFINE_QUOTE_PERSONS',
    REFINE_QUOTE_CONTENTS = 'REFINE_QUOTE_CONTENTS',
    REFINE_QUOTE_BUILDING = 'REFINE_QUOTE_BUILDING',

    CHOOSE_POLICY = 'CHOOSE_POLICY',
    PAYMENT = 'PAYMENT',

}

export enum QuoteScreenStepId {
    REFINE_QUOTE_VALUABLES = 'REFINE_QUOTE_VALUABLES',
    REFINE_MAIN_POLICY_HOLDER = 'REFINE_MAIN_POLICY_HOLDER',
    REFINE_SECONDARY_POLICY_HOLDER = 'REFINE_SECONDARY_POLICY_HOLDER',
    REFINE_HOME_RESIDENTS = 'REFINE_HOME_RESIDENTS',
    REFINE_BUILDING = 'REFINE_BUILDING',
    REFINE_OWNERSHIP_VALUES = 'REFINE_OWNERSHIP_VALUES',
    REFINE_RISKS = 'REFINE_RISKS',
    REFINE_TOTAL_CONTENTS = 'REFINE_TOTAL_CONTENTS',
    REFINE_COVER_INSIDE = 'REFINE_COVER_INSIDE',
    REFINE_VALUABLES = 'REFINE_VALUABLES',
    REFINE_VALUABLES_INSIDE = 'REFINE_VALUABLES_INSIDE',
    REFINE_VALUABLES_OUTSIDE = 'REFINE_VALUABLES_OUTSIDE',
    REFINE_COVER_OUTSIDE = 'REFINE_COVER_OUTSIDE',
    REFINE_CLAIMS = 'REFINE_CLAIMS'
}

export enum QuoteOptType {
    TEXT = 'TEXT',
    ALPHA_TEXT = 'ALPHA_TEXT',
    EMAIL = 'EMAIL',
    ADDRESS = 'ADDRESS',
    NUMERIC = 'NUMERIC',
    NUMERIC_INCREMENT = 'NUMERIC_INCREMENT',
    NUMERIC_CURRENCY = 'NUMERIC_CURRENCY',
    DOB = 'DOB',
    BLOCK_EXPAND = 'BLOCK_EXPAND',
    SELECT = 'SELECT',
    BOOL = 'BOOL',
    BOOL_INVERTED = 'BOOL_INVERTED',
    THINGS = 'THINGS',
    RANGE_CURRENCY = 'RANGE_CURRENCY',
    RANGE_DAYS = 'RANGE_DAYS',
    CLAIMS = 'CLAIMS',
    CUSTOM = 'CUSTOM',
    HIDDEN = 'HIDDEN'
}

export const QuoteScreenIdToUrl = {
    [QuoteScreenId.QUICK_QUOTE_POLICY]: '/quote/quick/policy',
    [QuoteScreenId.QUICK_QUOTE_PERSONAL]: '/quote/quick/personal',
    [QuoteScreenId.QUICK_QUOTE_PROPERTY]: '/quote/quick/property',
    [QuoteScreenId.QUICK_QUOTE_STARTDATE]: '/quote/quick/startdate',
    [QuoteScreenId.QUICK_QUOTE_REVIEW]: '/quote/quick/review',
    [QuoteScreenId.QUICK_QUOTE_LOADING]: '/quote/quick/loading',
    [QuoteScreenId.QUICK_QUOTE_COVERS]: '/quote/quick/covers',
    [QuoteScreenId.QUICK_QUOTE_RESULT]: '/quote/quick/result',
    [QuoteScreenId.QUICK_QUOTE_BOOSTS]: '/quote/quick/boosts',
    [QuoteScreenId.QUICK_QUOTE_ADDONS]: '/quote/quick/addons',
    [QuoteScreenId.QUOTE_CHOOSE_EXCESS]: '/quote/quick/excess',
    [QuoteScreenId.REFINE_QUOTE_LANDING]: '/quote/refine',
    [QuoteScreenId.REFINE_QUOTE_PERSONS]: '/quote/refine/persons',
    [QuoteScreenId.REFINE_QUOTE_CONTENTS]: '/quote/refine/contents',
    [QuoteScreenId.REFINE_QUOTE_BUILDING]: '/quote/refine/building',
    [QuoteScreenId.CHOOSE_POLICY]: '/quote/choose/policy',

    [QuoteScreenId.PAYMENT]: '/quote/payment',
}

export const UrlToDesktopSidebarStepNum = {
    '/quote/quick/policy': 0,
    '/quote/quick/personal': 1,
    '/quote/quick/property': 2,
    '/quote/quick/startdate': 3,
    '/quote/quick/review': 4,
    '/quote/quick/loading': 5,
    '/quote/quick/covers': 6,
    '/quote/quick/result': 7,
    '/quote/quick/boosts': 8,
    '/quote/quick/addons': 9,
    '/quote/quick/excess': 10,
    '/quote/refine': 0,
    '/quote/refine/persons': 1,
    '/quote/refine/contents': 2,
    '/quote/refine/building': 3,
    '/quote/choose/policy': 4,
    '/quote/payment': 5,
}

export enum QuoteOptValidationRule {
    NEXT_30_DAYS = 'NEXT_30_DAYS',
    DOB = 'DOB',
}

export interface QuoteOpt {
    type: QuoteOptType;
    apikey: string;
    required: boolean;
    apisubsection?: string;
    title?: string;
    text?: string;
    tip?: string;
    breakdowntitle?: string;
    optionvals?: {
        label: string;
        val: string;
    }[];
    value?: string | number | boolean | ThingDoc[] | ApiBoostsToggles;
    confirmable?: boolean;
    assumed?: string | number | boolean;
    disabled?: boolean;
    enumkey?: string;
    blocktitle?: string;
    question?: string;
    validationRule?: QuoteOptValidationRule;
}


export interface QuoteScreen {
    type: string;
    sid: QuoteScreenId;
    opts: QuoteOpt[];
    title: string;
    sidnext: QuoteScreenId;
    textnext?: string;
    infoalert?: string;
    screensresume?: { sid: QuoteScreenId, titleKeys: string[] }[];
    steps?: QuoteScreenStepId[];
    apisection: string;
    desktopsidebar?: any
}

export interface StepAction {
    type: string;
    text: string;
}

export const StaticQuoteJourneyDefinition: QuoteScreen[] = [
    {
        "type": "screen",
        "title": "which product is right for you?",
        "textnext": "Choose your cover",
        "sid": QuoteScreenId.QUICK_QUOTE_POLICY,
        "sidnext": QuoteScreenId.QUICK_QUOTE_PERSONAL,
        "apisection": "policy",
        "opts": [
            {
                "type": QuoteOptType.BLOCK_EXPAND,
                "required": true,
                "title": "building and contents",
                "apikey": "coverage_type",
            }
        ]
    },
    {
        "type": "screen",
        "title": "tell us a little bit about you",
        "textnext": "Save details",
        "sid": QuoteScreenId.QUICK_QUOTE_PERSONAL,
        "sidnext": QuoteScreenId.QUICK_QUOTE_PROPERTY,
        "apisection": "main_policy_holder",
        "desktopsidebar": {
            step: 1
        },
        "opts": [
            {
                "type": QuoteOptType.ALPHA_TEXT,
                "title": "first name",
                "apikey": "first_name",
                "required": true,
            },
            {
                "type": QuoteOptType.ALPHA_TEXT,
                "title": "surname",
                "apikey": "surname",
                "required": true,
            },

            {
                "type": QuoteOptType.EMAIL,
                "title": "email address",
                "apikey": "email",
                "required": true,
            },
            {
                "type": QuoteOptType.DOB,
                "title": "Date of Birth",
                "apikey": "date_of_birth",
                "required": true,
                "validationRule": QuoteOptValidationRule.DOB
            }
        ]
    },
    {
        "type": "screen",
        "title": "about your home",
        "textnext": "Check your details",
        "sid": QuoteScreenId.QUICK_QUOTE_PROPERTY,
        "sidnext": QuoteScreenId.QUICK_QUOTE_STARTDATE,
        "apisection": "property",
        "desktopsidebar": {
            step: 2
        },
        "opts": [
            {
                "type": QuoteOptType.HIDDEN,
                "title": "acloud_id",
                "apikey": "acloud_id",
                "apisubsection": "address",
                "required": true,
            },
            {
                "type": QuoteOptType.TEXT,
                "title": "street",
                "apikey": "street",
                "apisubsection": "address",
                "required": true,
            },
            // {
            //     "type": QuoteOptType.TEXT,
            //     "apikey": "town",
            //     "title": "town",
            //     "apisubsection": "address",
            //     "required": true,
            // },
            {
                "type": QuoteOptType.TEXT,
                "apikey": "postcode",
                "title": "postcode",
                "apisubsection": "address",
                "required": true,
            },
            {
                "type": QuoteOptType.NUMERIC,
                "apikey": "premise_number",
                "title": "premise number",
                "apisubsection": "address",
                "required": true,
            },
            {
                "type": QuoteOptType.TEXT,
                "apikey": "flat_number",
                "title": "flat number",
                "apisubsection": "address",
                "required": false,
            },
            {
                "type": QuoteOptType.TEXT,
                "apikey": "building_name",
                "title": "building name",
                "apisubsection": "address",
                "required": false,
            },
            {
                "type": QuoteOptType.TEXT,
                "apikey": "town",
                "title": "town",
                "apisubsection": "address",
                "required": false,
            },
        ]
    },
    {
        "type": "screen",
        "title": "When should your cover start?",
        "textnext": "Select cover start date",
        "sid": QuoteScreenId.QUICK_QUOTE_STARTDATE,
        "sidnext": QuoteScreenId.QUICK_QUOTE_REVIEW,
        "infoalert": "Your insurance cover will start on the date you select.",
        "apisection": "policy",
        "desktopsidebar": {
            step: 3
        },
        "opts": [
            {
                "type": QuoteOptType.DOB,
                "title": "Cover Start Date",
                "apikey": "start_date",
                "required": true,
                "validationRule": QuoteOptValidationRule.NEXT_30_DAYS
            },
        ]

    },
    {
        "type": "screen",
        "title": "just double check your details",
        "textnext": "Get your quote",
        "sid": QuoteScreenId.QUICK_QUOTE_REVIEW,
        "sidnext": QuoteScreenId.QUICK_QUOTE_LOADING,
        "infoalert": "By submitting your details, you give umbrl the permission to retrieve information from our credit scoring and property information providers. We’ll use this data only to provide you quote, and we’ll handle it in compliance with GDPR.",
        "screensresume": [
            {
                "sid": QuoteScreenId.QUICK_QUOTE_POLICY,
                "titleKeys": ["coverage_type"]
            },
            {
                "sid": QuoteScreenId.QUICK_QUOTE_PERSONAL,
                "titleKeys": ["first_name", 'surname', 'date_of_birth', 'email']
            },
            {
                "sid": QuoteScreenId.QUICK_QUOTE_PROPERTY,
                "titleKeys": ["premise_number", 'street', 'postcode']
            },
            {
                "sid": QuoteScreenId.QUICK_QUOTE_STARTDATE,
                "titleKeys": ["start_date"]
            },
        ],
        "opts": [],
        "apisection": ""
    },
    //We crunched the numbers. Before we get to the quote, let’s double check two things.
    {
        "type": "screen",
        "title": "just double check your details",
        "textnext": "get your quote",
        "sid": QuoteScreenId.QUICK_QUOTE_LOADING,
        "sidnext": QuoteScreenId.QUICK_QUOTE_COVERS,
        "infoalert": "By submitting your details, you give umbrl the permission to retrieve information from our credit scoring and property information providers. We’ll use this data only to provide you quote, and we’ll handle it in compliance with GDPR.",
        "opts": [],
        "apisection": ""
    },
    {
        "type": "screen",
        "title": "",
        "textnext": "See quote",
        "sid": QuoteScreenId.QUICK_QUOTE_COVERS,
        "sidnext": QuoteScreenId.QUICK_QUOTE_RESULT,
        "infoalert": "By submitting your details, you give umbrl the permission to retrieve information from our credit scoring and property information providers. We’ll use this data only to provide you quote, and we’ll handle it in compliance with GDPR.",
        "opts": [
            {
                "type": QuoteOptType.HIDDEN,
                "apikey": "estimated_rebuild_cost",
                "title": "Estimated home rebuild cost",
                "apisubsection": "buildings_coverage",
                "required": false,
                // "blocktitle": "Buildings Cover Limit",
                // tip: `Based on our estimate, rebuilding your property completely could cost up to __VAL__. If you think it’s incorrect, update the value. `
            },
            {
                "type": QuoteOptType.NUMERIC_CURRENCY,
                "apikey": "rebuild_cost",
                "title": "Estimated home rebuild cost",
                "apisubsection": "buildings_coverage",
                "required": true,
                // "blocktitle": "Buildings Cover Limit",
                // tip: `Based on our estimate, rebuilding your property completely could cost up to __VAL__. If you think it’s incorrect, update the value. `
            },
            {
                "type": QuoteOptType.NUMERIC_CURRENCY,
                "apikey": "total_contents_value",
                "title": "Estimated contents value",
                "apisubsection": "contents_coverage",
                "required": true,
                // "blocktitle": "Contents Cover Limit",
                // tip:  `Based on our estimate, your contents value is __VAL__. If you think it’s incorrect, update the value. `
            },
        ],
        "apisection": "policy"
    },
    {
        "title": "",
        "type": "screen",
        "sid": QuoteScreenId.QUICK_QUOTE_RESULT,
        "sidnext": QuoteScreenId.QUICK_QUOTE_BOOSTS,
        "textnext": "Continue",
        "opts": [{
            "type": QuoteOptType.CUSTOM,
            "apikey": "selected_product_uuid",
            "title": "",
            "required": true,
        }],
        apisection: 'offer'
    },
    // {
    //     "title": "",
    //     "type": "screen",
    //     "sid": QuoteScreenId.QUOTE_CHOOSE_EXCESS,
    //     "sidnext": QuoteScreenId.QUICK_QUOTE_BOOSTS,
    //     "textnext":"Tailor your quote",
    //     "opts": [
    //         {
    //             "type": QuoteOptType.RANGE_CURRENCY,
    //             "apisubsection": "buildings_coverage",
    //             "apikey": "voluntary_excess",
    //             "title": "Buildings voluntary excess",
    //             "breakdowntitle": "Total buildings excess",
    //             "blocktitle": "Buildings claims",
    //             "required": true,
    //         },
    //         {
    //             "type": QuoteOptType.RANGE_CURRENCY,
    //             "apisubsection": "contents_coverage",
    //             "apikey": "voluntary_excess",
    //             "title": "Contents voluntary excess",
    //             "breakdowntitle": "Total contents excess",
    //             "required": true,
    //         },
    //     ],
    //     "apisection": "policy"
    // },
    {
        "title": "",
        "type": "screen",
        "sid": QuoteScreenId.QUICK_QUOTE_BOOSTS,
        "sidnext": QuoteScreenId.QUICK_QUOTE_ADDONS,
        "textnext": "Continue",
        "opts": [
            {
                "type": QuoteOptType.BOOL,
                "apikey": "BUILDINGS_LIMIT",
                apisubsection: 'boosts',
                "title": "",
                "required": false,
            },
            {
                "type": QuoteOptType.BOOL,
                "apikey": "CONTENTS_LIMIT",
                apisubsection: 'boosts',
                "title": "",
                "required": false,
            },
            {
                "type": QuoteOptType.BOOL,
                "apikey": "AWAY_FROM_THE_HOME",
                apisubsection: 'boosts',
                "title": "",
                "required": false,
            },
            {
                "type": QuoteOptType.BOOL,
                "apikey": "EMERGENCY_PACK",
                apisubsection: 'boosts',
                "title": "",
                "required": false,
            },
            {
                "type": QuoteOptType.BOOL,
                "apikey": "GARDEN",
                apisubsection: 'boosts',
                "title": "",
                "required": false,
            },
            {
                "type": QuoteOptType.BOOL,
                "apikey": "SAFETY",
                apisubsection: 'boosts',
                "title": "",
                "required": false,
            }
        ],
        "apisection": "toogles"
    },
    {
        "title": "",
        "type": "screen",
        "sid": QuoteScreenId.QUICK_QUOTE_ADDONS,
        "sidnext": QuoteScreenId.REFINE_QUOTE_LANDING,
        "textnext": "Continue",
        "opts": [
            {
                "type": QuoteOptType.TEXT,
                "apikey": "BUILDING_ACCIDENTAL_DAMAGE",
                apisubsection: 'addons',
                "title": "",
                "required": false,
            },
            {
                "type": QuoteOptType.TEXT,
                "apikey": "CONTENT_ACCIDENTAL_DAMAGE",
                apisubsection: 'addons',
                "title": "",
                "required": false,
            },
            {
                "type": QuoteOptType.BOOL,
                "apikey": "HOME_EMERGENCY_COVER",
                apisubsection: 'addons',
                "title": "",
                "required": false,
            },
            {
                "type": QuoteOptType.BOOL,
                "apikey": "LEGAL_EXPENSES_COVER",
                apisubsection: 'addons',
                "title": "",
                "required": false,
            },

        ],
        "apisection": "toogles"
    },

    {
        "title": "",
        "type": "screen",
        "sid": QuoteScreenId.REFINE_QUOTE_LANDING,
        "sidnext": QuoteScreenId.REFINE_QUOTE_PERSONS,
        "textnext": "Confirm your details",
        "opts": [],
        "apisection": ""
    },
    {
        "title": "",
        "type": "screen",
        "sid": QuoteScreenId.REFINE_QUOTE_PERSONS,
        "sidnext": QuoteScreenId.REFINE_QUOTE_BUILDING,
        "textnext": "Check details",
        "desktopsidebar": {
            step: 1
        },
        "steps": [
            QuoteScreenStepId.REFINE_MAIN_POLICY_HOLDER,
            QuoteScreenStepId.REFINE_CLAIMS,
            QuoteScreenStepId.REFINE_SECONDARY_POLICY_HOLDER,
            QuoteScreenStepId.REFINE_HOME_RESIDENTS,

        ],
        "opts": [],
        "apisection": ""
    },
    {
        "title": "",
        "type": "screen",
        "sid": QuoteScreenId.REFINE_QUOTE_BUILDING,
        "sidnext": QuoteScreenId.REFINE_QUOTE_CONTENTS,
        "textnext": "Add contents",
        "desktopsidebar": {
            step: 2
        },
        "steps": [
            QuoteScreenStepId.REFINE_BUILDING,
            // QuoteScreenStepId.REFINE_OWNERSHIP_VALUES,
            QuoteScreenStepId.REFINE_RISKS
        ],
        "opts": [],
        "apisection": ""
    },
    {
        "title": "",
        "type": "screen",
        "sid": QuoteScreenId.REFINE_QUOTE_CONTENTS,
        "sidnext": QuoteScreenId.CHOOSE_POLICY,
        "textnext": "Review your policy",
        "desktopsidebar": {
            step: 3
        },
        "apisection": "",
        "steps": [
            // QuoteScreenStepId.REFINE_TOTAL_CONTENTS,
            // QuoteScreenStepId.REFINE_COVER_INSIDE,
            // QuoteScreenStepId.REFINE_VALUABLES,
            // QuoteScreenStepId.REFINE_COVER_OUTSIDE,
            QuoteScreenStepId.REFINE_VALUABLES_INSIDE,
            // QuoteScreenStepId.REFINE_VALUABLES_OUTSIDE,
        ],
        "opts": []
    }
    // {
    //     "title": "",
    //     "type": "screen",
    //     "sid": QuoteScreenId.REFINE_QUOTE_FEATURES,
    //     "sidnext": QuoteScreenId.PAYMENT,
    //     "textnext":"continue",
    //     "apisection": "features",
    //     "opts": [
    //         {
    //             "type": QuoteOptType.CUSTOM,
    //             "apikey": "policy_type",
    //             "title": "policy type",
    //             "required": true,
    //             "optionvals": [
    //                 {
    //                     "label": "flex",
    //                     "val": "flex"
    //                 },
    //                 {
    //                     "label": "premium",
    //                     "val": "premium"
    //                 }
    //             ],
    //             "value": "flex"
    //         },
    //         {
    //             "type": QuoteOptType.RANGE_CURRENCY,
    //             "apisubsection": "flex",
    //             "apikey": "buildings_cover",
    //             "title": "buildings cover",
    //             "required": true,
    //         },
    //         {
    //             "type": QuoteOptType.RANGE_CURRENCY,
    //             "apisubsection": "flex",
    //             "apikey": "contents_cover",
    //             "title": "contents cover",
    //             "required": true,
    //         },
    //         {
    //             "type": QuoteOptType.RANGE_CURRENCY,
    //             "apisubsection": "flex",
    //             "apikey": "home_emergency",
    //             "title": "home emergency",
    //             "required": true,
    //         },
    //         {
    //             "type": QuoteOptType.RANGE_DAYS,
    //             "apisubsection": "flex",
    //             "apikey": "alternative_accomodation",
    //             "title": "alternative accomodation",
    //             "required": false,
    //         },

    //         {
    //             "type": QuoteOptType.RANGE_CURRENCY,
    //             "apisubsection": "flex",
    //             "apikey": "legal_fees",
    //             "title": "legal fees protection",
    //             "required": false,
    //         },
    //         {
    //             "type": QuoteOptType.RANGE_CURRENCY,
    //             "apisubsection": "flex",
    //             "apikey": "building_accidental_damage",
    //             "title": "building accidental damage",
    //             "required": false,
    //         },
    //         {
    //             "type": QuoteOptType.RANGE_CURRENCY,
    //             "apisubsection": "flex",
    //             "apikey": "contents_accidental_damage",
    //             "title": "contents accidental damage",
    //             "required": false,
    //         },
    //         {
    //             "type": QuoteOptType.NUMERIC_CURRENCY,
    //             "apisubsection": "premium",
    //             "apikey": "buildings_cover_premium",
    //             "title": "buildings cover",
    //             "required": false,
    //         },
    //         {
    //             "type": QuoteOptType.NUMERIC_CURRENCY,
    //             "apisubsection": "premium",
    //             "apikey": "contents_cover_premium",
    //             "title": "contents cover",
    //             "required": false,
    //         },
    //         {
    //             "type": QuoteOptType.NUMERIC_CURRENCY,
    //             "apisubsection": "premium",
    //             "apikey": "home_emergency_premium",
    //             "title": "home emergency",
    //             "required": false,
    //         },
    //         {
    //             "type": QuoteOptType.NUMERIC_CURRENCY,
    //             "apisubsection": "premium",
    //             "apikey": "alternative_accomodation_premium",
    //             "title": "alternative accomodation",
    //             "required": false,
    //         },

    //         {
    //             "type": QuoteOptType.NUMERIC_CURRENCY,
    //             "apisubsection": "premium",
    //             "apikey": "legal_fees_premium",
    //             "title": "legal fees protection",
    //             "required": false,
    //         },
    //         {
    //             "type": QuoteOptType.NUMERIC_CURRENCY,
    //             "apisubsection": "premium",
    //             "apikey": "building_accidental_damage_premium",
    //             "title": "building accidental damage",
    //             "required": false,
    //         },
    //         {
    //             "type": QuoteOptType.NUMERIC_CURRENCY,
    //             "apisubsection": "premium",
    //             "apikey": "contents_accidental_damage_premium",
    //             "title": "contents accidental damage",
    //             "required": false,
    //         },
    //         {
    //             "type": QuoteOptType.NUMERIC_CURRENCY,
    //             "apikey": "building_voluntary_excess",
    //             "title": "building voluntary excess",
    //             "required": true,
    //         },
    //         {
    //             "type": QuoteOptType.NUMERIC_CURRENCY,
    //             "apikey": "contents_voluntary_excess",
    //             "title": "contents voluntary excess",
    //             "required": true,
    //         }

    //     ]
    // }
]

export const quickQuoteDesktopSidebarSteps = [
    {
        title: 'Tell us about yourself.',
        number: 1,
    },
    {
        title: 'Where is your home?',
        number: 2,
    },
    {
        title: 'When should your cover start?',
        number: 3,
    },
]

export const refineQuoteDesktopSidebarStepsAll = [
    {
        title: 'About you',
        number: 1
    },
    {
        title: 'About your home',
        number: 2
    },
    {
        title: 'Your contents',
        number: 3
    },
    {
        title: 'Review and pay',
        number: 4
    }
]

export const refineQuoteDesktopSidebarStepsBuildings = [
    {
        title: 'About you',
        number: 1
    },
    {
        title: 'About your home',
        number: 2
    },
    {
        title: 'Review and pay',
        number: 3
    }
]

export const refineQuoteDesktopSidebarStepsContents = [
    {
        title: 'About you',
        number: 1
    },
    {
        title: 'Your contents',
        number: 2
    },
    {
        title: 'Review and pay',
        number: 3
    }
]