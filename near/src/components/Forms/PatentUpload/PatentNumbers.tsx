import { useContext, useState, useEffect } from "react"
import { PatentContext } from "@/context/upload-context";
import UpperCaseFirstLetter from "@/utils/UpperCaseFirstLetter";
import addSpacesBeforeCapitalLetters from "@/utils/AddSpace";
import PreviousNextButtons from "./PreviousNextButtons";
import { isPatentNumber, isApplicationNumber, isInternationalRegistrationNumber, isPctNumber } from "@/utils/PatentNumberChecks";
import { separateString } from "@/utils/SeparateString";
import { removeNonAlphanumericCharacters } from "@/utils/RemoveSlashes";
import { PatentProperties } from "@/types/Patent";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";
import { NUMBERS_INFO } from "@/data/NUMBERS_INFO";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineInfoCircle } from "react-icons/ai"
import Modal from "@/components/FramerMotion/Modal/Modal";

export default function PatentNumbers() {

    const [typesIndex, setTypesIndex] = useState<number>(0);
    const [currentInput, setCurrentInput] = useState<string>("")
    const [profile, dispatch] = useContext(PatentContext);
    const [error, setError] = useState<string>("Invalid Number(s): ")
    const [infoStates, setInfoStates] = useState<boolean[]>([false, false, false, false])

    //select patent type with number keys, but interferes with input
    useEffect(() => {
        const handleKeyPress = (event: any) => {

            if (event.key == 'Enter') {
                handleInputSubmit();
            }
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }
        , []);

    if (dispatch === undefined) {
        return <div>Upload Dispatch Function is Not Defined!</div>
    }

    const numberTypes = [
        "applicationNumber", "patentNumber", "pctNumber", "internationalRegistrationNumber"
    ]

    const close = (numberIndex: number) => {
        setInfoStates(infoStates.map((state, index) => {
            if (index == numberIndex) {
                return false;
            } else {
                return state;
            }
        }))
    }

    const open = (numberIndex: number) => {
        setInfoStates(infoStates.map((state, index) => {
            if (index == numberIndex) {
                return true;
            } else {
                return state;
            }
        }))
    }

    const numberComponents = numberTypes.map((number, index) => {
        return (
            <button key={number} className={`w-full items-center text-start justify-between text-2xl p-2 animated-underline flex ${index === typesIndex ? "bg-p-5 text-black" : ""}`}
                onClick={() => setTypesIndex(index)}>
                {UpperCaseFirstLetter(addSpacesBeforeCapitalLetters(number))}
                {/*  <span className="border-2 w-12 h-12 rounded-xl flex items-center justify-center">{index + 1}</span> */}
                {/*  <Tooltip title={NUMBERS_INFO[number as keyof PatentProperties].title} text={NUMBERS_INFO[number as keyof PatentProperties].text} /> */}
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-s-3"
                    onClick={() => (infoStates[index] ? close(index) : open(index))}
                >
                    <AiOutlineInfoCircle className="w-20 h-20 text-white rounded-full" />
                </motion.div>
            </button>
        )
    })
    const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:hidden block">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>

    const displayComponents = numberTypes.map((number, index) => {
        const title = UpperCaseFirstLetter(addSpacesBeforeCapitalLetters(number))

        const numbers = profile?.properties[number as keyof PatentProperties] as string[]
        return (
            <div key={number}>
                <h2 className="text-p-5 text-2xl">{title}s Added</h2>
                {numbers?.map((number, index) => {
                    return (
                        <div key={number} className="flex flex-row w-full justify-between items-center">
                            <p key={index}>{number}</p>
                            <button onClick={() => dispatch({ type: "SEARCH_PROPERTIES_AND_REMOVE", payload: { name: numberTypes[typesIndex], value: number } })}
                            ><h3 className="hidden md:block">Remove</h3>
                                {deleteIcon}
                            </button>
                        </div>
                    )
                })}

            </div>

        )
    }
    )

    //write a function handleInputChange that on change of input, checks if the input is valid for the current type of number, based on the imported checker functions
    //if it is valid, call the dispatch function with "PROPERTIES_ARRAY_ADD" and the current type of number and the current input
    //if it is not valid, call the dispatch function with "PROPERTY_ARRAY_REMOVE" and the current type of number and the current input

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setCurrentInput(input);
    }

    const handleInputSubmit = () => {

        const numbers = separateString(currentInput);


        for (var number of numbers) {
            number = removeNonAlphanumericCharacters(number);
            switch (typesIndex) {
                case 0:
                    if (isApplicationNumber(number)) {
                        dispatch({ type: "PROPERTIES_ARRAY_ADD", payload: { name: "applicationNumber", value: number } })
                    } else {
                        console.log("invalid application number")
                        setError(error + ` ${number} `)
                    }
                    break;
                case 1:
                    if (isPatentNumber(number)) {
                        dispatch({ type: "PROPERTIES_ARRAY_ADD", payload: { name: "patentNumber", value: number } })
                    } else {
                        console.log("invalid patent number")
                        setError(error + ` ${number} `)
                    }
                    break;
                case 2:
                    if (isPctNumber(number)) {
                        dispatch({ type: "PROPERTIES_ARRAY_ADD", payload: { name: "pctNumber", value: number } })
                    } else {
                        console.log("invalid pct number")
                        setError(error + ` ${number} `)
                    }
                    break;
                case 3:
                    if (isInternationalRegistrationNumber(number)) {
                        dispatch({ type: "PROPERTIES_ARRAY_ADD", payload: { name: "internationalRegistrationNumber", value: number } })
                    } else {
                        console.log("invalid international registration number")
                        setError(error + ` ${number} `)
                    }
                    break;
            }
        }
        setCurrentInput("");
    }

    /* const handleInputSubmit = () => {
 
        if (isPatentNumber(currentInput)) {
            dispatch({ type: "PROPERTIES_ARRAY_ADD", payload: { name: "patentNumber", value: currentInput } })
        } else if (isApplicationNumber(currentInput)) {
            dispatch({ type: "PROPERTIES_ARRAY_ADD", payload: { name: "applicationNumber", value: currentInput } })
        } else if (isInternationalRegistrationNumber(currentInput)) {
            dispatch({ type: "PROPERTIES_ARRAY_ADD", payload: { name: "internationalRegistrationNumber", value: currentInput } })
        } else if (isPctNumber(currentInput)) {
            dispatch({ type: "PROPERTIES_ARRAY_ADD", payload: { name: "pctNumber", value: currentInput } })
        } else {
            dispatch({ type: "PROPERTIES_ARRAY_REMOVE", payload: { name: numberTypes[typesIndex], value: currentInput } })
        }
    } */

    return (
        <>

            <div className="md:w-[clamp(500px,50vw,800px)] w-full h-fit p-8 px-16 rounded-xl bg-s-3 flex flex-col gap-8 ">
                <h2 className="text-center text-p-5">
                    Select Number Type
                </h2>
                {numberComponents}

                <p>Input numbers one at a time or separated by spaces</p>
                <div className="w-full relative">
                    <input type="text" placeholder={UpperCaseFirstLetter(addSpacesBeforeCapitalLetters(numberTypes[typesIndex]))}
                        value={currentInput}
                        onChange={(e) => handleInputChange(e)}
                    />

                    <Image src="/enterKey.svg" height={30} width={30} alt="enter key" color="white" className=" absolute right-2 top-[16px] text-white"></Image>
                </div>
                <button onClick={() => handleInputSubmit()} className="animated-underline mx-auto flex flex-row items-center gap-2 justify-center">Submit!
                </button>
                {error != "Invalid Number(s): " && <p className="text-white p-2 border-2 rounded-xl border-red-500">{error}</p>}
                {displayComponents}
                <div className="flex flex-row justify-between w-full">
                    <button className="bg-red-500 text-2xl w-fit" onClick={() => dispatch({ type: "CLEAR_PROPERTIES", payload: { name: "", value: "" } })}>Clear All</button>
                    <button className="text-4xl animated-underline"
                        onClick={() => dispatch({ type: "INCREMENT_INDEX", payload: { name: "", value: "" } })}
                    >Next</button>
                </div>

            </div>
            <AnimatePresence>
                {infoStates[typesIndex] && <Modal handleClose={() => close(typesIndex)} text={NUMBERS_INFO[numberTypes[typesIndex] as keyof PatentProperties].text} />}
            </AnimatePresence>

        </>
    )
}
