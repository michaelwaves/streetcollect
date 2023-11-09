export const NUMBERS_INFO = {
    applicationNumber: {
        title: 'Application Number',
        text: 'The application number is comprised of 2 digit series codes and a 6 digit numeric serial number. Enter the two-digit series code followed by the six-digit serial number assigned to a patent application. The earliest series code begins with 04. A slash " / " or hyphen " - " may be placed between the series code and the serial number. Patent Application Series code may begin with either a 0, 1 or 2. Patent provisional numbers begin with a 6. Patent ReExamination application numbers begin with a 9. No other values will be permitted to be entered in the first position of an application number.'
    },
    patentNumber: {
        title: 'Patent Number',
        text: 'Enter the patent number for the issued US patent. Data entry is limited to thirteen digits. Patent numbers less than thirteen digits may also be entered. Permitted values in the first position when providing a numeric patent number are 0-9. For alphanumeric patent number types, the user may enter a "D", "H" or "T" in the first position or "PP" or "RE" in the first two positions. No other combinations of alpha and numeric characters will be permitted for data entry.'
    },
    pctNumber: {
        title: "PCT Number",
        text: `Enter the US assignment patent cooperation treaty number for the US property. Data entry is limited to nine or twelve digits. PCT numbers equal to twelve digits must be entered using 2 digit county code, 4 digit year and 6 digit PCT number (if the PCT number is less than six digits enter with preceding zeros).
Format: 1 2 (country) 3 4 5 6(Year) 7 8 9 10 11 12(PCT Number) (Example US2011123456 or US2011/123456, the slash may be included however it will be recorded without the slash '/' mark.)
PCT numbers equal to nine digits must be entered using 2 digit county code, 2 digit year and 5 digit PCT number (if the PCT number is less than five digits enter with preceding zeros).
Format: 1 2 (country) 3 4 (Year) 5 6 7 8 9(PCT Number) (Example US1112345 or US11/12345, the slash may be included however it will be recorded without the slash '/' mark.)
`
    },
    internationalRegistrationNumber: {
        title: "International Registration Number",
        text: 'Enter the international registration number for the international design application designating the US. Data entry is limited to six digits with no trailing suffix or letter. Do not include the leading "DM" or the leading slash " / " as part of the entered data. Note: When the international design application has already been assigned a US application number, the property may be recorded using the assigned US application number in lieu of the international registration number in accordance with the above section titled "application number."'
    }
}