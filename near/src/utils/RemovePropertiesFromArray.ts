export function removePropertiesFromArray(array: string[], obj: any): any {
    const newObj = { ...obj }; // Create a shallow copy of the object

    for (let property of array) {
        delete newObj[property];
    }

    return newObj;
}