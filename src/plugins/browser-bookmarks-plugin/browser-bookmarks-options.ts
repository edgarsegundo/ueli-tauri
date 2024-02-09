import { Browser } from "./browser";

export interface BrowserBookmarksOptions {
    isEnabled: boolean;
    browser: Browser;
}

export const defaultBrowserBookmarksOptions: BrowserBookmarksOptions = {
    browser: Browser.GoogleChrome,
    isEnabled: true,
};
