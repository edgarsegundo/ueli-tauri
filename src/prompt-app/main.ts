import { createApp } from "vue";
import "../base.css";
import App from "./App.vue";
import Channels from '../channels';
import { emit } from '@tauri-apps/api/event'

const app = createApp(App);

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
