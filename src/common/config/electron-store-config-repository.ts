import { Store } from "tauri-plugin-store-api";
import { ConfigRepository } from "./config-repository";
import { UserConfigOptions } from "./user-config-options";
import { mergeUserConfigWithDefault } from "../helpers/config-helpers";


export class ElectronStoreConfigRepository implements ConfigRepository {
    private store: Store;
    private configStoreKey = "userConfigOptions";
    private defaultOptions: UserConfigOptions;
    // private readonly store: Store;
    // private readonly configStoreKey = "userConfigOptions";
    // private readonly defaultOptions: UserConfigOptions;

    constructor(defaultOptions: UserConfigOptions) {
        this.store = new Store(".ueli-settings.dat");
        this.defaultOptions = defaultOptions;
    }

    public async getConfig(): Promise<UserConfigOptions> {
        const userConfig:UserConfigOptions | null = await this.store.get(this.configStoreKey);
        // alert("aha: " + userConfig?.generalOptions.language)
        return mergeUserConfigWithDefault(userConfig, this.defaultOptions);
    }

    // public getConfig(): Promise<UserConfigOptions> {

    //     const userConfig = this.store.get(this.configStoreKey);
    //     return new Promise((resolve) => {

    //         const userConfig = this.store.get(this.configStoreKey);            
    //         this.store.set(this.configStoreKey, updatedConfig);
    //         this.store.save();
    //         resolve();
    //     });
    // }

    public saveConfig(updatedConfig: UserConfigOptions): Promise<void> {
        return new Promise((resolve) => {
            // alert(updatedConfig.generalOptions.language);
            this.store.set(this.configStoreKey, updatedConfig);
            this.store.save();
            resolve();
        });
    }

    openConfigFile(): void {
        throw new Error("Method not implemented.");
    }
}
