<template>

<h1>Edgar Rezende de Paula Segundo</h1>
</template>

<script lang="ts">

// import Vue from "vue";
// import { vueEventDispatcher } from "../vue-event-dispatcher";
// import { VueEventChannels } from "../vue-event-channels";
// import { UserConfigOptions } from "../../common/config/user-config-options";
// import { join } from "path";
// import { defaultGeneralOptions } from "../../common/config/general-options";
// import { GlobalHotKeyModifier } from "../../common/global-hot-key/global-hot-key-modifier";
// import { GlobalHotKeyKey } from "../../common/global-hot-key/global-hot-key-key";
// import { Language } from "../../common/translation/language";
// import { getFilePath, getFolderPath } from "../dialogs";
// import { NotificationType } from "../../common/notification-type";

// import { TranslationSet } from "../../src/common/translation/translation-set";

// import { FileHelpers } from "../../common/helpers/file-helpers";
// import { isValidJson, mergeUserConfigWithDefault } from "../../common/helpers/config-helpers";
// import { defaultUserConfigOptions } from "../../common/config/user-config-options";
// import { GeneralSettings } from "./general-settings";
// import { UserConfirmationDialogParams, UserConfirmationDialogType } from "./modals/user-confirmation-dialog-params";
// import { UpdateCheckResult } from "../../common/update-check-result";
// import { isDev } from "../../common/is-dev";
// import { getCurrentOperatingSystem } from "../../common/helpers/operating-system-helpers";
// import { platform } from "os";
// import { version } from "../../../package.json";
// import { deepCopy } from "../../common/helpers/object-helpers";
// import { OperatingSystem } from "../../common/operating-system";

import { Store } from "tauri-plugin-store-api";
import { emit } from '@tauri-apps/api/event'
import Channels from '../channels';


import { defineComponent, // ref, computed, onMounted, onUnmounted, defineProps, defineEmits, 
} from 'vue';
import { UserConfigOptions } from "../common/config/user-config-options";

// Import your types, constants, and helper functions


// const operatingSystem = getCurrentOperatingSystem(platform());
// const appIsInDevelopment = isDev(process.execPath);


// interface UpdateStatus {
//     checking: boolean;
//     downloading: boolean;
//     errorOnUpdateCheck: boolean;
//     latestVersionRunning: boolean;
//     updateAvailable: boolean;
// }

// const initialUpdateStatus: UpdateStatus = {
//     checking: true,
//     downloading: false,
//     errorOnUpdateCheck: false,
//     latestVersionRunning: false,
//     updateAvailable: false,
// };

// const appInfo = {
//     electron: "1.0.0", // process.versions.electron,
//     node: "14.4.4", // process.versions.node,
//     ueli: "1.0.0", // version,
//     v8: "1.0.0" // process.versions.v8,
// };

// const initialConfig = new ElectronStoreConfigRepository(deepCopy(defaultUserConfigOptions))

export default defineComponent({
    name: 'general-settings',

    setup() {

        emit(Channels.getInstance().get("console_log_message"), {
            theMessage: `🦄 (-22)`,
        })


        const asyncFunctionGet = async () => {

            emit(Channels.getInstance().get("console_log_message"), {
                theMessage:  `🦄 (5)`,
            })

            const store = new Store(".settings.dat");
            const appearanceOptions:UserConfigOptions | null = await store.get("appearanceOptions");

            // const val: UserConfigOptions | null = await store.get("some-key");

            // let value = val ? val["value"] : 0;
            

            emit(Channels.getInstance().get("console_log_message"), {
                theMessage: `🦄 appearanceOptions: (${appearanceOptions})`,
            })

            // emit(Channels.getInstance().get("console_log_message"), {
            //     theMessage:  `🦄 (99)`,
            // })


        };

        asyncFunctionGet();



        // Define your methods
        const clearExecutionLog = () => {
            // const translations: TranslationSet = this.translations;
            
            // const userConfirmationDialogParams: UserConfirmationDialogParams = {
            //     callback: () => {
            //         vueEventDispatcher.$emit(VueEventChannels.clearExecutionLogConfirmed);
            //     },
            //     message: translations.generalSettingsClearExecutionLogWarning,
            //     modalTitle: translations.clearExecutionLog,
            //     type: UserConfirmationDialogType.Default,
            // };
            // vueEventDispatcher.$emit(VueEventChannels.settingsConfirmation, userConfirmationDialogParams);
        };

        return {
            clearExecutionLog,
        };
    }
});

// const { config, translations } = defineProps(['config', 'translations']);
// const emits = defineEmits();

// // const appInfo = ref(appInfo);
// const appIsInDevelopment = ref(true);
// const availableLanguages = computed(() =>
//   Object.values(Language).map((language) => language)
// );
// const dropdownVisible = ref(false);
// const globalHotKeyKeys = computed(() =>
//   Object.values(GlobalHotKeyKey).map((key) => key)
// );
// const globalHotKeyModifiers = computed(() =>
//   Object.values(GlobalHotKeyModifier).map((modifier) => modifier)
// );
// const settingName = ref(GeneralSettings.General);
// const updateStatus = ref(deepCopy(initialUpdateStatus));
// const visible = ref(false);

// // Define your methods
// const clearExecutionLog = () => {
//     const translations: TranslationSet = this.translations;
//     const userConfirmationDialogParams: UserConfirmationDialogParams = {
//         callback: () => {
//             vueEventDispatcher.$emit(VueEventChannels.clearExecutionLogConfirmed);
//         },
//         message: translations.generalSettingsClearExecutionLogWarning,
//         modalTitle: translations.clearExecutionLog,
//         type: UserConfirmationDialogType.Default,
//     };
//     vueEventDispatcher.$emit(VueEventChannels.settingsConfirmation, userConfirmationDialogParams);
// };



// const dropdownTrigger = () => {
//   dropdownVisible.value = !dropdownVisible.value;
// };

// const exportCurrentSettings = () => {
//   // Implement your exportCurrentSettings logic
// };

// // Continue defining your other methods...

// // Event listeners
// onMounted(() => {
//   // Implement your onMounted logic
// });

// onUnmounted(() => {
//   // Implement your onUnmounted logic
// });

// // Emit events
// const emitShowSetting = (settingName: string) => {
//   emits('showSetting', settingName);
// };

// const emitCheckForUpdateResponse = (updateCheckResult: UpdateCheckResult) => {
//   emits('checkForUpdateResponse', updateCheckResult);
// };

// // Check for update on component mount
// setTimeout(() => {
//   checkForUpdate();
// }, 500);











// export default defineComponent({
//   name: 'Config',

//   setup() {


// export const generalSettingsComponent = Vue.extend({
//     data() {
//         return {
//             appInfo,
//             appIsInDevelopment,
//             availableLanguages: Object.values(Language).map((language) => language),
//             dropdownVisible: false,
//             globalHotKeyKeys: Object.values(GlobalHotKeyKey).map((key) => key),
//             globalHotKeyModifiers: Object.values(GlobalHotKeyModifier).map((modifier) => modifier),
//             settingName: GeneralSettings.General,
//             updateStatus: deepCopy(initialUpdateStatus),
//             visible: false,
//         };
//     },
//     methods: {
//         clearExecutionLog() {
//             const translations: TranslationSet = this.translations;
//             const userConfirmationDialogParams: UserConfirmationDialogParams = {
//                 callback: () => {
//                     vueEventDispatcher.$emit(VueEventChannels.clearExecutionLogConfirmed);
//                 },
//                 message: translations.generalSettingsClearExecutionLogWarning,
//                 modalTitle: translations.clearExecutionLog,
//                 type: UserConfirmationDialogType.Default,
//             };
//             vueEventDispatcher.$emit(VueEventChannels.settingsConfirmation, userConfirmationDialogParams);
//         },
//         dropdownTrigger() {
//             this.dropdownVisible = !this.dropdownVisible;
//         },
//         exportCurrentSettings() {
//             getFolderPath()
//                 .then((filePath: string) => {
//                     const config: UserConfigOptions = this.config;
//                     const translations: TranslationSet = this.translations;
//                     const settingsFilePath = join(filePath, "ueli.config.json");
//                     FileHelpers.writeFile(settingsFilePath, JSON.stringify(config, undefined, 2))
//                         .then(() =>
//                             vueEventDispatcher.$emit(
//                                 VueEventChannels.notification,
//                                 translations.generalSettingsSuccessfullyExportedSettings,
//                                 NotificationType.Info,
//                             ),
//                         )
//                         .catch((err) =>
//                             vueEventDispatcher.$emit(VueEventChannels.notification, err, NotificationType.Error),
//                         );
//                 })
//                 .catch(() => {
//                     // do nothing when no folder selected
//                 });
//         },
//         getTranslatedGlobalHotKeyModifier(hotkeyModifier: GlobalHotKeyModifier): string {
//             const translations: TranslationSet = this.translations;
//             switch (hotkeyModifier) {
//                 case GlobalHotKeyModifier.Alt:
//                     return translations.hotkeyModifierAlt;
//                 case GlobalHotKeyModifier.AltGr:
//                     return translations.hotkeyModifierAltGr;
//                 case GlobalHotKeyModifier.Command:
//                     return translations.hotkeyModifierCommand;
//                 case GlobalHotKeyModifier.Control:
//                     return translations.hotkeyModifierControl;
//                 case GlobalHotKeyModifier.Option:
//                     return translations.hotkeyModifierOption;
//                 case GlobalHotKeyModifier.Shift:
//                     return translations.hotkeyModifierShift;
//                 case GlobalHotKeyModifier.Super:
//                     return translations.hotkeyModifierSuper;
//                 default:
//                     return hotkeyModifier;
//             }
//         },
//         getTranslatedGlobalHotKeyKey(hotkeyKey: GlobalHotKeyKey): string {
//             const translations: TranslationSet = this.translations;
//             switch (hotkeyKey) {
//                 case GlobalHotKeyKey.Backspace:
//                     return translations.hotkeyKeyBackspace;
//                 case GlobalHotKeyKey.Delete:
//                     return translations.hotkeyKeyDelete;
//                 case GlobalHotKeyKey.Down:
//                     return translations.hotkeyKeyDown;
//                 case GlobalHotKeyKey.End:
//                     return translations.hotkeyKeyEnd;
//                 case GlobalHotKeyKey.Escape:
//                     return translations.hotkeyKeyEscape;
//                 case GlobalHotKeyKey.Home:
//                     return translations.hotkeyKeyHome;
//                 case GlobalHotKeyKey.Insert:
//                     return translations.hotkeyKeyInsert;
//                 case GlobalHotKeyKey.Left:
//                     return translations.hotkeyKeyLeft;
//                 case GlobalHotKeyKey.PageDown:
//                     return translations.hotkeyKeyPageDown;
//                 case GlobalHotKeyKey.PageUp:
//                     return translations.hotkeyKeyPageUp;
//                 case GlobalHotKeyKey.Plus:
//                     return translations.hotkeyKeyPlus;
//                 case GlobalHotKeyKey.Return:
//                     return translations.hotkeyKeyReturn;
//                 case GlobalHotKeyKey.Right:
//                     return translations.hotkeyKeyRight;
//                 case GlobalHotKeyKey.Space:
//                     return translations.hotkeyKeySpace;
//                 case GlobalHotKeyKey.Tab:
//                     return translations.hotkeyKeyTab;
//                 case GlobalHotKeyKey.Up:
//                     return translations.hotkeyKeyUp;
//                 default:
//                     return hotkeyKey;
//             }
//         },
//         importSettings() {
//             const translations: TranslationSet = this.translations;
//             const filter: Electron.FileFilter = {
//                 extensions: ["json"],
//                 name: translations.generalSettingsImportFileFilterJsonFiles,
//             };
//             getFilePath([filter])
//                 .then((filePath) => {
//                     FileHelpers.readFile(filePath)
//                         .then((fileContent) => {
//                             if (isValidJson(fileContent)) {
//                                 const userConfig: UserConfigOptions = JSON.parse(fileContent);
//                                 const config: UserConfigOptions = mergeUserConfigWithDefault(
//                                     userConfig,
//                                     defaultUserConfigOptions,
//                                 );
//                                 this.config = config;
//                                 this.updateConfig();
//                             } else {
//                                 vueEventDispatcher.$emit(
//                                     VueEventChannels.notification,
//                                     translations.generalSettingsImportErrorInvalidConfig,
//                                     NotificationType.Error,
//                                 );
//                             }
//                         })
//                         .catch((err) =>
//                             vueEventDispatcher.$emit(VueEventChannels.notification, err, NotificationType.Error),
//                         )
//                         .then(() => (this.dropdownVisible = false));
//                 })
//                 .catch(() => {
//                     // do nothing if no file selected
//                 });
//         },
//         openDebugLog() {
//             vueEventDispatcher.$emit(VueEventChannels.openDebugLogRequested);
//         },
//         openTempFolder() {
//             vueEventDispatcher.$emit(VueEventChannels.openTempFolderRequested);
//         },
//         resetAll() {
//             const translations: TranslationSet = this.translations;
//             const userConfirmationDialogParams: UserConfirmationDialogParams = {
//                 callback: () => {
//                     const config: UserConfigOptions = this.config;
//                     config.generalOptions = deepCopy(defaultGeneralOptions);
//                     this.updateConfig();
//                 },
//                 message: translations.generalSettingsResetWarning,
//                 modalTitle: translations.resetToDefault,
//                 type: UserConfirmationDialogType.Default,
//             };
//             vueEventDispatcher.$emit(VueEventChannels.settingsConfirmation, userConfirmationDialogParams);
//         },
//         resetAllSettingsToDefault() {
//             const translations: TranslationSet = this.translations;
//             const userConfirmationDialogParams: UserConfirmationDialogParams = {
//                 callback: () => {
//                     this.config = deepCopy(defaultUserConfigOptions);
//                     this.updateConfig(true);
//                     this.dropdownVisible = false;
//                 },
//                 message: translations.generalSettingsResetAllSettingsWarning,
//                 modalTitle: translations.resetToDefault,
//                 type: UserConfirmationDialogType.Error,
//             };
//             vueEventDispatcher.$emit(VueEventChannels.settingsConfirmation, userConfirmationDialogParams);
//         },
//         updateConfig(needsIndexRefresh?: boolean) {
//             const config: UserConfigOptions = this.config;
//             if (config.generalOptions.rememberWindowPosition) {
//                 config.generalOptions.showAlwaysOnPrimaryDisplay = false;
//             }
//             if (config.generalOptions.rescanIntervalInSeconds < 10) {
//                 config.generalOptions.rescanIntervalInSeconds = 10;
//             }
//             vueEventDispatcher.$emit(VueEventChannels.configUpdated, this.config, needsIndexRefresh);
//         },
//         checkForUpdate() {
//             vueEventDispatcher.$emit(VueEventChannels.checkForUpdate);
//         },
//         downloadUpdate() {
//             vueEventDispatcher.$emit(VueEventChannels.downloadUpdate);
//             if (operatingSystem === OperatingSystem.Windows) {
//                 const updateStatus: UpdateStatus = this.updateStatus;
//                 updateStatus.checking = false;
//                 updateStatus.downloading = true;
//                 updateStatus.errorOnUpdateCheck = false;
//                 updateStatus.latestVersionRunning = false;
//                 updateStatus.updateAvailable = false;
//             }
//         },
//         changeUpdateStatus(result: UpdateCheckResult) {
//             const updateStatus: UpdateStatus = this.updateStatus;
//             if (result === UpdateCheckResult.Error) {
//                 updateStatus.checking = false;
//                 updateStatus.downloading = false;
//                 updateStatus.errorOnUpdateCheck = true;
//                 updateStatus.latestVersionRunning = false;
//                 updateStatus.updateAvailable = false;
//             }
//             if (result === UpdateCheckResult.NoUpdateAvailable) {
//                 updateStatus.checking = false;
//                 updateStatus.downloading = false;
//                 updateStatus.errorOnUpdateCheck = false;
//                 updateStatus.latestVersionRunning = true;
//                 updateStatus.updateAvailable = false;
//             }
//             if (result === UpdateCheckResult.UpdateAvailable) {
//                 updateStatus.checking = false;
//                 updateStatus.downloading = false;
//                 updateStatus.errorOnUpdateCheck = false;
//                 updateStatus.latestVersionRunning = false;
//                 updateStatus.updateAvailable = true;
//             }
//         },
//     },
//     mounted() {
//         vueEventDispatcher.$on(VueEventChannels.showSetting, (settingName: string) => {
//             if (settingName === this.settingName) {
//                 this.visible = true;
//             } else {
//                 this.visible = false;
//             }
//         });

//         vueEventDispatcher.$on(VueEventChannels.checkForUpdateResponse, (updateCheckResult: UpdateCheckResult) => {
//             this.changeUpdateStatus(updateCheckResult);
//         });

//         setTimeout(() => {
//             this.checkForUpdate();
//         }, 500);
//     },
//     props: ["config", "translations"],
//     template: `
//     `,
// });


</script>

<style scoped>
</style>