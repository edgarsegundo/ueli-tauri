<template>
<div class="settings container is-fluid">
    <settings-loading-overlay></settings-loading-overlay>
    <div class="settings__sidebar menu">
        <div class="settings__sidebar-header-container">
            <img class="settings__sidebar-header-image" src="./assets/ueli.svg">
            <span class="settings__sidebar-header-title">{{ translations.settings }}</span>
        </div>
        <div class="menu-label">
            {{ translations.generalSettingsMenuSection }}
        </div>

        <ul class="menu-list">
            <SettingMenuItemComponent
                v-for="generalSettingMenuItem in generalSettingMenuItems"
                :key="generalSettingMenuItem"
                :item="generalSettingMenuItem"
                :translations="translations"
                :config="config"
                ></SettingMenuItemComponent>
        </ul>

        <div class="menu-label">
            {{ translations.pluginSettingsMenuSection }}
        </div>
        <ul class="menu-list">
            <setting-menu-item
                v-for="pluginSettingMenuItem in pluginSettingMenuItems"
                :key="pluginSettingMenuItem"
                :item="pluginSettingMenuItem"
                ></setting-menu-item>
        </ul>
    </div>
    <div class="settings__notification notification" :class="notificationClass">
        <button class="delete" @click="removeNotification"></button>
        {{ notification.message }}
    </div>
    <div class="settings__setting">
        <GeneralSettingsComponent/>
        <UserConfirmationComponent/>
        <AppearanceSettingsComponent/>
        <!-- <general-settings :config="config" :translations="translations"></general-settings> -->
        <!-- <appearance-settings :config="config" :translations="translations"></appearance-settings>
        <color-theme-settings :config="config" :translations="translations"></color-theme-settings>
        <search-engine-settings :config="config" :translations="translations"></search-engine-settings>
        <application-search-settings :config="config" :translations="translations"></application-search-settings>
        <shortcut-settings :config="config" :translations="translations"></shortcut-settings>
        <mdfind-settings :config="config" :translations="translations"></mdfind-settings>
        <everthing-settings :config="config" :translations="translations"></everthing-settings>
        <translation-settings :config="config" :translations="translations"></translation-settings>
        <websearch-settings :config="config" :translations="translations"></websearch-settings>
        <filebrowser-settings :config="config" :translations="translations"></filebrowser-settings>
        <operating-system-commands-settings :config="config" :translations="translations"></operating-system-commands-settings>
        <operating-system-settings-settings :config="config" :translations="translations"></operating-system-settings-settings>
        <calculator-settings :config="config" :translations="translations"></calculator-settings>
        <dictionary-settings :config="config" :translations="translations"></dictionary-settings>
        <url-settings :config="config" :translations="translations"></url-settings>
        <email-settings :config="config" :translations="translations"></email-settings>
        <currency-converter-settings :config="config" :translations="translations"></currency-converter-settings>
        <workflow-settings :config="config" :translations="translations"></workflow-settings>
        <commandline-settings :config="config" :translations="translations"></commandline-settings>
        <simple-folder-search-settings :config="config" :translations="translations"></simple-folder-search-settings>
        <uwp-settings :config="config" :translations="translations"></uwp-settings>
        <color-converter-setttings :config="config" :translations="translations"></color-converter-setttings>
        <user-confirmation :translations="translations"></user-confirmation>
        <browser-bookmark-settings :config="config" :translations="translations"></browser-bookmark-settings>
        <control-panel-settings :config="config" :translations="translations"></control-panel-settings>
        <weather-settings :config="config" :translations="translations"></weather-settings>
        <lorem-ipsum-settings :config="config" :translations="translations"></lorem-ipsum-settings> -->
    </div>
</div>

</template>


<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, defineComponent, onMounted, computed, onUnmounted, inject } from "vue";

// import { vueEventDispatcher } from "../vue-event-dispatcher";
// import { VueEventChannels } from "../vue-event-channels";

import { NotificationType } from "../common/notification-type";
import { PluginSettings } from "./plugin-settings";
import { SettingOsSpecific } from "./settings-os-specific";
// import { platform } from "os";
import { GeneralSettings } from "./general-settings";

// import { Store } from "tauri-plugin-store-api";
// import { emit } from '@tauri-apps/api/event'
// import Channels from '../channels';
// import { ElectronStoreConfigRepository } from "../common/config/electron-store-config-repository";
// import { deepCopy } from "../common/helpers/object-helpers";
// import { defaultUserConfigOptions } from "../common/config/user-config-options";
// import { getTranslationSet } from "../common/translation/translation-set-manager";

import GeneralSettingsComponent from "./general-settings-component.vue";
import UserConfirmationComponent from "./modals/user-confirmation-component.vue"
import AppearanceSettingsComponent from "./appearance-settings-component.vue"
import SettingMenuItemComponent from "./setting-menu-item-component.vue"

// import { SettingMenuItemComponent } from './setting-menu-item-component.vue";

const autoHideErrorMessageDelayInMilliseconds = 5000;
let autoHideErrorMessageTimeout: number;

import { UserConfigOptions } from "../common/config/user-config-options";
import { TranslationSet } from '../common/translation/translation-set';

// import { listen } from '@tauri-apps/api/event'



// const initialConfig:UserConfigOptions | null = new ElectronStoreConfigRepository(deepCopy(defaultUserConfigOptions)).getConfig();
// console.log(initialConfig);

// const initialConfig = new ElectronStoreConfigRepository(deepCopy(defaultUserConfigOptions)).getConfig();

// const app = new Vue({
//     data: {
//         config: initialConfig,
//         translations: getTranslationSet(initialConfig.generalOptions.language),
//     },
//     el: "#app",





// provide(/* key */ 'message', /* value */ 'hello!')
// provide(/* key */ 'translations', /* value */ getTranslationSet(initialConfig.generalOptions.language))

// import { provide } from 'vue'

// export default {
//   setup() {
//     provide(/* key */ 'message', /* value */ 'hello!')
//   }
// }


const generalSettingMenuItems = computed(() =>
    Object.values(GeneralSettings).sort()
);

export default defineComponent({
    components: {
        GeneralSettingsComponent,
        UserConfirmationComponent,
        AppearanceSettingsComponent,
        SettingMenuItemComponent
    },
    name: 'ConfigApp',

    // data: {
    //     config: initialConfig,
    //     translations: getTranslationSet(initialConfig.generalOptions.language),
    // },


    



    setup() {

        const config:UserConfigOptions = inject(/* key */ 'config');
        const translations:TranslationSet = inject(/* key */ 'translations');


        // provide(/* key */ 'message', /* value */ 'hello!')
        
        // const userConfig:UserConfigOptions | null = initialConfig.getConfig();
        // let translationSet = getTranslationSet(config.generalOptions.language);
        // alert(userConfig?.generalOptions.language)

        // emit(Channels.getInstance().get("console_log_message"), {
        //     theMessage:  `🦄 generalOptions.language: (${config.generalOptions.language})`,
        // })

        // const store = new Store(".settings.dat");

        // await store.set("some-key", { value: 5 });

        // const val = await store.get("some-key");
        // // assert(val, { value: 5 });

        // store.save(); // this manually saves the store, otherwise the store is only saved when your app is closed


// // ****************************************************************************    
            // // Assuming the data structure is something like this
            // interface StoreData {
            // value: number;
            // // other properties if there are more
            // }
//         const store = new Store(".settings.dat");

//         const asyncFunction = async () => {
//             await store.set("some-key", { value: 99 });
//             const val = await store.get("some-key");
//             console.log(val);
//             // Do something with the value
//             store.save();
//         };

//         // Call the asynchronous function
//         asyncFunction();

//         const asyncFunctionGet = async () => {
//             const val: StoreData | null = await store.get("some-key");
//             console.log(val);
//             let value = val ? val["value"] : 0;
//             emit(Channels.getInstance().get("console_log_message"), {
//                 theMessage:  `🦄 (3) store some-key: (${value})`,
//             })
//         };

//         asyncFunctionGet();
// // ****************************************************************************

        // const generalSettingMenuItems = ref<string[]>(Object.values(GeneralSettings).sort());


        const notification = ref({
        message: '',
        type: undefined as NotificationType | undefined,
        visible: false,
        });
        const pluginSettingMenuItems = ref<string[]>(Object.values(PluginSettings)
        .map(setting => setting.toString())
        .concat(
            Object.values(SettingOsSpecific)
            .map(setting => setting.toString())
            // .filter(setting => setting.startsWith(platform()))
            // .map(setting => setting.replace(`${platform()}:`, '')),
        )
        .sort());

        const notificationClass = computed(() => {
        let typeClass = 'is-info';

        const type = notification.value.type as NotificationType;
        switch (type) {
            case NotificationType.Error:
            typeClass = 'is-danger';
            break;
            case NotificationType.Warning:
            typeClass = 'is-warning';
            break;
        }

        return notification.value.visible ? `visible ${typeClass}` : typeClass;
        });

        const removeNotification = () => {
        notification.value.visible = false;
        };

        const showNotification = (message: string, type: NotificationType) => {
        if (autoHideErrorMessageTimeout) {
            clearTimeout(autoHideErrorMessageTimeout);
        }

        notification.value = {
            message,
            type,
            visible: true,
        };

        autoHideErrorMessageTimeout = Number(
            setTimeout(() => {
            removeNotification();
            }, autoHideErrorMessageDelayInMilliseconds),
        );
        };

        onMounted(() => {

            // vueEventDispatcher.$emit(VueEventChannels.showSetting, GeneralSettings.General);

            // // Register an event listener for the specified channel
            // listen(Channels.getInstance().get('show_setting'), (event:any) => {
            //     const params: UserConfirmationDialogParams = event.payload.params;
            //     isActive.value = true;
            //     message.value = params.message;
            //     title.value = params.modalTitle;
            //     confirmCallback.value = getCallback(params.callbackId)

            //     if (params.type) {
            //         type.value = params.type;
            //     }
            // });        




            // vueEventDispatcher.$on(VueEventChannels.notification, (message: string, type: NotificationType) => {
            //   showNotification(message, type);
            // });
        });

        onUnmounted(() => {
        // Clean up any necessary resources
        });

        return {
            generalSettingMenuItems,
            notification,
            notificationClass,
            pluginSettingMenuItems,
            removeNotification,
            showNotification,
            translations,
            config
        };
    }

});

</script>


<style scoped>

.settings {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 100vh;
    padding: 10px;
}

.settings__sidebar {
    overflow-y: auto;
    padding: 10px;
    width: var(--sidebar-width);
}

.settings__sidebar-name-container {
    display: flex !important;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.settings__sidebar-name {
    flex-grow: 1;
}

.settings__setting {
    overflow-y: auto;
    width: 100%;
    padding: 10px;
}

.settings__setting-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.settings__setting-description {
    margin-bottom: 1.5rem;
}

.settings__setting-content {
    position: relative;
}

.settings__setting-content-item-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.settings__options-container {
    display: flex;
    flex-direction: column;
}

.settings__option {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.75rem;
}

.settings__option:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
}

.settings__option-name {
    padding-right: 10px;
    box-sizing: border-box;
}

.settings__option-content {
    flex-grow: 1;
}

.settings__notification {
    position: fixed;
    left: 50%;
    bottom: 0;
    transition: all 250ms ease-in-out;
    z-index: 100;
    opacity: 0;
    transform: translateY(100%) translateX(-50%);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.25);
}

.settings__notification.visible {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
}

.settings-loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.75);
    z-index: 100;
}

.settings-table__icon-url {
    width: 24px;
    height: 24px;
}

.settings-table__icon-svg {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.settings-table__icon-svg > svg {
    width: 24px;
    height: 24px;
}

.settings-table__icon-color {
    width: 24px;
    height: 24px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
}

.settings-table__icon-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.settings__sidebar-header-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 15px 0;
}

.settings__sidebar-header-image {
    width: 35px;
}

.settings__sidebar-header-title {
    width: 100%;
    font-size: 1.25rem;
    font-weight: 600;
    padding-left: 10px;
}

.modal-content.slim {
    width: 450px;
}

.vertical-center {
    align-items: center;
}

.table-container {
    width: 100%;
    overflow-x: auto;
}

.settings__setting-disabled-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 5;
}

/* Overwrite color picker styling */
.vc-chrome {
    width: 100% !important;
}

.vc-chrome-sliders {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* Hide color picker's text input (hex, rgba, etc.) */
.vc-chrome-fields-wrap {
    display: none !important;
}

.font-mono {
    font-family: var(--font-family-mono) !important;
}

.preview-button {
    width: 37px;
}

/* Spinner */
.lds-dual-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
}
.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #444;
    border-color: #444 transparent #444 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>



function defineProps(arg0: string[]) {
  throw new Error("Function not implemented.");
}
