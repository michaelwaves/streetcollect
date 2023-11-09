import { createContext } from "react";
import { Patent } from "@/types/Patent";
import { Dispatch } from "react";
import { PatentAction } from "@/types/PatentReducer";
export interface UploadPatentContext extends Patent {
    index: number;
}

export const PatentContext = createContext<[UploadPatentContext, Dispatch<PatentAction>] | []>([]);