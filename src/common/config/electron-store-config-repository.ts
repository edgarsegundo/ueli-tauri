import { Store } from "tauri-plugin-store-api";
import { ConfigRepository } from "./config-repository";
import { UserConfigOptions } from "./user-config-options";
import { mergeUserConfigWithDefault } from "../helpers/config-helpers";

export class ElectronStoreConfigRepository implements ConfigRepository {
    private readonly store: Store;
    private readonly configStoreKey = "userConfigOptions";
    private readonly defaultOptions: UserConfigOptions;

    constructor(defaultOptions: UserConfigOptions) {
        this.store = new Store(".settings.dat");
        this.defaultOptions = defaultOptions;
    }

    public async getConfig(): Promise<UserConfigOptions> {
        return new Promise((resolve) => {
            const userConfig = this.store.get(this.configStoreKey);
            resolve(mergeUserConfigWithDefault(userConfig, this.defaultOptions));
        });
    }

    public saveConfig(updatedConfig: UserConfigOptions): Promise<void> {
        return new Promise((resolve) => {
            this.store.set(this.configStoreKey, updatedConfig);
            resolve();
        });
    }

    openConfigFile(): void {
        throw new Error("Method not implemented.");
    }
}
