export default function addSpacesBeforeCapitalLetters(str: string) {
    return str.replace(/(?<!^)([A-Z])/g, ' \$1');
}