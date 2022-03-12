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
import { computed, reactive, onMounted } from "vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";

export default {
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAll();
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.error(error);
      }
    });
    return {
      posts: computed(() => AppState.posts),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>