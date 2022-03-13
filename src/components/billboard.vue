<template>
  <div class="row container-fluid">
    <div class="row">
      <h1>{{ billboard.name }}</h1>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    billboard: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>