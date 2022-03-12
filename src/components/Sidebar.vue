<template>
  <div class="row container-fluid mt-3"></div>
  <div class="row container-fluid"></div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>