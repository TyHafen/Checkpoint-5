<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div v-for="p in posts" :key="p.id" class="col-md-8">
        <Post :post="p" />
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, watchEffect } from "vue";
import { billboardService } from "../services/BillboardService";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";

export default {
  setup() {
    watchEffect(async () => {
      try {
        await billboardService.getAll();
      } catch (error) {
        logger.error(error);
      }
      try {
        await postsService.getAll();
      } catch (error) {
        logger.error(error);
      }
    });
    return {
      posts: computed(() => AppState.posts),
      billboards: computed(() => AppState.billboards),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>