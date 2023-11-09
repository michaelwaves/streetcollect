import { ExtendedCorrespondence } from "./Epas";
import { Address } from "./Address";

export interface UserProfile {
    nearId: string,
    correspondence: ExtendedCorrespondence;
    type: "individual" | "company",
    firstName?: string,
    lastName?: string,
    middleName?: string,
    suffix?: string,
    prefix?: string,
    companyName?: string,
    address: Address,
    patents: []
}

