"use client"

import { useReducer } from "react";
import { UserContext, ProfileContext } from "./profile-context";
import { EXAMPLE_USER_PROFILE } from "@/data/EXAMPLE_USER_PROFILE";
import { ProfileAction } from "@/types/ProfileReducer";

const INITIAL_STATE: ProfileContext = {
    ...EXAMPLE_USER_PROFILE,
    index: 0,
}

const profileReducer = (state: ProfileContext, action: ProfileAction) => {
    switch (action.type) {
        case "SET_ACCOUNT_ID":
            return {
                ...state,
                nearId: action.payload.value as string,
            };
        case "UPDATE_PROFILE":
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        case "UPDATE_CORRESPONDENCE":
            return {
                ...state,
                correspondence: {
                    ...state.correspondence,
                    [action.payload.name]: action.payload.value,
                },
            };
        case "UPDATE_ADDRESS":
            return {
                ...state,
                address: {
                    ...state.address,
                    [action.payload.name]: action.payload.value,
                },
            };

        case "SET_INDIVIDUAL":
            return {
                ...state,
                type: "individual" as "individual",
            };

        case "SET_BUSINESS":
            return {
                ...state,
                type: "company" as "individual",
            };

        case "SET_USA":
            return {
                ...state,
                address: {
                    ...state.address,
                    us: true,
                }
            };

        case "SET_NON_USA":
            return {
                ...state,
                address: {
                    ...state.address,
                    us: false,
                }
            };

        case "SET_INDEX":
            return {
                ...state,
                index: action.payload.value,
            };

        default:
            return state;
        case "DECREMENT_INDEX":
            return {
                ...state,
                index: state.index - 1,
            };
        case "INCREMENT_INDEX":
            return {
                ...state,
                index: state.index + 1,
            };
    }
}

export function ProfileFormProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(profileReducer, INITIAL_STATE)
    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    )
} 