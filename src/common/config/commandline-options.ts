import { getCurrentOperatingSystem } from "../helpers/operating-system-helpers";
import { platform } from "os";
import { MacOsShell, WindowsShell } from "../../plugins/commandline-plugin/shells";
// import { OperatingSystem } from "../operating-system";

export interface CommandlineOptions {
    isEnabled: boolean;
    prefix: string;
    shell: WindowsShell | MacOsShell;
}

const defaultMacOsCommandlineOptions: CommandlineOptions = {
    isEnabled: true,
    prefix: ">",
    shell: MacOsShell.Terminal,
};

// const defaultWindowsCommandlineOptions: CommandlineOptions = {
//     isEnabled: true,
//     prefix: ">",
//     shell: WindowsShell.Cmd,
// };

export const defaultCommandlineOptions = defaultMacOsCommandlineOptions;
// export const defaultCommandlineOptions: CommandlineOptions =
//     getCurrentOperatingSystem(platform()) === OperatingSystem.Windows
//         ? defaultWindowsCommandlineOptions
//         : defaultMacOsCommandlineOptions;
