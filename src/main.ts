import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import Channels from './channels';

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
    alert(`❌ ${err}, info: ${info}`);
    console.error('Vue Error:', err, instance, info);
    if (!err) {
        err = "Generic error"
    }
    // ipcRenderer.send(IpcChannels.remoteLog, `❌ ${err}`);
};

window.onerror = function (message, source, lineno, colno, error) {
    // Handle the error here
    // ipcRenderer.send(IpcChannels.remoteLog, `❌ ${message}`);
    let error_str:string = `❌ Global Error: ${message}, ${source}, ${lineno}, ${colno}, ${error}`
    console.error(error_str);
    alert(error_str);
    return true; // Prevent default error handling
};

window.addEventListener('unhandledrejection', event => console.error('Unhandled Promise Rejection:', event.reason));

// Fetch the JSON data before the app is mounted
Channels.getInstance().fetchJsonData().then(() => {
    app.mount('#app');
});



