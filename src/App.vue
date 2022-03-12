<template>
  <div class="row container-fluid m-0 p-0">
    <div class="col-12 p-0">
      <header class="sticky-top">
        <Navbar />
      </header>
      <main>
        <router-view />
      </main>
      <footer></footer>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Sidebar from "./components/Sidebar.vue";
import Billboard from "./components/billboard.vue";
export default {
  components: { Sidebar, Billboard },
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
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