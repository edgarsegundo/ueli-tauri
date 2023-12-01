<template>

<div class="settings container is-fluid">
    <settings-loading-overlay></settings-loading-overlay>
    <div class="settings__sidebar menu">
        <div class="settings__sidebar-header-container">
            <!-- <img class="settings__sidebar-header-image" src="./assets/ueli.svg"> -->
            <!-- <span class="settings__sidebar-header-title">{{ translations.settings }}</span> -->
        </div>
        <div class="menu-label">
            <!-- {{ translations.generalSettingsMenuSection }} -->
        </div>
        <ul class="menu-list">
            <setting-menu-item
                v-for="generalSettingMenuItem in generalSettingMenuItems"
                :key="generalSettingMenuItem"
                :item="generalSettingMenuItem"
                ></setting-menu-item>
        </ul>
        <div class="menu-label">
            <!-- {{ translations.pluginSettingsMenuSection }} -->
        </div>
        <ul class="menu-list">
            <setting-menu-item
                v-for="pluginSettingMenuItem in pluginSettingMenuItems"
                :key="pluginSettingMenuItem"
                :item="pluginSettingMenuItem"
                ></setting-menu-item>
        </ul>
    </div>
    <div class="settings__notification notification" :class="notificationClass">
        <button class="delete" @click="removeNotification"></button>
        {{ notification.message }}
    </div>
    <div class="settings__setting">
        <general-settings></general-settings>
        <!-- <general-settings :config="config" :translations="translations"></general-settings> -->
        <!-- <appearance-settings :config="config" :translations="translations"></appearance-settings>
        <color-theme-settings :config="config" :translations="translations"></color-theme-settings>
        <search-engine-settings :config="config" :translations="translations"></search-engine-settings>
        <application-search-settings :config="config" :translations="translations"></application-search-settings>
        <shortcut-settings :config="config" :translations="translations"></shortcut-settings>
        <mdfind-settings :config="config" :translations="translations"></mdfind-settings>
        <everthing-settings :config="config" :translations="translations"></everthing-settings>
        <translation-settings :config="config" :translations="translations"></translation-settings>
        <websearch-settings :config="config" :translations="translations"></websearch-settings>
        <filebrowser-settings :config="config" :translations="translations"></filebrowser-settings>
        <operating-system-commands-settings :config="config" :translations="translations"></operating-system-commands-settings>
        <operating-system-settings-settings :config="config" :translations="translations"></operating-system-settings-settings>
        <calculator-settings :config="config" :translations="translations"></calculator-settings>
        <dictionary-settings :config="config" :translations="translations"></dictionary-settings>
        <url-settings :config="config" :translations="translations"></url-settings>
        <email-settings :config="config" :translations="translations"></email-settings>
        <currency-converter-settings :config="config" :translations="translations"></currency-converter-settings>
        <workflow-settings :config="config" :translations="translations"></workflow-settings>
        <commandline-settings :config="config" :translations="translations"></commandline-settings>
        <simple-folder-search-settings :config="config" :translations="translations"></simple-folder-search-settings>
        <uwp-settings :config="config" :translations="translations"></uwp-settings>
        <color-converter-setttings :config="config" :translations="translations"></color-converter-setttings>
        <user-confirmation :translations="translations"></user-confirmation>
        <browser-bookmark-settings :config="config" :translations="translations"></browser-bookmark-settings>
        <control-panel-settings :config="config" :translations="translations"></control-panel-settings>
        <weather-settings :config="config" :translations="translations"></weather-settings>
        <lorem-ipsum-settings :config="config" :translations="translations"></lorem-ipsum-settings> -->
    </div>
</div>

</template>


<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, defineComponent, onMounted, computed, onUnmounted } from "vue";

// import { vueEventDispatcher } from "../vue-event-dispatcher";
// import { VueEventChannels } from "../vue-event-channels";

import { NotificationType } from "../common/notification-type";
import { PluginSettings } from "./plugin-settings";
import { SettingOsSpecific } from "./settings-os-specific";
// import { platform } from "os";
import { GeneralSettings } from "./general-settings";


const autoHideErrorMessageDelayInMilliseconds = 5000;
let autoHideErrorMessageTimeout: number;

export default defineComponent({
  name: 'Config',

  setup() {



    const generalSettingMenuItems = ref<string[]>(Object.values(GeneralSettings).sort());
    const notification = ref({
      message: '',
      type: undefined as NotificationType | undefined,
      visible: false,
    });
    const pluginSettingMenuItems = ref<string[]>(Object.values(PluginSettings)
      .map(setting => setting.toString())
      .concat(
        Object.values(SettingOsSpecific)
          .map(setting => setting.toString())
          // .filter(setting => setting.startsWith(platform()))
          // .map(setting => setting.replace(`${platform()}:`, '')),
      )
      .sort());

    const notificationClass = computed(() => {
      let typeClass = 'is-info';

      const type = notification.value.type as NotificationType;
      switch (type) {
        case NotificationType.Error:
          typeClass = 'is-danger';
          break;
        case NotificationType.Warning:
          typeClass = 'is-warning';
          break;
      }

      return notification.value.visible ? `visible ${typeClass}` : typeClass;
    });

    const removeNotification = () => {
      notification.value.visible = false;
    };

    const showNotification = (message: string, type: NotificationType) => {
      if (autoHideErrorMessageTimeout) {
        clearTimeout(autoHideErrorMessageTimeout);
      }

      notification.value = {
        message,
        type,
        visible: true,
      };

      autoHideErrorMessageTimeout = Number(
        setTimeout(() => {
          removeNotification();
        }, autoHideErrorMessageDelayInMilliseconds),
      );
    };

    onMounted(() => {
      // vueEventDispatcher.$emit(VueEventChannels.showSetting, GeneralSettings.General);

      // vueEventDispatcher.$on(VueEventChannels.notification, (message: string, type: NotificationType) => {
      //   showNotification(message, type);
      // });
    });

    onUnmounted(() => {
      // Clean up any necessary resources
    });

    return {
      generalSettingMenuItems,
      notification,
      notificationClass,
      pluginSettingMenuItems,
      removeNotification,
      showNotification,
    };
  }

});

</script>


<style scoped>
</style>


