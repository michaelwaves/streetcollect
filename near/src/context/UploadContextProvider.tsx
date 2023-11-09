"use client"
import { PatentContext, UploadPatentContext } from "./upload-context";
import { EXAMPLE_PATENT } from "@/data/EXAMPLE_PATENT";
import { useReducer } from 'react'
import { PatentAction } from "@/types/PatentReducer";
import { PatentProperties } from "@/types/Patent";

const INITIAL_STATE: UploadPatentContext = {
    ...EXAMPLE_PATENT,
    index: 0,
}

const patentReducer = (state: UploadPatentContext, action: PatentAction) => {

    const { name, value } = action.payload;

    const currentArray = state.properties[name as keyof PatentProperties] || [];
    const currentAttachmentLinks = state.attachmentLinks || [];

    switch (action.type) {
        case "UPDATE_PATENT":
            return {
                ...state,
                [name]: value,
            };
        case "SET_TOKEN_ID":
            return {
                ...state,
                tokenId: value as string,
            };
        case "SET_OWNER_ID":
            return {
                ...state,
                ownerId: value as string,
            };
        case "SET_PRICE":
            return {
                ...state,
                price: value as string,
            };
        case "ADD_ATTACHMENT_LINK":
            return {
                ...state,
                [name]: [...currentAttachmentLinks, value],
            };
        case "PROPERTIES_ARRAY_ADD":
            return {
                ...state,
                properties: {
                    ...state.properties,
                    [name]: Array.from(new Set([...currentArray, value])),
                },
            }
        case "ARRAY_REMOVE":
            return {
                ...state,
                [name]: currentAttachmentLinks.filter((item: any) => item !== value),
            };
        case "PROPERTY_ARRAY_REMOVE":
            return {
                ...state,
                properties: {
                    ...state.properties,
                    [name]: currentArray.filter((item) => item !== value),
                },
            }
        case "SEARCH_PROPERTIES_AND_REMOVE":
            return {
                ...state,
                properties: {
                    ...state.properties,
                    applicationNumber: state.properties.applicationNumber?.filter((item) => item !== value),
                    patentNumber: state.properties.patentNumber?.filter((item) => item !== value),
                    pctNumber: state.properties.pctNumber?.filter((item) => item !== value),
                    internationalRegistrationNumber: state.properties.internationalRegistrationNumber?.filter((item) => item !== value),
                },
            }
        case "CLEAR_PROPERTIES":
            return {
                ...state,
                properties: {
                    ...EXAMPLE_PATENT.properties,
                },
            };
        case "CLEAR_ATTACHMENT_LINKS":
            return {
                ...state,
                attachmentLinks: [],
            };

        case "SET_INDEX":
            return {
                ...state,
                index: value as number,
            };
        case "INCREMENT_INDEX":
            return {
                ...state,
                index: state.index + 1,
            };

        case "DECREMENT_INDEX":
            return {
                ...state,
                index: state.index - 1,
            };

        default:
            return state;
    }
}


export default function UploadPatentContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(patentReducer, INITIAL_STATE);

    return (
        <PatentContext.Provider value={[state, dispatch]}>
            {children}
        </PatentContext.Provider>
    )
}