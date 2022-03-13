<template>
  <div class="row container-fluid m-0 p-0">
    <div class="col-12 p-0">
      <header class="sticky-top">
        <Navbar />
      </header>
      <main>
        <router-view />
      </main>
      <footer>
        <div class="bg-dark text-light text-center p-4">
          <button @click="pageTurn(newerPosts)" class="rounded mx-3">
            Newer Posts
          </button>
          <button @click="pageTurn(olderPosts)" class="rounded mx-3">
            Older Posts
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "./services/PostsService";

export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
      newerPosts: computed(() => AppState.newerPosts),
      olderPosts: computed(() => AppState.olderPosts),

      async pageTurn(page) {
        try {
          await postsService.pageTurn(page);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.side-bar {
  height: 100vh;
  background-color: aqua;
}
</style>