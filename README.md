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

3. What progress has been made thus far

- I installed tauri for VS
- I installed rust-analyzer for VS

4. Where did I last leave off?

I implemented all described code on this [article](https://betterprogramming.pub/create-menubar-app-with-tauri-510ab7f7c43d)

This link is the official guide explaing on how to build a system-tray menu, I might want to take a look and see if there is something else I need [here](https://tauri.app/v1/guides/features/system-tray/)

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