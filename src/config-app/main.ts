import { createApp, reactive } from "vue";
// import "./styles.css";
import App from "./App.vue";
import Channels from '../channels';
import { emit, listen } from '@tauri-apps/api/event'
import { ElectronStoreConfigRepository } from "../common/config/electron-store-config-repository";
import { UserConfigOptions, defaultUserConfigOptions } from "../common/config/user-config-options";
import { deepCopy } from "../common/helpers/object-helpers";
import { getTranslationSet } from "../common/translation/translation-set-manager";
import { invoke } from "@tauri-apps/api/tauri";
import { getCurrentOperatingSystem } from "../common/helpers/operating-system-helpers";
import { Language } from "../common/translation/language";
// import { Store } from "tauri-plugin-store-api";
// import { TranslationSet } from "../common/translation/translation-set";
// import { tauri } from "@tauri-apps/api";


// const platform = await tauri.invoke<string>('get_platform');

// alert(`The platform is: ${platform}`);


// // **************
// // **************
// // **************
// const store = new Store(".settings2.dat");

// // Assuming the data structure is something like this
// interface StoreData {
//     value: number;
//     // other properties if there are more
// }

// const asyncFunction = async () => {
//     await store.set("some-key", { value: 11 });
//     const val = await store.get("some-key");
//     console.log(val);
//     // Do something with the value
//     store.save();
// };

// // Call the asynchronous function
// asyncFunction();

// const asyncFunctionGet = async () => {
//     const val: StoreData | null = await store.get("some-key");
//     console.log(val);
//     let value = val ? val["value"] : 0;
//     emit(Channels.getInstance().get("console_log_message"), {
//         theMessage:  `🦄 (-99) edgar store some-key: (${value})`,
//     })
// };

// asyncFunctionGet();
// // **************
// // **************
// // **************

const app = createApp(App);

// Use a reactive object to store config and translations
// const config = reactive(new ElectronStoreConfigRepository(deepCopy(defaultUserConfigOptions)).getConfig());
// const translations:TranslationSet = reactive(getTranslationSet(config.generalOptions.language))


const configRepo:ElectronStoreConfigRepository | null = new ElectronStoreConfigRepository(deepCopy(defaultUserConfigOptions))

// const config:UserConfigOptions | null = new ElectronStoreConfigRepository(deepCopy(defaultUserConfigOptions)).getConfig();
// const config:UserConfigOptions | null = configRepo.getConfig();


// configRepo.saveConfig(config).then(() => {
//     console.log("saved.")
//     // alert("saved.");
// }).catch((e) => alert("error"))


// app.provide(/* key */ 'config', /* value */ config);
// app.provide(/* key */ 'translations', /* value */ translations);

// Use a reactive object to store config and translations
// const appState = reactive({
//     config: config,
//     translations: getTranslationSet(config.generalOptions.language),
// });

const config:UserConfigOptions = defaultUserConfigOptions;
const appState = reactive({
    config:  config,
    translations: getTranslationSet(config.generalOptions.language)
});

// Provide the reactive object to the app
app.provide(/* key */ 'appState', /* value */ appState);

// Function to update config and translations
const updateConfigAndTranslations = (LanguageSelected:Language) => {
    // alert("test 1: " + appState.config.generalOptions.language)
    appState.translations = getTranslationSet(LanguageSelected);

    configRepo.saveConfig(appState.config);



    

    // appState.config = new ElectronStoreConfigRepository(deepCopy(defaultUserConfigOptions)).getConfig();

    // // Update translations based on the new language
    // // alert("new lang: " + reactiveAppState.config.generalOptions.language);

    
};

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
    // Register an event listener for the specified channel
    listen(Channels.getInstance().get('configUpdated'), (event:any) => {
        const needsIndexRefresh: boolean = event.payload.needsIndexRefresh;
        const LanguageSelected: Language = event.payload.LanguageSelected;
        // alert(LanguageSelected)
        updateConfigAndTranslations(LanguageSelected);
        
        console.log(needsIndexRefresh);
    });

    // const config:UserConfigOptions | null = configRepo.getConfig();
    configRepo.getConfig().then((config:UserConfigOptions) => {
        console.log("saved.")

        appState.config = config;
        appState.translations = getTranslationSet(config.generalOptions.language);
    }).catch((e) => alert("error"))



    app.mount('#app');

}, (error) => {
    emit("error_occurred", {
        theMessage: error,
    })
});
