<template>
  <div class="">
    <div class="row container-fluid m-0 p-0">
      <div class="col-12 p-0 container-fluid">
        <header class="sticky-top">
          <Navbar />
        </header>

        <main class="background">
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
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";

import { postsService } from "./services/PostsService";
import { logger } from "./utils/Logger";
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
        }
      },
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.background {
  background-color: rgb(107, 130, 172);
}
</style>