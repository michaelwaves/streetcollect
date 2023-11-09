function generateApplicationNumbers() {
    const seriesCodes = ['04', '06', '09']; // Possible series codes
    const serialNumbers = Array.from({ length: 10 }, (_, i) => i + 1); // Generate an array of serial numbers from 1 to 10

    const applicationNumbers = [];

    for (let i = 0; i < 10; i++) {
        const randomSeriesCode = seriesCodes[Math.floor(Math.random() * seriesCodes.length)]; // Select a random series code
        const randomSerialNumber = serialNumbers[Math.floor(Math.random() * serialNumbers.length)]; // Select a random serial number

        const applicationNumber = `${randomSeriesCode}-${randomSerialNumber.toString().padStart(6, '0')}`; // Combine the series code and serial number

        applicationNumbers.push(applicationNumber);
    }

    return applicationNumbers;
}

function generatePatentNumbers(count: number) {
    const patentNumbers = [];

    for (let i = 0; i < count; i++) {
        let patentNumber = '';

        // Generate the first character based on the permitted values
        const firstCharacter = Math.random() < 0.5 ? getRandomDigit() : getRandomAlpha();

        // Append the first character to the patent number
        patentNumber += firstCharacter;

        // Generate the remaining characters
        for (let j = 1; j < 13; j++) {
            patentNumber += Math.random() < 0.5 ? getRandomDigit() : getRandomAlphaNumeric();
        }

        // Add the generated patent number to the array
        patentNumbers.push(patentNumber);
    }

    return patentNumbers;
}

function getRandomDigit() {
    return Math.floor(Math.random() * 10).toString();
}

function getRandomAlpha() {
    const alphaChars = 'DHT';
    return alphaChars.charAt(Math.floor(Math.random() * alphaChars.length));
}

function getRandomAlphaNumeric() {
    const alphaNumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return alphaNumericChars.charAt(Math.floor(Math.random() * alphaNumericChars.length));
}

// Generate 10 patent numbers
const patentNumbers = generatePatentNumbers(10);
console.log(patentNumbers);

function generatePCTNumbers(count: number) {
    const pctNumbers = [];

    for (let i = 0; i < count; i++) {
        let pctNumber = '';

        // Generate the country code
        const countryCode = getRandomAlphaNumeric2();
        pctNumber += countryCode;

        // Generate the year
        const year = getRandomYear();
        pctNumber += year;

        // Generate the PCT number
        const pct = getRandomPCTNumber();
        pctNumber += pct;

        // Add the generated PCT number to the array
        pctNumbers.push(pctNumber);
    }

    return pctNumbers;
}

function getRandomAlphaNumeric2() {
    const alphaNumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return alphaNumericChars.charAt(Math.floor(Math.random() * alphaNumericChars.length));
}

function getRandomYear() {
    const currentYear = new Date().getFullYear();
    const year = Math.floor(Math.random() * (currentYear - 2000 + 1)) + 2000;
    return year.toString().substring(2);
}

function getRandomPCTNumber() {
    let pctNumber = '';

    if (Math.random() < 0.5) {
        // Generate 6-digit PCT number
        for (let i = 0; i < 6; i++) {
            pctNumber += Math.floor(Math.random() * 10).toString();
        }
    } else {
        // Generate 5-digit PCT number
        for (let i = 0; i < 5; i++) {
            pctNumber += Math.floor(Math.random() * 10).toString();
        }
    }

    return pctNumber;
}

// Generate 10 PCT numbers
const pctNumbers = generatePCTNumbers(10);
console.log(pctNumbers);
function generateInternationalRegistrationNumbers(count: number) {
    const registrationNumbers = [];

    for (let i = 0; i < count; i++) {
        let registrationNumber = '';

        // Generate a random six-digit number
        for (let j = 0; j < 6; j++) {
            registrationNumber += Math.floor(Math.random() * 10).toString();
        }

        // Add the generated registration number to the array
        registrationNumbers.push(registrationNumber);
    }

    return registrationNumbers;
}

// Generate 10 international registration numbers
const registrationNumbers = generateInternationalRegistrationNumbers(10);
console.log(registrationNumbers);