// callbackManager.ts

interface CallbackMapping {
    [key: string]: () => void;
}

const callbackMapping: CallbackMapping = {};

export function registerCallback(callbackId: string, callbackFunction: () => void): string {
    callbackMapping[callbackId] = callbackFunction;
    return callbackId;
};

export function getCallback(callbackId: string): (() => void) | undefined {
    return callbackMapping[callbackId];
};
