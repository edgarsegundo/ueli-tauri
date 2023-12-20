import { createApp } from "vue";
// import "./styles.css";
import App from "./App.vue";
import Channels from '../channels';
import { emit } from '@tauri-apps/api/event'
import { ElectronStoreConfigRepository } from "../common/config/electron-store-config-repository";
import { UserConfigOptions, defaultUserConfigOptions } from "../common/config/user-config-options";
import { getTranslationSet } from "../common/translation/translation-set-manager";
import { deepCopy } from "../common/helpers/object-helpers";

const app = createApp(App);

const initialConfig:UserConfigOptions | null = new ElectronStoreConfigRepository(deepCopy(defaultUserConfigOptions)).getConfig();

app.provide(/* key */ 'translations', /* value */ getTranslationSet(initialConfig.generalOptions.language))

app.config.errorHandler = (err, instance, info) => {
    let error_str:string = `❌ ${err}, info: ${info}`
    console.error('Vue Error:', err, instance, info);
    if (!err) {
        err = "Generic error"
    }
    alert(error_str);
    emit(Channels.getInstance().get("error_occurred"), {
        theMessage: error_str,
    })
};

window.onerror = function (message, source, lineno, colno, error) {
    let error_str:string = `❌ Global Error: ${message}, ${source}, ${lineno}, ${colno}, ${error}`
    console.error(error_str);
    emit(Channels.getInstance().get("error_occurred"), {
        theMessage: error_str,
    })
    alert(error_str);
    return true; // Prevent default error handling
};

window.addEventListener('unhandledrejection', event => console.error('Unhandled Promise Rejection:', event.reason));

Channels.getInstance().fetchJsonData().then(() => {
    app.mount('#app');
}, (error) => {
    emit("error_occurred", {
        theMessage: error,
    })
});
