<template>
    <keep-alive>
        <component :is="selectedComponent" />
    </keep-alive>
</template>


<script lang="ts">

import { ref } from 'vue';
import configApp from './config-app/App.vue';
import promptApp from './omni-prompt-app/App.vue';
// import { emit, listen } from '@tauri-apps/api/event'
import { listen } from '@tauri-apps/api/event'
import Channels from './channels';

export default {
    components: { configApp, promptApp },
    setup() {
        const selectedComponent = ref('');

        const switchComponent = (componentName: string) => {
            selectedComponent.value = componentName;
            loadComponentStyles(componentName);
        };
 

        const loadComponentStyles = (componentName: string) => {
            const styleId = `style-${componentName}`;
            const existingStyle = document.getElementById(styleId);

            if (existingStyle) {
                existingStyle.remove();
            }

            const link = document.createElement('link');
            link.id = styleId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            // link.href = `./path/to/${componentName}.css`;
            link.href = `styles/test.css`;

            document.head.appendChild(link);


            const link2 = document.createElement('link');
            link2.id = styleId;
            link2.rel = 'stylesheet';
            link2.type = 'text/css';
            link2.href = `./node_modules/bulma/css/bulma.min.css`;
            document.head.appendChild(link2);


            const link3 = document.createElement('link');
            link3.id = styleId;
            link3.rel = 'stylesheet';
            link3.type = 'text/css';
            link3.href = `./node_modules/bulma-extensions/dist/css/bulma-extensions.min.css`;
            document.head.appendChild(link3);


            const link4 = document.createElement('link');
            link4.id = styleId;
            link4.rel = 'stylesheet';
            link4.type = 'text/css';
            link4.href = `./node_modules/@fortawesome/fontawesome-free/css/all.min.css`;
            document.head.appendChild(link4);
        };

        // listen to the `click` event and get a function to remove the event listener
        // there's also a `once` function that subscribes to an event and automatically unsubscribes the listener on the first event
        listen(Channels.getInstance().get("tray_menu_item_selected"), (event:any) => {
            if (event.payload.message === 'show') {
                switchComponent('promptApp');
            } else if (event.payload.message === 'config') {
                switchComponent('configApp');
            }
            // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
            // event.payload is the payload object
        })

        return {
            selectedComponent,
        };
    },
};

</script>


<style>
/* Styles for your app */
</style>
