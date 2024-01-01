import { createApp } from "vue";
// import "./styles.css";
import App from "./App.vue";
import Channels from '../channels';
import { emit } from '@tauri-apps/api/event'
import { ElectronStoreConfigRepository } from "../common/config/electron-store-config-repository";
import { UserConfigOptions, defaultUserConfigOptions } from "../common/config/user-config-options";
import { deepCopy } from "../common/helpers/object-helpers";
import { getTranslationSet } from "../common/translation/translation-set-manager";
import { invoke } from "@tauri-apps/api/tauri";
import { getCurrentOperatingSystem } from "../common/helpers/operating-system-helpers";
// import { tauri } from "@tauri-apps/api";


// const platform = await tauri.invoke<string>('get_platform');

// alert(`The platform is: ${platform}`);

const app = createApp(App);

const config:UserConfigOptions | null = new ElectronStoreConfigRepository(deepCopy(defaultUserConfigOptions)).getConfig();

app.provide(/* key */ 'config', /* value */ config);
app.provide(/* key */ 'translations', /* value */ getTranslationSet(config.generalOptions.language));
// app.provide(/* key */ 'platform', /* value */ 'macos');

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


app.provide(/* key */ 'platform', /* value */ "macos");
invoke('get_platform', {})
.then((res:any) => {
        app.provide(/* key */ 'operatingSystem', /* value */ getCurrentOperatingSystem(res.message));
    }
)
.catch((e) => console.error(e))


// // Asynchronous function to fetch platform information
// async function fetchPlatformInfo() {
//     try {
//         await Channels.getInstance().fetchJsonData();

//         alert("edgar 1")

//         const res:any = await invoke('get_platform', {})

//         alert("a = " + res.message)

//         app.provide(/* key */ 'platform', /* value */ res.message);

//         app.mount('#app');
//     } catch (error) {
//         emit("error_occurred", {
//             theMessage: error,
//         })
//     }
// }

// // Fetch platform information before mounting the app
// fetchPlatformInfo();

Channels.getInstance().fetchJsonData().then(() => {
    app.mount('#app');
}, (error) => {
    emit("error_occurred", {
        theMessage: error,
    })
});
