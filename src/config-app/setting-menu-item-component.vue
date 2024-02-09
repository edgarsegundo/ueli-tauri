<template>
<li @click="showSetting(item)">
    <a :class="{ 'is-active' : isActive }">
        <div class="settings__sidebar-name-container">
            <span v-if="getItemIcon(item).length > 0" class="icon" v-html="getItemIcon(item)"></span>
            <span class="settings__sidebar-name">
                {{ getItemName(item) }}
            </span>
            <span v-if="isPluginSetting(item)" class="is-size-7" :class="{ 'has-text-success' : isEnabled(item), 'has-text-danger' : !isEnabled(item) }">
                <i class="fas fa-circle"></i>
            </span>
        </div>
    </a>
</li>
</template>


<script lang="ts">

import { defineComponent, ref, inject,
} from 'vue';
import { PluginSettings } from "./plugin-settings";
import { SettingOsSpecific } from "./settings-os-specific";
// import { TranslationSet } from "../common/translation/translation-set";
import { GeneralSettings } from "./general-settings";
// import { UserConfigOptions } from "../common/config/user-config-options";
import { emit } from '@tauri-apps/api/event'
import Channels from '../channels';

export default defineComponent({
    name: 'setting-meny-item',
    setup() {
        // const config:UserConfigOptions = inject(/* key */ 'config');
        // const translations:TranslationSet = inject(/* key */ 'translations');

        const appState:any = inject(/* key */ 'appState');
        // const config:UserConfigOptions = reactiveAppState.config;
        // const translations:TranslationSet = reactiveAppState.translations;

        const isActive = ref(false)

        const getItemName = (item: GeneralSettings | PluginSettings | SettingOsSpecific) => {
            switch (item) {
                case GeneralSettings.Appearance:
                    return appState.translations.appearanceSettings;
                case GeneralSettings.General:
                    return appState.translations.generalSettings;
                case GeneralSettings.SearchEngine:
                    return appState.translations.searchEngineSettings;
                case PluginSettings.ApplicationSearch:
                    return appState.translations.applicationSearchSettings;
                case PluginSettings.BrowserBookmarks:
                    return appState.translations.browserBookmarks;
                case PluginSettings.Calculator:
                    return appState.translations.calcuator;
                case PluginSettings.ColorConverter:
                    return appState.translations.colorConverter;
                case GeneralSettings.ColorTheme:
                    return appState.translations.colorThemeSettings;
                case PluginSettings.CurrencyConverter:
                    return appState.translations.currencyConverter;
                case PluginSettings.Commandline:
                    return appState.translations.commandline;
                case PluginSettings.Dictionary:
                    return appState.translations.dictionary;
                case PluginSettings.Email:
                    return appState.translations.email;
                case PluginSettings.FileBrowser:
                    return appState.translations.fileBrowser;
                case PluginSettings.OperatingSystemCommands:
                    return appState.translations.operatingSystemCommands;
                case PluginSettings.OperatingSystemSettings:
                    return appState.translations.operatingSystemSettings;
                case PluginSettings.Shortcuts:
                    return appState.translations.shortcutSettings;
                case PluginSettings.SimpleFolderSearch:
                    return appState.translations.simpleFolderSearch;
                case PluginSettings.Translation:
                    return appState.translations.translationSettingsTranslation;
                case PluginSettings.Url:
                    return appState.translations.url;
                case PluginSettings.Weather:
                    return appState.translations.weather;
                case PluginSettings.WebSearch:
                    return appState.translations.websearch;
                case PluginSettings.Workflow:
                    return appState.translations.workflows;
                // case SettingOsSpecific.ControlPanel.replace(`${platform()}:`, ""):
                case SettingOsSpecific.ControlPanel.replace(`darwin:`, ""):
                    return appState.translations.controlPanel;
                // case SettingOsSpecific.Everything.replace(`${platform()}:`, ""):
                case SettingOsSpecific.Everything.replace(`darwin:`, ""):                    
                    return appState.translations.everythingSearch;
                // case SettingOsSpecific.MdFind.replace(`${platform()}:`, ""):
                case SettingOsSpecific.MdFind.replace(`darwin`, ""):                    
                    return appState.translations.mdfindSearch;
                // case SettingOsSpecific.Uwp.replace(`${platform()}:`, ""):
                case SettingOsSpecific.Uwp.replace(`darwin`, ""):                    
                    return "UWP";
                default:
                    return item;
            }

        };

        const getItemIcon = (item: GeneralSettings): string => {
            switch (item) {
                case GeneralSettings.Appearance:
                    return `<i class="fas fa-eye"></i>`;
                case GeneralSettings.ColorTheme:
                    return `<i class="fas fa-palette"></i>`;
                case GeneralSettings.General:
                    return `<i class="fas fa-cog"></i>`;
                case GeneralSettings.SearchEngine:
                    return `<i class="fas fa-search"></i>`;
                default:
                    return "";
            }
        };

        const isEnabled = (item: GeneralSettings | PluginSettings | SettingOsSpecific): boolean => {
            switch (item) {
                case PluginSettings.ApplicationSearch:
                    return appState.config.applicationSearchOptions.enabled;
                case PluginSettings.BrowserBookmarks:
                    return appState.config.browserBookmarksOptions.isEnabled;
                case PluginSettings.Calculator:
                    return appState.config.calculatorOptions.isEnabled;
                case PluginSettings.ColorConverter:
                    return appState.config.colorConverterOptions.isEnabled;
                case PluginSettings.Commandline:
                    return appState.config.commandlineOptions.isEnabled;
                case PluginSettings.CurrencyConverter:
                    return appState.config.currencyConverterOptions.isEnabled;
                case PluginSettings.Dictionary:
                    return appState.config.dictionaryOptions.isEnabled;
                case PluginSettings.Email:
                    return appState.config.emailOptions.isEnabled;
                case PluginSettings.FileBrowser:
                    return appState.config.fileBrowserOptions.isEnabled;
                case PluginSettings.OperatingSystemCommands:
                    return appState.config.operatingSystemCommandsOptions.isEnabled;
                case PluginSettings.OperatingSystemSettings:
                    return appState.config.operatingSystemSettingsOptions.isEnabled;
                case PluginSettings.Shortcuts:
                    return appState.config.shortcutOptions.isEnabled;
                case PluginSettings.SimpleFolderSearch:
                    return appState.config.simpleFolderSearchOptions.isEnabled;
                case PluginSettings.Translation:
                    return appState.config.translationOptions.enabled;
                case PluginSettings.Url:
                    return appState.config.urlOptions.isEnabled;
                case PluginSettings.Weather:
                    return appState.config.weatherOptions.isEnabled;
                case PluginSettings.LoremIpsum:
                    return appState.config.loremIpsumOptions.isEnabled;
                case PluginSettings.WebSearch:
                    return appState.config.websearchOptions.isEnabled;
                case PluginSettings.Workflow:
                    return appState.config.workflowOptions.isEnabled;
                case SettingOsSpecific.ControlPanel.replace(`darwin:`, ""):
                // case SettingOsSpecific.ControlPanel.replace(`${platform()}:`, ""):
                    return appState.config.controlPanelOptions.isEnabled;
                case SettingOsSpecific.Everything.replace(`darwin:`, ""):
                // case SettingOsSpecific.Everything.replace(`${platform()}:`, ""):
                    return appState.config.everythingSearchOptions.enabled;
                case SettingOsSpecific.MdFind.replace(`darwin:`, ""):
                // case SettingOsSpecific.MdFind.replace(`${platform()}:`, ""):
                    return appState.config.mdfindOptions.enabled;
                case SettingOsSpecific.Uwp.replace(`darwin:`, ""):
                // case SettingOsSpecific.Uwp.replace(`${platform()}:`, ""):
                    return appState.config.uwpSearchOptions.isEnabled;
                default:
                    return false;
            }
        };

        const isPluginSetting = (item: GeneralSettings | PluginSettings | SettingOsSpecific): boolean => {
            const allPluginSettings = [
                ...Object.values(PluginSettings).map((setting) => setting.toString()),
                ...Object.values(SettingOsSpecific).map((setting) => setting.toString().replace(`darwin:`, "")),
                // ...Object.values(SettingOsSpecific).map((setting) => setting.toString().replace(`${platform()}:`, "")),
            ];

            return allPluginSettings.find((setting) => setting === item) !== undefined;
        };

        const showSetting = (settingName: GeneralSettings) => {
            emit(Channels.getInstance().get("show_setting"), {
                settingName: settingName,
            });

            // vueEventDispatcher.$emit(VueEventChannels.show_setting, this.item);
        };

        return {
            isActive,
            // translations,
            // config,
            getItemName,
            getItemIcon,
            isEnabled,
            isPluginSetting,
            showSetting,
            appState
        };
    },
    mounted() {
//         vueEventDispatcher.$on(VueEventChannels.showSetting, (item: string) => {
//             this.isActive = this.item === item;
//         });
    },
    props: ["item"],

});

</script>


<style scoped>
</style>
