# Snippets

```ts
// Define your methods
const clearExecutionLog = () => {
    const userConfirmationDialogParams: UserConfirmationDialogParams = {
        callbackId: registerCallback('2d09aff8-7d17-4d3b-b6c7-d764fabb5c81', () => {
            alert("El callback está funcionando!")
            // vueEventDispatcher.$emit(VueEventChannels.clearExecutionLogConfirmed);
            }     
        ),
        message: translations.generalSettingsClearExecutionLogWarning,
        modalTitle: translations.clearExecutionLog,
        type: UserConfirmationDialogType.Default,
    };
    // vueEventDispatcher.$emit(VueEventChannels.settingsConfirmation, userConfirmationDialogParams);

    emit(Channels.getInstance().get("settings_confirmation"), {
        theMessage: `🦄 settings confirmation sent`,
        params: userConfirmationDialogParams,
    });

};

mounted() {
    // Register an event listener for the specified channel
    listen(Channels.getInstance().get('settings_confirmation'), (event:any) => {
        const params: UserConfirmationDialogParams = event.payload.params;
        isActive.value = true;
        message.value = params.message;
        title.value = params.modalTitle;
        confirmCallback.value = getCallback(params.callbackId)

        if (params.type) {
            type.value = params.type;
        }
    });        
},


```


