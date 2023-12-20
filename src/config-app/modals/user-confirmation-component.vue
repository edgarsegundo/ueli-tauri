<template>
    <div class="modal" :class="{ 'is-active' : isActive }">
        <div class="modal-background" @click="onDeny"></div>
        <div class="modal-card">
            <div class="message" :class="getMessageTypeClass(type)">
                <div class="message-header">
                    <p>{{ title }}</p>
                    <button class="delete" aria-label="delete" @click="onDeny"></button>
                </div>
                <div class="message-body">
                    <div class="field">
                        {{ message }}
                    </div>
                    <div class="field has-text-centered">
                        <button class="button is-success" @click="onConfirm">{{ translations.yes }}</button>
                        <button class="button is-danger" @click="onDeny">{{ translations.no }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">

import { defineComponent, ref, // inject, ref, computed, onMounted, onUnmounted, defineProps, defineEmits, 
} from 'vue';

import { on } from '@tauri-apps/api/event'
import Channels from '../../channels';
import { UserConfirmationDialogParams, UserConfirmationDialogType } from "./user-confirmation-dialog-params";

const confirmCallback = ref(undefined);
const isActive = ref(false);
const message = ref("")
const title = ref("")
const type = ref(UserConfirmationDialogType.Default)

export default defineComponent({
    name: 'user-confirmation',
    setup() {
        return {
            confirmCallback,
            isActive,
            message,
            title,
            type
        };
    },
    methods: {
        onConfirm() {
            if (confirmCallback.value && typeof confirmCallback.value === "function") {
                confirmCallback.value();
            }
            this.onDeny();
        },
        onDeny() {
            isActive.value = false;
            message.value = "";
            title.value = "";
            confirmCallback.value = undefined;
            type.value = "";
        },
        getMessageTypeClass(type: UserConfirmationDialogType): string {
            switch (type) {
                case UserConfirmationDialogType.Error:
                    return "is-danger";
                case UserConfirmationDialogType.Default:
                default:
                    return "";
            }
        },
    },
    mounted() {
        // Register an event listener for the specified channel
        on(Channels.getInstance().get('console_log_message'), (event:any) => {
            // Handle the received message
            console.log('Received message:', event.payload.theMessage);
            isActive.value = true;
        });        
        // vueEventDispatcher.$on(VueEventChannels.settingsConfirmation, (params: UserConfirmationDialogParams) => {
        //     isActive.value = true;
        //     message.value = params.message;
        //     title.value = params.modalTitle;
        //     confirmCallback.value = params.callback;

        //     if (params.type) {
        //         type.value = params.type;
        //     }
        // });
    },
});

</script>


<style scoped>
</style>