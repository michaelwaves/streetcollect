"use client"
import { ProfileAction } from "@/types/ProfileReducer";
import { UserProfile } from "@/types/UserProfile";
import { createContext } from "react";
import { Dispatch } from "react";

export interface ProfileContext extends UserProfile {
    index: any;
}


export const UserContext = createContext<[ProfileContext, Dispatch<ProfileAction>] | []>([]);