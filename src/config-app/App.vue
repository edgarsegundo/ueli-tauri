<template>
<p>config-app {{status}}</p>
</template>


<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, defineComponent } from "vue";

export default defineComponent({
// export default {
  name: 'Config',  
  setup() {
    const status = ref('Ok')

    return {
      status
    };
  }
// };
});

</script>

<style scoped>
</style>


