import { UserConfigOptions } from "./user-config-options";

export interface ConfigRepository {
    getConfig(): Promise<UserConfigOptions>;
    // getConfig(): UserConfigOptions;
    // getConfig(): Promise<UserConfigOptions>;
    saveConfig(config: UserConfigOptions): Promise<void>;
    openConfigFile(): void;
}