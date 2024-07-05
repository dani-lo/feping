export const config = {
    url: {
        preQuickquoteRequest: process.env.NEXT_PUBLIC_umbrl_pre_quickquote ?? 'https://www.umbrl.co.uk/api/v1/quotes/quick/pre',
        quickquoteRequest: process.env.NEXT_PUBLIC_umbrl_quickquote ?? 'https://www.umbrl.co.uk/api/v1/quotes/quick',
        quickquoteRetrieve: process.env.NEXT_PUBLIC_umbrl_quickquote_retrieve ?? 'https://www.umbrl.co.uk/api/v1/quotes/retrieval',
        quickquoteRefine: process.env.NEXT_PUBLIC_umbrl_refine_quote ?? 'https://www.umbrl.co.uk/api/v1/quotes/refinement',
        metadata: process.env.NEXT_PUBLIC_umbrl_metadata ?? 'https://www.umbrl.co.uk/api/v1/metadata',
        products: process.env.NEXT_PUBLIC_umbrl_products ?? 'https://www.umbrl.co.uk/api/v1/products',
        postcodeAddreses: process.env.NEXT_PUBLIC_umbrl_addresslist ?? 'https://www.umbrl.co.uk/api/v1/customers/address',
        addressDetails: process.env.NEXT_PUBLIC_acloud_getdetails ?? 'http://umbrl-api.staging.umbrl.co.uk/api/v1/customers/address/match/byId'
    },
    acloud: {
        key: process.env.NEXT_PUBLIC_x_api_key ?? '',
        clientId: process.env.NEXT_PUBLIC_x_client_id ?? ''
    }
}