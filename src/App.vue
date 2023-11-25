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
