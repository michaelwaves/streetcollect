export function isApplicationNumber(applicationNumber: string): boolean {
    const seriesCodeRegex = /^(0[4-9]|1[0-9]|2[0-9])[/\-]?[0-9]{6}$/;

    return seriesCodeRegex.test(applicationNumber);
}

export function isPatentNumber(patentNumber: string): boolean {
    const patentNumberRegex = /^([0-9]{1,13}|(D|H|T|PP|RE)[A-Z0-9]{0,11})$/;

    return patentNumberRegex.test(patentNumber);
}

export function isFormatOne(pctNumber: string): boolean {
    /* const formatOneRegex = /^US(\d{2})\d{2}(\/)?\d{6}$/;

    return formatOneRegex.test(pctNumber); */
    const regex = /^([A-Z]{2})(\d{4})[\/\s]?(\d{6})$/;

    return regex.test(pctNumber);
}

export function isFormatTwo(pctNumber: string): boolean {
    /*  const formatTwoRegex = /^US(\d{2})\d{2}(\/)?\d{5}$/;
 
     return formatTwoRegex.test(pctNumber); */
    const regex = /^([A-Z]{2})(\d{2})[\/\s]?(\d{5})$/;

    if (!regex.test(pctNumber)) {
        return false;
    }

    const year = pctNumber.substr(2, 2);
    const formattedYear = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(Number(year));
    const formattedInput = pctNumber.replace(year, formattedYear);

    return formattedInput === pctNumber;
}

export function isPctNumber(pctNumber: string): boolean {
    if (pctNumber.length === 9 || pctNumber.length === 12) {
        if (isFormatOne(pctNumber) || isFormatTwo(pctNumber)) {
            return true;
        }
    }

    return false;
}

export function isInternationalRegistrationNumber(registrationNumber: string): boolean {
    // Check if the length is 6 digits
    if (registrationNumber.length === 6) {
        // Check if the registration number consists only of digits
        if (/^\d+$/.test(registrationNumber)) {
            return true;
        }
    }

    return false;
}