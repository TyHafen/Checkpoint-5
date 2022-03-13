<template>
  <div class="row container-fluid">
    <div class="row">
      <div class="text-light">
        <img :src="billboard.banner" alt="" />
      </div>
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