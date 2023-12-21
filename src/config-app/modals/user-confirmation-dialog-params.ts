export interface UserConfirmationDialogParams {
    callbackId: string;
    message: string;
    modalTitle: string;
    type: UserConfirmationDialogType;
}

export enum UserConfirmationDialogType {
    Default,
    Error,
}
