export interface Epas {
    correspondence: ExtendedCorrespondence,
    conveying: Conveying[],
    receiving: Receiving[],
    properties: {
        applicationNumber: string[],
        patentNumber: string[],
        pctNumber: string[],
        internationalRegistrationNumber: string[]
    },
    attachmentLinks: string[],
    attorneyDocketNumber?: string
}

export interface Correspondence {
    name: string,
    address: string,
    email: string,
    fax?: string,
    phone?: string,
}

export interface ExtendedCorrespondence extends Correspondence {
    discord?: string,
    slack?: string,
    instagram?: string,
    linkedin?: string,
}

export interface Conveying {
    type: "individual" | "company",
    firstName?: string,
    lastName?: string,
    middleName?: string,
    suffix?: string,
    prefix?: string,
    companyName?: string,
    dateOfExecution: string
}

export interface Receiving {
    type: "individual" | "company",
    firstName?: string,
    lastName?: string,
    middleName?: string,
    suffix?: string,
    prefix?: string,
    companyName?: string,
    address: {
        street: string,
        internal?: string,
        city: string,
        state: string,
        country: string,
        us: boolean,
        postalCode?: string
    },
}

export type RequiredConveyingFields<T extends Conveying> = T['type'] extends 'individual'
    ? Required<Pick<T, 'companyName'>>
    : Required<Pick<T, 'firstName' | 'lastName'>>

export type RequiredConveyingParty = RequiredConveyingFields<Conveying>;

export type RequiredReceivingFields<T extends Receiving> = T['type'] extends 'individual'
    ? Required<Pick<T, 'firstName' | 'lastName'>>
    : Required<Pick<T, 'companyName'>>;

export type RequiredAddress<T extends Receiving> = T['address']['us'] extends true
    ? Required<Pick<T['address'], 'state'>>
    : Required<Pick<T['address'], 'country'>>;

export type RequiredReceiving<T extends Receiving> = RequiredReceivingFields<T> & {
    address: RequiredAddress<T>;
};

export type RequiredReceivingParty = RequiredReceiving<Receiving>;

export interface CustomEpas extends Epas {
    _id: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
}