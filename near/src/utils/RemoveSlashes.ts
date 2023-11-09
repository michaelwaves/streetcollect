export function removeSlashes(str: string) {
    return str.replace(/[/]/g, '');
}

export function removeNonNumericCharacters(str: string) {
    return str.replace(/[^0-9]/g, '');
}

export function removeNonAlphanumericCharacters(str: string) {
    return str.replace(/[^a-zA-Z0-9]/g, '');
}