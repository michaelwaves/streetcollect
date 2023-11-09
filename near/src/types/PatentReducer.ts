export interface PatentAction {
    type: string;
    payload: {
        name: string,
        value: string | number,
    }
}