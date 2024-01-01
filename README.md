# ueli + tauri + vue3

## Genesis

1. I followed this [tutorial](https://tauri.app/v1/guides/getting-started/prerequisites#setting-up-macos) to create this project.

As the project structure is already set up, you can bypass Step 1 and proceed directly to Step 2 by running `pnpm install` if you've just cloned this project and branch for the first time.

❯ pnpm create tauri-app
❯ cd ueli-tauri 
❯ pnpm install
❯ pnpm tauri dev

2. To build the project, look at the file `package.json`

pnpm tauri dev                                  : to build and run the project
pnpm tauri build --debug                        : build with debug option
RUST_BACKTRACE=1 pnpm tauri build --debug       : it helps find bugs
tools: option + comand + i

3. What progress has been made thus far

- I was able to access the `UserConfigOptions`

```ts
import { UserConfigOptions } from "../common/config/user-config-options";
        const userConfig:UserConfigOptions | null = initialConfig.getConfig();
        alert(userConfig?.generalOptions.language)
```

- [I just learn how to register a child component](https://vuejs.org/guide/components/registration.html)
```ts
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```


- [21-nov-2023] I implemented all described code on this [article](https://betterprogramming.pub/create-menubar-app-with-tauri-510ab7f7c43d)
- I installed tauri for VS
- I installed rust-analyzer for VS


4. Where did I last leave off?

-  I stopped here, see below. I'm trying to group all files related to a plugin in the folder plugin (refactoring)

import { WebSearchOptions, defaultWebSearchOptions } from "./websearch-options"; // * here


- I will refactor `loadComponentStyles` to delete and insert all other component's scripts in a better way (I need to think if this approach is efficient)

- I was trying to add a new window using tauri.conf.json, but I ended up creating it in the main.rs, but I will leave it here so I can remember how it can be done. It's important to remember why I gave on this approach and it was because I could not connect the new window the vue file, so I will continue with the approach to switch the vue component and css for now

How to create new window in main.rs
```rust
        .setup(|app| {

            let result = WindowBuilder::new(app, "local", WindowUrl::App("config.html".into()))
                .fullscreen(false)
                .resizable(false)
                .title("User Configuration")
                // .fullscreen(true)
                .build();
          
            if let Ok(window) = result {
                // Do something with the `window` instance, like showing it or setting its position
                window.show().unwrap();
                // ...
            } else {
                // Handle any potential errors during window creation
                println!("Error creating second window!");
            }

```

How to create new window with tauri.conf.json
```json
    "windows": [
        {
            "fullscreen": false,
            "resizable": false,
            "title": "menubar xxxx",
            "width": 700,
            "height": 600,
            "visible": false,
            "hiddenTitle": true,
            "decorations": false,
            "focus": false,
            "transparent": true
        },
        {
        "fullscreen": false,
        "resizable": false,
        "title": "User Configuration",
        "width": 700,
        "height": 800,
        "visible": true,
        "hiddenTitle": false,
        "decorations": false,
        "focus": false,
        "transparent": false,
        "label": "local",
        "url": "main.html"
        }
    ],
```




I will try this: https://aptabase.com/blog/persistent-state-tauri-apps

https://github.com/tauri-apps/tauri-plugin-store

electron-store-config-repository.ts
config-repository.ts
user-config-options.ts
config-helpers.ts
object-helpers.ts

```ts
import { Store } from "tauri-plugin-store-api";
import { emit } from '@tauri-apps/api/event'
import Channels from '../channels';

// Assuming the data structure is something like this
interface StoreData {
  value: number;
  // other properties if there are more
}

export default defineComponent({
    setup() {
        const store = new Store(".settings.dat");

        const asyncFunction = async () => {
            await store.set("some-key", { value: 13 });
            const val = await store.get("some-key");
            console.log(val);
            store.save();
        };
        asyncFunction();

        const asyncFunctionGet = async () => {
        const val: StoreData | null = await store.get("some-key");
        let value = val ? val["value"] : 0;
        emit(Channels.getInstance().get("console_log_message"), {
            theMessage:  `🦄 (3) store some-key: (${value})`,
        })
        };
        asyncFunctionGet();
    }
})
```

## Backlog

- xxx
- yyy

## Debugging the Renderer Process

Create a launch.json file and include the following configuration:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "attach",
            "name": "Electron Renderer",
            "port": 9223,
            "webRoot": "${workspaceFolder}",
            "timeout": 20000
        }
    ]
}
```

![Refer to the image for a reminder on how to initiate debugging.](debugging-on-renderer-process.png)

## A Very Good Alternative to Tauri

https://www.reddit.com/r/rust/comments/14g95hn/tauri_vs_flutter/

## If I ever need to use NodeJs with Tauri (although not recomended)

https://tauri.app/v1/guides/building/sidecar/
https://marcin.codes/posts/tauri-+-nodejs:-alternative-to-electron/
https://tauri.app/v1/guides/building/sidecar/
https://github.com/marcincodes/taurine
https://github.com/tauri-apps/tauri/discussions/7037
https://dev.to/nothingismagick/comment/1aj99
https://github.com/marcincodes/taurine
https://marcin.codes/posts/tauri-+-nodejs:-alternative-to-electron/
https://stackoverflow.com/questions/76592282/is-there-a-way-to-include-npm-packages-in-a-tauri-desktop-application
https://aptabase.com/blog/why-chose-to-build-on-tauri-instead-electron
https://betterprogramming.pub/tauri-vs-electron-for-tray-apps-ed15974f35ce
https://replit.com/talk/learn/Convert-your-web-project-to-a-desktop-app-with-Tauri/143553
https://blog.notesnook.com/neutralinojs-next-best-alternative-to-electron-and-tauri/


## Lessons Learned

### Found 2 ways of creating and using `userInputDisabled`

```ts
import { useIpcRenderer } from '@vueuse/electron'
// // enable nodeIntegration if you don't provide ipcRenderer explicitly
// // @see: https://www.electronjs.org/docs/api/webview-tag#nodeintegration
const ipcRenderer = useIpcRenderer()

// I could use `executionIsPending` directly in the template
const executionIsPending = ref(false);

// // const executionIsPending = ref(false);
const userInputDisabled = () => executionIsPending.value;

// this is the same as above, but with a computed property instead of a function and the difference is that the computed property is cached
// const userInputDisabled = computed(() => executionIsPending.value);
```

## Errors

### If this error occurrs: dyld[13517]: Library not loaded: @rpath/Electron Framework.framework/Electron Framework

```bash
# Complete example
dyld[13517]: Library not loaded: @rpath/Electron Framework.framework/Electron Framework
  Referenced from: <4C4C44BB-5555-3144-A150-4885FF5CD369> /Users/edrezende/Personal/ueli-vue3/node_modules/.pnpm/electron@26.5.0/node_modules/electron/dist/Electron.app/Contents/MacOS/Electron
  Reason: tried: '/Users/edrezende/Personal/ueli-vue3/node_modules/.pnpm/electron@26.5.0/node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Electron Fra
```

***Solution***: You can get the location of the store via pnpm store path and then just delete it using rm -rf <path>

## Unstructured Notes

https://github.com/riipandi/tauri-tray-app/tree/main


## Tricks

RUST_BACKTRACE=1 pnpm tauri dev



[pnpm tauri build --debug](https://tauri.app/v1/guides/debugging/application)



(I gave up this) I'm trying to do something simple: https://chat.openai.com/c/02475064-c26e-43ec-b903-4bde7e5399b0

I'm trying to implement this (I will give up on this)
https://github.com/prazdevs/pinia-plugin-persistedstate


I was trying to setup debug on the rust side, I followed all the steps on this [page](https://tauri.app/v1/guides/debugging/vs-code) but it is giving me the following error when I click debug f5:

<!-- Running `cargo build --manifest-path=./src-tauri/Cargo.toml --no-default-features --message-format=json`...
Error: Cargo invocation failed.
    at t.Cargo.getCargoArtifacts (/Users/edrezende/.vscode/extensions/vadimcn.vscode-lldb-1.10.0/extension.js:1:14943)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at Object.open (/Users/edrezende/.vscode/extensions/vadimcn.vscode-lldb-1.10.0/extension.js:1:13253)
Caused by: Error: spawn cargo ENOENT
    at Process.ChildProcess._handle.onexit (node:internal/child_process:283:19)
    at onErrorNT (node:internal/child_process:476:16)
    at processTicksAndRejections (node:internal/process/task_queues:82:21)
 *  The terminal process failed to launch (exit code: 1). 
 *  Terminal will be reused by tasks, press any key to close it.  -->

I found this [thread](https://github.com/rust-lang/vscode-rust/issues/708), it seems that this is a package version conflict

https://tauri.app/v1/guides/debugging/vs-code

I'm trying this: https://docs.rs/config/latest/config/
                 https://chat.openai.com/c/8861df89-2a6f-4c83-ad9b-9e9d88efbac5






```ts
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


        // emit(Channels.getInstance().get("console_log_message"), {
        //     theMessage: `🦄 (-22)`,
        // })
        // const asyncFunctionGet = async () => {

        //     emit(Channels.getInstance().get("console_log_message"), {
        //         theMessage:  `🦄 (5)`,
        //     })

        //     const store = new Store(".settings.dat");
        //     const appearanceOptions:UserConfigOptions | null = await store.get("appearanceOptions");

        //     // const val: UserConfigOptions | null = await store.get("some-key");

        //     // let value = val ? val["value"] : 0;
            

        //     emit(Channels.getInstance().get("console_log_message"), {
        //         theMessage: `🦄 appearanceOptions: (${appearanceOptions})`,
        //     })

        //     // emit(Channels.getInstance().get("console_log_message"), {
        //     //     theMessage:  `🦄 (99)`,
        //     // })


        // };

        // asyncFunctionGet();


```
