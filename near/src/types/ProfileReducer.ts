export interface ProfileAction {
    type: string;
    payload: {
        name: string,
        value: string | boolean | number,
    }
}