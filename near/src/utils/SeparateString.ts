export function separateString(input: string): string[] {
    const regex = /[,\s\n]+/; // Regular expression to match spaces, commas, and newlines

    return input.split(regex);
}