<template>
<component :is="selectedComponent" />
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    // const selectedComponent = ref(null);
    const selectedComponent:any = ref('./config-app/App.vue');


    return {
      selectedComponent
    };
  }
};


// const loadComponent = (componentName: string) => {
//   import(`${componentName}`)
//     .then((component) => {
//       selectedComponent.value = component.default;
//     })
//     .catch((error) => {
//       console.error(`Failed to load component: ${error}`);
//     });
// };

// // Load default component or initial condition
// loadComponent('./src/config-app/App.vue');
</script>

<style>
/* Styles for your app */
</style>
