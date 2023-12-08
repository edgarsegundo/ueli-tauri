# ueli + tauri + vue3

## Genesis

1. I followed this [tutorial](https://tauri.app/v1/guides/getting-started/prerequisites#setting-up-macos) to create this project.

As the project structure is already set up, you can bypass Step 1 and proceed directly to Step 2 by running `pnpm install` if you've just cloned this project and branch for the first time.

❯ pnpm create tauri-app
❯ cd ueli-tauri 
❯ pnpm install
❯ pnpm tauri dev

2. To build the project, look at the file `package.json`

pnpm tauri dev      : to build and run the project
pnpm tauri build --debug    : build with debug option
RUST_BACKTRACE=1 pnpm tauri build --debug

3. What progress has been made thus far

- [21-nov-2023] I implemented all described code on this [article](https://betterprogramming.pub/create-menubar-app-with-tauri-510ab7f7c43d)
- I installed tauri for VS
- I installed rust-analyzer for VS


4. Where did I last leave off?


I will try this: https://aptabase.com/blog/persistent-state-tauri-apps

https://github.com/tauri-apps/tauri-plugin-store


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

