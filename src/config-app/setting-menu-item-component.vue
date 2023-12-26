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
import { TranslationSet } from "../common/translation/translation-set";
import { GeneralSettings } from "./general-settings";
import { UserConfigOptions } from "../common/config/user-config-options";
import { emit } from '@tauri-apps/api/event'
import Channels from '../channels';

export default defineComponent({
    name: 'setting-meny-item',
    setup() {
        const config:UserConfigOptions = inject(/* key */ 'config');
        const translations:TranslationSet = inject(/* key */ 'translations');
        const isActive = ref(false)

        const getItemName = (item: GeneralSettings | PluginSettings | SettingOsSpecific) => {
            switch (item) {
                case GeneralSettings.Appearance:
                    return translations.appearanceSettings;
                case GeneralSettings.General:
                    return translations.generalSettings;
                case GeneralSettings.SearchEngine:
                    return translations.searchEngineSettings;
                case PluginSettings.ApplicationSearch:
                    return translations.applicationSearchSettings;
                case PluginSettings.BrowserBookmarks:
                    return translations.browserBookmarks;
                case PluginSettings.Calculator:
                    return translations.calcuator;
                case PluginSettings.ColorConverter:
                    return translations.colorConverter;
                case GeneralSettings.ColorTheme:
                    return translations.colorThemeSettings;
                case PluginSettings.CurrencyConverter:
                    return translations.currencyConverter;
                case PluginSettings.Commandline:
                    return translations.commandline;
                case PluginSettings.Dictionary:
                    return translations.dictionary;
                case PluginSettings.Email:
                    return translations.email;
                case PluginSettings.FileBrowser:
                    return translations.fileBrowser;
                case PluginSettings.OperatingSystemCommands:
                    return translations.operatingSystemCommands;
                case PluginSettings.OperatingSystemSettings:
                    return translations.operatingSystemSettings;
                case PluginSettings.Shortcuts:
                    return translations.shortcutSettings;
                case PluginSettings.SimpleFolderSearch:
                    return translations.simpleFolderSearch;
                case PluginSettings.Translation:
                    return translations.translationSettingsTranslation;
                case PluginSettings.Url:
                    return translations.url;
                case PluginSettings.Weather:
                    return translations.weather;
                case PluginSettings.WebSearch:
                    return translations.websearch;
                case PluginSettings.Workflow:
                    return translations.workflows;
                // case SettingOsSpecific.ControlPanel.replace(`${platform()}:`, ""):
                case SettingOsSpecific.ControlPanel.replace(`darwin:`, ""):
                    return translations.controlPanel;
                // case SettingOsSpecific.Everything.replace(`${platform()}:`, ""):
                case SettingOsSpecific.Everything.replace(`darwin:`, ""):                    
                    return translations.everythingSearch;
                // case SettingOsSpecific.MdFind.replace(`${platform()}:`, ""):
                case SettingOsSpecific.MdFind.replace(`darwin`, ""):                    
                    return translations.mdfindSearch;
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
                    return config.applicationSearchOptions.enabled;
                case PluginSettings.BrowserBookmarks:
                    return config.browserBookmarksOptions.isEnabled;
                case PluginSettings.Calculator:
                    return config.calculatorOptions.isEnabled;
                case PluginSettings.ColorConverter:
                    return config.colorConverterOptions.isEnabled;
                case PluginSettings.Commandline:
                    return config.commandlineOptions.isEnabled;
                case PluginSettings.CurrencyConverter:
                    return config.currencyConverterOptions.isEnabled;
                case PluginSettings.Dictionary:
                    return config.dictionaryOptions.isEnabled;
                case PluginSettings.Email:
                    return config.emailOptions.isEnabled;
                case PluginSettings.FileBrowser:
                    return config.fileBrowserOptions.isEnabled;
                case PluginSettings.OperatingSystemCommands:
                    return config.operatingSystemCommandsOptions.isEnabled;
                case PluginSettings.OperatingSystemSettings:
                    return config.operatingSystemSettingsOptions.isEnabled;
                case PluginSettings.Shortcuts:
                    return config.shortcutOptions.isEnabled;
                case PluginSettings.SimpleFolderSearch:
                    return config.simpleFolderSearchOptions.isEnabled;
                case PluginSettings.Translation:
                    return config.translationOptions.enabled;
                case PluginSettings.Url:
                    return config.urlOptions.isEnabled;
                case PluginSettings.Weather:
                    return config.weatherOptions.isEnabled;
                case PluginSettings.LoremIpsum:
                    return config.loremIpsumOptions.isEnabled;
                case PluginSettings.WebSearch:
                    return config.websearchOptions.isEnabled;
                case PluginSettings.Workflow:
                    return config.workflowOptions.isEnabled;
                case SettingOsSpecific.ControlPanel.replace(`darwin:`, ""):
                // case SettingOsSpecific.ControlPanel.replace(`${platform()}:`, ""):
                    return config.controlPanelOptions.isEnabled;
                case SettingOsSpecific.Everything.replace(`darwin:`, ""):
                // case SettingOsSpecific.Everything.replace(`${platform()}:`, ""):
                    return config.everythingSearchOptions.enabled;
                case SettingOsSpecific.MdFind.replace(`darwin:`, ""):
                // case SettingOsSpecific.MdFind.replace(`${platform()}:`, ""):
                    return config.mdfindOptions.enabled;
                case SettingOsSpecific.Uwp.replace(`darwin:`, ""):
                // case SettingOsSpecific.Uwp.replace(`${platform()}:`, ""):
                    return config.uwpSearchOptions.isEnabled;
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
            translations,
            config,
            getItemName,
            getItemIcon,
            isEnabled,
            isPluginSetting,
            showSetting,
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
