<template>
  <div class="row container-fluid">
    <div class="row">
      <div class="text-light">
        <img class="img-size" :src="billboard.banner" alt="" />
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
.img-size {
  height: 10vh;
}
</style>