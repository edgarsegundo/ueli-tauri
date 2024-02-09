<template>
<div v-if="visible">
    <div class="settings__setting-title title is-3">
        <span>
            {{ appState.translations.appearanceSettings }}
        </span>
        <button class="button" @click="resetAll">
            <span class="icon"><i class="fas fa-undo-alt"></i></span>
        </button>
    </div>
    <div class="settings__setting-content">
        <div class="box">
            <div class="settings__options-container">

                <div class="settings__setting-content-item-title mb-4">
                    <div class="title is-5">
                        {{ appState.translations.settingsGeneralTitle }}
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsWindowWidth }}</div>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="number" step="1" class="input" v-model="appState.config.appearanceOptions.windowWidth" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsSmoothScrolling }}</div>
                    <div class="settings__option-content">
                        <div class="field has-addons has-addons-right vertical-center">
                            <div class="control">
                                <input id="smoothScrollingCheckBox" type="checkbox" name="smoothScrollingCheckBox" class="switch is-rounded is-success" checked="checked" v-model="appState.config.appearanceOptions.smoothScrolling" @change="updateConfig">
                                <label for="smoothScrollingCheckBox"></label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option" v-if="isWindows">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsAllowTransparentBackground }} ({{ appState.translations.restartRequired }})</div>
                    <div class="settings__option-content">
                        <div class="field has-addons has-addons-right vertical-center">
                            <div class="control">
                                <input id="allowTransparentBackgroundCheckbox" type="checkbox" name="allowTransparentBackgroundCheckbox" class="switch is-rounded is-success" checked="checked" v-model="appState.config.appearanceOptions.allowTransparentBackground" @change="updateConfig">
                                <label for="allowTransparentBackgroundCheckbox"></label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsFontFamily }}</div>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="text" class="input" v-model="appState.config.appearanceOptions.fontFamily" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

            <!-- </div class="settings__options-container"> -->
            </div>
        </div>
        <div class="box">
            <div class="settings__options-container">
                <div class="settings__setting-content-item-title mb-4">
                    <div class="title is-5">
                        {{ appState.translations.settingsUserInputTitle }}
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsUserInputHeight }}</div>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="number" step="1" class="input" v-model="appState.config.appearanceOptions.userInputHeight" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsUserInputBorderRadius }}</div>
                        <span class="icon tooltip is-tooltip-multiline" :data-tooltip="appState.translations.appearanceSettingsBorderRadiusDescription">
                            <i class="fa fa-info-circle"></i>
                        </span>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="text" class="input" v-model="appState.config.appearanceOptions.userInputBorderRadius" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsUserInputBottomMargin }}</div>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="number" step="1" class="input" v-model="appState.config.appearanceOptions.userInputBottomMargin" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsShowSearchIcon }}</div>
                    <div class="settings__option-content">
                        <div class="field has-addons has-addons-right vertical-center">
                            <div class="control">
                                <input id="showSearchIconCheckbox" type="checkbox" name="showSearchIconCheckbox" class="switch is-rounded is-success" checked="checked" v-model="appState.config.appearanceOptions.showSearchIcon" @change="updateConfig">
                                <label for="showSearchIconCheckbox"></label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsUserInputFontSize }}</div>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="text" class="input" v-model="appState.config.appearanceOptions.userInputFontSize" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsUserInputFontWeight }}</div>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="number" class="input" v-model="appState.config.appearanceOptions.userInputFontWeight" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

            <!-- </div class="settings__options-container"> -->
            </div>
        </div>   
        <div class="box">
            <div class="settings__options-container">
                <div class="settings__setting-content-item-title mb-4">
                    <div class="title is-5">
                        {{ appState.translations.settingsSearchResultsBoxTitle }}
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsSearchResultHeight }}</div>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="number" step="1" class="input" v-model="appState.config.appearanceOptions.searchResultHeight" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsMaxSearchResultsPerPage }}</div>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="number" step="1" class="input" v-model="appState.config.appearanceOptions.maxSearchResultsPerPage" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsSearchResultsBorderRadius }}</div>
                    <span class="icon tooltip is-tooltip-multiline" :data-tooltip="appState.translations.appearanceSettingsBorderRadiusDescription">
                            <i class="fa fa-info-circle"></i>
                        </span>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="text" class="input" v-model="appState.config.appearanceOptions.searchResultsBorderRadius" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsScrollbarBorderRadius }}</div>
                    <span class="icon tooltip is-tooltip-multiline" :data-tooltip="appState.translations.appearanceSettingsBorderRadiusDescription">
                            <i class="fa fa-info-circle"></i>
                        </span>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="text" class="input" v-model="appState.config.appearanceOptions.scrollbarBorderRadius" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsShowDescriptionOnAllSearchResults }}</div>
                    <div class="settings__option-content">
                        <div class="field has-addons has-addons-right vertical-center">
                            <div class="control">
                                <input id="showDescriptionOnAllSearchResults" type="checkbox" name="showDescriptionOnAllSearchResults" class="switch is-rounded is-success" checked="checked" v-model="appState.config.appearanceOptions.showDescriptionOnAllSearchResults" @change="updateConfig">
                                <label for="showDescriptionOnAllSearchResults"></label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsShowSearchResultNumbers }}</div>
                    <div class="settings__option-content">
                        <div class="field has-addons has-addons-right vertical-center">
                            <div class="control">
                                <input id="showSearchResultNumbersCheckbox" type="checkbox" name="showSearchResultNumbersCheckbox" class="switch is-rounded is-success" checked="checked" v-model="appState.config.appearanceOptions.showSearchResultNumbers" @change="updateConfig">
                                <label for="showSearchResultNumbersCheckbox"></label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsSearchResultDescriptionFontSize }}</div>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="text" class="input" v-model="appState.config.appearanceOptions.searchResultNameFontSize" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsSearchResultNameFontWeight }}</div>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="number" class="input" v-model="appState.config.appearanceOptions.searchResultNameFontWeight" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsSearchResultNameFontSize }}</div>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="text" class="input" v-model="appState.config.appearanceOptions.searchResultDescriptionFontSize" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings__option">
                    <div class="settings__option-name">{{ appState.translations.appearanceSettingsSearchResultDescriptionFontWeight }}</div>
                    <div class="settings__option-content">
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <input type="number" class="input" v-model="appState.config.appearanceOptions.searchResultDescriptionFontWeight" @change="updateConfig">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- </div class="settings__options-container"> -->
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">

import { defineComponent, ref, inject, // inject, ref, computed, onMounted, onUnmounted, defineProps, defineEmits, 
} from 'vue';

// import { platform } from "os";

// import { defaultAppearanceOptions } from "../common/config/appearance-options";
// import { UserConfigOptions } from "../common/config/user-config-options";
// import { deepCopy } from "../common/helpers/object-helpers";

import { OperatingSystem } from "../common/operating-system";

// import { TranslationSet } from "../common/translation/translation-set";
// import { VueEventChannels } from "../vue-event-channels";
// import { vueEventDispatcher } from "../vue-event-dispatcher";
import { GeneralSettings } from "./general-settings";
// import { UserConfirmationDialogParams, UserConfirmationDialogType } from "./modals/user-confirmation-dialog-params";

// import { registerCallback } from '../callback-mgr';

// const platform = navigator.platform;
// console.log('Platform:', platform);


// const platform:string = inject(/* key */ 'platform');
// const operatingSystem = getCurrentOperatingSystem(platform);
// console.log(platform)




import { listen } from '@tauri-apps/api/event'
import Channels from '../channels';

const visible = ref(false);
const isWindows = ref(undefined)
const settingName = ref(GeneralSettings.Appearance);

export default defineComponent({
    name: 'general-settings',
    setup() {
        // const config:UserConfigOptions = inject(/* key */ 'config');
        // const translations:TranslationSet = inject(/* key */ 'translations');
        const operatingSystem:string = inject(/* key */ 'operatingSystem');

        const appState:any = inject(/* key */ 'appState');
        // const config:UserConfigOptions = reactiveAppState.config;
        // const translations:TranslationSet = reactiveAppState.translations;

        isWindows.value = operatingSystem === OperatingSystem.Windows;

        const resetAll = () => {
            alert("resetAll function git!")
            // const userConfirmationDialogParams: UserConfirmationDialogParams = {
            //     callbackId: registerCallback('2d09aff8-7d17-4d3b-b6c7-d764fabb5c81', () => {
            //         alert("El callback está funcionando!")
            //         // vueEventDispatcher.$emit(VueEventChannels.clearExecutionLogConfirmed);
            //         }     
            //     ),
            //     message: appState.translations.generalSettingsClearExecutionLogWarning,
            //     modalTitle: appState.translations.clearExecutionLog,
            //     type: UserConfirmationDialogType.Default,
            // };
            // // vueEventDispatcher.$emit(VueEventChannels.settingsConfirmation, userConfirmationDialogParams);

            // emit(Channels.getInstance().get("settings_confirmation"), {
            //     theMessage: `🦄 settings confirmation sent`,
            //     params: userConfirmationDialogParams,
            // });

        };

        return {
            // isWindows: operatingSystem === OperatingSystem.Windows,
            isWindows,
            settingName,
            visible,
            resetAll,
            appState
            // translations,
            // config
        };
    },

    mounted() {
        listen(Channels.getInstance().get('show_setting'), (event:any) => {
            const _settingName: string = event.payload.settingName;
            if (_settingName === settingName.value) {
                visible.value = true;
            } else {
                visible.value = false;
            }
        });
    },
});

// export const appearanceSettingsComponent = Vue.extend({
//     data() {
//         return {
//             isWindows: operatingSystem === OperatingSystem.Windows,
//             settingName: GeneralSettings.Appearance,
//             visible: false,
//         };
//     },
//     methods: {
//         resetAll() {
//             const translations: TranslationSet = this.translations;
//             const userConfirmationDialogParams: UserConfirmationDialogParams = {
//                 callback: () => {
//                     const config: UserConfigOptions = this.config;
//                     config.appearanceOptions = deepCopy(defaultAppearanceOptions);
//                     this.updateConfig();
//                 },
//                 message: appState.translations.appearanceSettingsResetWarningMessage,
//                 modalTitle: translations.resetToDefault,
//                 type: UserConfirmationDialogType.Default,
//             };
//             vueEventDispatcher.$emit(VueEventChannels.settingsConfirmation, userConfirmationDialogParams);
//         },
//         updateConfig() {
//             vueEventDispatcher.$emit(VueEventChannels.configUpdated, this.config);
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
//     },
//     props: ["config", "translations"],
// });

</script>

<style scoped>
</style>