export interface Patent {
    tokenId?: string,
    ownerId?: string,
    title: string,
    description: string,
    price: string,
    properties: {
        applicationNumber?: string[],
        patentNumber?: string[],
        pctNumber?: string[],
        internationalRegistrationNumber?: string[]
    },
    attachmentLinks: string[],
    attorneyDocketNumber?: string
}


export interface PatentProperties {
    applicationNumber?: string[],
    patentNumber?: string[],
    pctNumber?: string[],
    internationalRegistrationNumber?: string[]
}