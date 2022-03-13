<template>
  <form class="form-group" @submit.prevent="search">
    <div class="input-group mb-3">
      <input
        v-model="searchTerm"
        type="text"
        class="form-control"
        placeholder="searching for something?"
      />
      <button class="btn btn-outline-secondary" type="button">Search</button>
    </div>
  </form>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const searchTerm = ref("");
    return {
      searchTerm,
      async search() {
        try {
          await postsService.getAll({ query: searchTerm.value });
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>