import { Epas } from "@/types/Epas";
export const EXAMPLE_EPAS: Epas = {
    correspondence: {
        name: 'John Doe',
        address: '123 Main St',
        email: 'johndoe@example.com',
        fax: '123-456-7890',
        phone: '987-654-3210',
        discord: 'johndoe#1234',
        slack: '@johndoe',
        instagram: '@johndoe'
    },
    conveying: [
        {
            type: 'individual',
            firstName: 'John',
            lastName: 'Doe',
            dateOfExecution: '2022-01-01'
        }
    ],
    receiving: [
        {
            type: 'individual',
            firstName: 'Jane',
            lastName: 'Smith',
            address: {
                street: '456 Elm St',
                city: 'New York',
                state: 'NY',
                country: 'USA',
                us: true
            }
        }
    ],
    properties: {
        applicationNumber: ['APN1', 'APN2'],
        patentNumber: ['PTN1', 'PTN2'],
        pctNumber: ['PCT1', 'PCT2'],
        internationalRegistrationNumber: ['IRN1', 'IRN2']
    },
    attachmentLinks: ['https://example.com/attachment1', 'https://example.com/attachment2'],
    attorneyDocketNumber: 'ABC123'
};