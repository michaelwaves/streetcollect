import { UserProfile } from "@/types/UserProfile";

export const EXAMPLE_USER_PROFILE: UserProfile = {
    nearId: "",
    correspondence: {
        name: "",
        address: "",
        email: "",
        fax: "",
        phone: "",
        discord: "",
        slack: "",
        instagram: "",
        linkedin: ""
    },
    type: "individual",
    firstName: "",
    lastName: "",
    middleName: "",
    suffix: "",
    prefix: "",
    companyName: "",
    address: {
        street: "",
        internal: "",
        city: "",
        state: "",
        country: "",
        us: true,
        postalCode: ""
    },
    patents: []
};